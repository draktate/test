
import React from 'react';
// import Header from '../../Components/Header/Header';
import { useFetch } from '../../Hooks/Hooks';
import "./FeaturedProperties.css"
const FeaturedProperties =()=>{

    console.log("FeaturedProperties:")
    const {data, loading, error, reFetch} =useFetch("/hotels?featured=true&limit=4");

    console.log("FP data:", data , error, reFetch);
    return (
        <div className="fp">
        {
            loading?("Loading ... Please.. Wait."):
            (data && <>
            {data.map((item)=> (
                                <div className="fpItem" key={item._id}>
                                <img src={item.photoes[0] } alt="" className="fpImg" />
                               <span className="fpName"> {item.name} </span>
                               <span className="fpCity"> {item.city} </span>
                               <span className="fpPrice"> Starting from Rs.{item.cheapestPrice} </span>
           
                               {item.rating && <div className="fpRating">
                                   <button> {item.rating}</button>
                                   <span> Excellent </span>
                               </div>}
                           </div>             
                

             ))}
            </>)
        }
        </div>
    )
}

export default FeaturedProperties;