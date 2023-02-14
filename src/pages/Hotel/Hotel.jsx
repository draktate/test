import "./Hotel.css";
import NavBar from "../../Components/NavBar/NavBar";
import Header from "../../Components/Header/Header";
import MailList from "../../Components/MailList/MailList";
import Footer from "../../Components/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { useFetch } from "../../Hooks/Hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../Context/SearchContext";
import { AuthContext } from "../../Context/AuthoContext";
import Reserve from "../../Components/Reserve/Reserve";



const Hotel = () => 
{

  const {user} = useContext(AuthContext);

  const location = useLocation();
  console.log("location:",location);
  const id = location.pathname.split("/")[2];

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openBook, setOpenBook] = useState(false);


  const {data, loading, error } =useFetch(`/hotels/find/${id}`);
  console.log("data:", data.cheapestPrice, error)


  const {dates,options} = useContext(SearchContext);
  console.log("Options:", options)

  const MSPD=1000*60*60*24;
  function dayDiff(date1, date2)
  {
    const td= Math.abs(date2.getTime()- date1.getTime() );
    const dd= Math.ceil(td/MSPD);

    return dd;

  }

  const nod=dayDiff(dates[0].endDate, dates[0].startDate )
  console.log("Getting hotels")


  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => 
  {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  const navigate=useNavigate();

  const handleClick=()=>{
    if(user){

      setOpenBook(true);

    }
    else{
      navigate("/login");

    }
        
  }
   
  return (
    <div>
      <NavBar />
      <Header type="list" />
      { loading? ("Loading... Please.. Wait.") : ( 
        <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}


        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.address}</span>
          </div>
          
          <span className="hotelDistance">
            Excellent location – {data.distance}
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over Rs.{nod* data.cheapestPrice * options.rooms} at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {data.photos?.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data.title}</h1>
              <p className="hotelDesc">
                {data.desc}
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {nod}-nights stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>Rs. {nod* data.cheapestPrice * options.rooms} </b> ({nod} nights)
              </h2>
              <button onClick={handleClick}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>

        <MailList />
        <Footer />
      </div>)
    }
    {openBook && <Reserve setOpen={setOpenBook} hotelId={id}/>}
    </div>
  );
};

export default Hotel;
