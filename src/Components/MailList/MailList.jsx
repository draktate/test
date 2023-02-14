
//import React, { Component } from 'react';
//import Header from '../../Components/Header/Header';
import "./MailList.css"
const MailList =()=>{
    return (
        <div className="mail">
            <h1 className="mailTitle">
                For More Options : 
                <span className="mailDesc">
                    Sign up for getting more offers from our end. 
                </span>
                <div className="mailInputContainer">
                    <input type="text" placeholer="Your Email"/>
                    <button>
                        Subscribe
                    </button>

                </div>
            </h1>


        </div>
    )
}

export default MailList;