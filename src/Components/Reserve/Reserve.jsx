import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
//import { nextDay } from 'date-fns/esm';
import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../Context/SearchContext';
import { useFetch } from '../../Hooks/Hooks';
import  "./Reserve.css"

const Reserve=({setOpen,hotelId})=>
{
    const [selectedRooms, setSelectedRooms ] = useState([]);

    console.log("fetching room for hotel Id:", hotelId)
    const {data, loading, error}=  useFetch(`/hotels/room/${hotelId}`)

    console.log("data:", data, loading, error)

    const handleSelect=(e)=>{
        const selected=e.target.checked;
        const val = e.target.value;
        setSelectedRooms(selected? [...selectedRooms, val ]: selectedRooms.filter(item=> item!== val) )
        console.log("selectedRooms", selectedRooms);
    }

    console.log("selectedRooms:", selectedRooms)
    const {dates}=useContext(SearchContext);

    const getDatesBetween=(startDate, endDate)=>{
        const nDate=new Date(startDate.getFullYear(),startDate.getMonth(), startDate.getDate() );
        let dateList=[];
        while(nDate<= endDate)
        {

            dateList= [...dateList, new Date(nDate).getTime()];
            nDate.setDate(nDate.getDate()+1);
            

        }

        return dateList;
    }

    
    //var noTime = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate());
    //const dateNoTime=( myDate)=>{
        //return new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate());
    //}


    const allDates= getDatesBetween(dates[0].startDate, dates[0].endDate )
    console.log("AllDates:", allDates)

    const isAvailable= (roomNo, allDates)=>
    {

        console.log("bookedFor:", roomNo.bookedFor);
        console.log("allDates:", allDates);

        
        if(roomNo.bookedFor.length===0) return true; 
        
        const dateList=roomNo.bookedFor;
        let dateFound=false;


        allDates.forEach((dateItem)=>{ if(dateList.includes(dateItem)) dateFound=true });
        //const isFound = dateList.some( date=> allDates.includes(new Date(date)))

        console.log( "room ",roomNo, " is:" , dateFound?"already booked":"available")
    
        return !dateFound;
    }


//        const isFound = roomNo.bookedFor.some( date=>{ allDates.includes(dateNoTime(new Date(date)))})

    

    /*
    test getDatesBetween function
    const sDate= new Date();
    const cTime = new Date().getTime();
    const eDate= new Date( cTime + (2 * 24 * 60 * 60 * 1000)) ;

    console.log("testDates:", sDate, eDate);
    console.log("testDates:", getDatesBetween(sDate, eDate));
    */

    const navigate=useNavigate();

    const reseve4Me=async ()=>  {
        console.log("reserve4Me")
        console.log("allDates:", allDates ,selectedRooms)
        try{
               await Promise.all(
                selectedRooms.map(roomId=>{
                const res=  axios.put(`/rooms/avail/${roomId}`,{bookedFor:allDates});
                console.log("success")
                return res.data;
                })); 
                setOpen(false);

                alert("Your Booking is confirmed")
                navigate("/");
        
        }
        catch(err)
        {
            console.log(err)

        }

    }

    return(
        <div className="reserve">
            {data ? (
                <div className="rContainer">
                
                    <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={()=> setOpen(false)} />
                    <span> Select your rooms:</span>
                    { data.map( item=>(
                        <div className="rItem">

                            <div className="rItemInfo">
                                <div className="rTitle">{item.title} </div>
                                <div className="rDesc">{item.desc} </div>
                                <div className="rMaxPeople"> Max People: <b> {item.maxPeople}</b> </div>
                                <div className="rPrice">Rs. {item.price}.00 </div>
                            </div>

                            <div className="rSelectRooms">
                            <div className="room">

                            { item.roomNumbers?( 
                                item.roomNumbers.map(roomNumber=> (
                                    <>
                                    <lable> {roomNumber.roomNo} </lable>
                                    <input type="checkbox" disabled={!isAvailable(roomNumber,allDates)} value={roomNumber._id} onChange={ handleSelect} />
                                    </>
                                    )) )
                                    :(<div> No room available </div>)
                            } 
                            </div>
                            </div>

                        </div>
                        ))
                    }
  
                     <button onClick={ reseve4Me}  disabled={selectedRooms.length===0} className="rButton"> Reserve for me
                        </button>   
                </div>

                ):(<div className="rContainer">
                    <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={()=> setOpen(false)} />
                     <span> No Rooms available </span> </div>)   
            }   
            

        </div>

        
    )

}

export default Reserve;