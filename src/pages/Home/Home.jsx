import "./Home.css"
import React from 'react';
import NavBar from "../../Components/NavBar/NavBar";
import Header from "../../Components/Header/Header";
import Featured from "../../Components/featured/Featured";
import PropertyList from "../../Components/PropertyList/PropertyList";
import FeaturedProperties from "../../Components/FeautredProps/FeaturedProperties";
import MailList from "../../Components/MailList/MailList";
import Footer from "../../Components/Footer/Footer";
const Home =()=>{
    return (
        <div> 
            <NavBar/>
            <Header/>
            <div className="homeContainer">
                
                <Featured/>
                <h2 className="homeTitle">Properties by Type</h2>
                
                <PropertyList/>
                <h1 className="homeTitle">Most liked properties</h1>
                
                <FeaturedProperties/>

                
                <MailList/>
                Footer
                <Footer />
            </div>
        </div>
    )
}

export default Home;