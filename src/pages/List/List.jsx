
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import NavBar from '../../Components/NavBar/NavBar';
import "./List.css";
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import SearchItem from '../../Components/SearchItem/SearchItem';
import { useFetch } from '../../Hooks/Hooks';

const List =()=>{

    const location=useLocation();
    console.log("List:",location)

    const [destination,setDestination]=useState(location.state.destination);
    console.log("setDestination:",setDestination)

    const [dates,setDates]=useState(location.state.dates);
    const [options,setOptions]=useState(location.state.options);
    console.log("setDestination:",setOptions)


    const [openDate, setOpenDate]=useState(false);
    const [min, setMin]=useState(undefined);
    const [max, setMax]=useState(undefined);

 
    //console.log("options:",options)
    console.log("Getting hotels")

    const {data, loading, error, reFetch} = useFetch(`/hotels?city=${destination}&min=${min||0}&max=${max||999999}`)
    
    console.log("data:", data,error);

    const handleSearch=()=>{

        reFetch();

    }

    return (
        <div>
            <NavBar/>

            <Header type="list"/>
            
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listSearch">
                        <h1 className="lsTitle"> Search </h1> 
                        <div className="lsItem">
                            <label htmlFor=" "> Destination </label>
                            <input type="text" placeholder={destination}/>
                        </div>
                        <div className="lsItem">
                            <label htmlFor=" "> CheckIn to CheckOut </label>
                            <span onClick={()=>{ setOpenDate(!openDate)}}>
                                {dates[0].startDate.toLocaleDateString()} -
                                {dates[0].endDate.toLocaleDateString()}  
                            </span>

                            { openDate &&
                            <DateRange onChange={item=>setDates([item.selection ])} 
                            minDate={new Date()} 
                            ranges={dates}
                            />
                            }       
                        </div>

                        <div className="lsItem">
                            <label > Options: </label>
                            <div className="lsOptions">
 

                            <div className="lsOptionItem">
                                <span className="lsOptionText">Min Price <small> /Night </small></span>
                                <input type="number" min={0} onChange={e=>setMin(e.target.value)} className="lsOptionInput" />
                            </div>

                            <div className="lsOptionItem">
                                <span className="lsOptionText">Max Price <small> /Night </small></span>
                                <input type="number" min={0} onChange={e=>setMax(e.target.value)}  className="lsOptionInput" />
                            </div>

                            <div className="lsOptionItem">
                                <span className="lsOptionText" >Adults </span>
                                <input type="number"  min={1} className="lsOptionInput" placeholder={options.adult} />
                            </div>

                            <div className="lsOptionItem">
                                <span className="lsOptionText">Children </span>
                                <input type="number"  min={0} className="lsOptionInput" placeholder={options.children}/>
                            </div>

                            <div className="lsOptionItem">
                                <span className="lsOptionText">#Rooms </span>
                                <input type="number"  min={1} className="lsOptionInput" placeholder={options.rooms}/>
                            </div>
                        </div>


                        </div>
                        <button onClick={handleSearch}>Search </button>


                    </div>


                    <div className="listResult">
                    {loading? ("Loading... Please wait.") : <>
                    {data && data.map((item)=>(
                        <SearchItem item={item} key={item._id}/>


                    ))
}
                    
                    </>}


                    </div>
                </div>
            </div>
        </div>
    )


}

export default List;