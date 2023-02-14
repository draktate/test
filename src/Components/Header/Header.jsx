import React, {  useState } from 'react';
import "./Header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateRange } from 'react-date-range';
import { faBed, faCalendarDays, faCar, faHome, faPlane, faTaxi, faPerson } from '@fortawesome/free-solid-svg-icons'; 

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
//import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { SearchContext } from '../../Context/SearchContext';
import { AuthContext } from "../../Context/AuthoContext";


const Header  =({type})=>{
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult:1,
        children:0,
        rooms:1
    }) 

    const {user} = useContext(AuthContext);

    const [openDate, setOpenDate] = useState(false);

    const [dates, setDates]= useState([
        {
            startDate:new Date(),
            endDate: new Date(),
            key:'selection'

        }
    ]);

    const incrVar=(name, operation)=>{
        setOptions((prev)=> { return {
            ...prev, [name]:operation ==="i" ? options[name]+1 : (options[name] >0? options[name]-1:options[name])  
        }})

    }
    const [destination, setDestination]= useState("");

    const navigate = useNavigate()

    const {dispatch} = useContext(SearchContext)
    
    const handlleSearch=()=>{
        dispatch({type:"NEW_SEARCH", payload:{destination,dates, options}})
        console.log("handelSearch:",{destination, dates , options} )
        navigate("/hotels", {state: {destination, dates , options}})

    }


    return (
        <div className="Header">
            
            <div className={type==="list"?"headerContainer listMode":"headerContainer" } >
                <div className="headerList">
                    <div className="headerListItem active">
                        <span className="faIcons"> <FontAwesomeIcon icon={faBed} /> </span>
                        <span>Accomodatios</span>
                    </div>
                    <div className="headerListItem">
                        <span className="faIcons"> <FontAwesomeIcon icon={faPlane} /> </span>
                        <span> Air Travel</span>
                    </div>

                    <div className="headerListItem">
                        <span className="faIcons"> <FontAwesomeIcon icon={faCar} /> </span>
                        <span> Car Rental </span>
                    </div>

                    <div className="headerListItem">
                        <span className="faIcons"> <FontAwesomeIcon icon={faBed} /> </span>
                        <span> Check this out</span>
                    </div>
                    <div className="headerListItem">
                        <span className="faIcons"> <FontAwesomeIcon icon={faTaxi} /> </span>
                        <span>Local Taxis </span>
                    </div>
                    <div className="headerListItem">
                        <span className="faIcons"> <FontAwesomeIcon icon={faHome}  /> </span>
                        <span >My Bookings</span>
                    </div>
                </div>
            </div>

                { type !=="list" && 
                <> 
                    <div className="headerDiv">
                        <h1 className="headerTitle" > Looking for additional discounts? </h1>
                        <p className="headerDesc">
                            Make yourself availble for additional discounts with * star Account 
                        </p>
                        { !user &&  <button className="headerButton">
                            Yes I am In!
                        </button>}

                    </div>

                    <div className="headerSearch"> 
                    
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faBed} className="headerIcon" />
                            <input type="text" 
                            placeholder='Destination?' 
                            className='headerSearchInput' 
                            onChange={e=> setDestination(e.target.value)} />

                        </div>

                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                            <span onClick={()=>{ setOpenDate(!openDate)}} className="headerSearchText">{ 
                                `${dates[0].startDate.toLocaleDateString()} to ${dates[0].endDate.toLocaleDateString()}`  
                                }
                            </span>

                            { openDate && <DateRange  
                                editableDateInputs={true} 
                                onChange={(item) => setDates([item.selection])}
                                minDate={new Date()} 
                                moveRangeOnFirstSelection={false} 
                                ranges={dates}                        
                                className="date" />
                            } 

                        </div>

                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                            <span onClick={()=>{ setOpenOptions(!openOptions)}} className="headerSearchText"> {`${options.adult} Adults, ${options.children} Children, ${options.rooms} Rooms `}
                            </span>
                            {openOptions && 
                            <div className="options">
                                <div className="optionItem">
                                    <span className="OptionText">
                                        Adult
                                    </span>
                                    
                                    <div className="optionCounter">
                                        <button disabled={ options.adult <=1} className="optionCounterButton" onClick={()=>incrVar("adult", "d")}>- </button>
                                        <span className="optionCounterNumber"> {options.adult} </span>
                                        <button className="optionCounterButton" onClick={()=>incrVar("adult", "i")}>+ </button>
                                    </div>
                                </div>

                                <div className="optionItem">
                                    <span className="OptionText">
                                        Children

                                    </span>
                                    <div className="optionCounter">
                                        <button disabled={ options.children <=0} className="optionCounterButton" onClick={()=>incrVar("children", "d")}>- </button>
                                        <span className="optionCounterNumber"> {options.children}</span>
                                        <button className="optionCounterButton" onClick={()=>incrVar("children", "i")}>+ </button>
                                    </div> 
 
                                </div>
                                
                                <div className="optionItem"> 
                                    <span className="OptionText">
                                        Rooms
                                    </span>
                                    <div className="optionCounter">
                                        <button disabled={ options.rooms <=1} className="optionCounterButton" onClick={()=>incrVar("rooms", "d")}>- </button>
                                        <span className="optionCounterNumber"> { options.rooms} </span>
                                        <button className="optionCounterButton" onClick={()=>incrVar("rooms", "i")}>+ </button>
                                    </div>
 
                                </div>
                            </div>
                            }

                        </div>
                        <div className="headerSearchItem">
                            <button className="headerButton" onClick={handlleSearch}>
                                Search 
                            </button>
                         </div>
                    </div> </>}
                </div>
        
    )
}

export default Header;