import "./NavBar.css";
import React, {  useContext } from 'react';
//import Header from "../Header/Header";
import { Link,  useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthoContext";



const NavBar =()=>{

    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogin=()=>{

        navigate("/login")

        
    }

    return (
        <div className="navBar">
            <div className="navContainer">
                <Link to="/" style={{color:"inherit" , textDecoration:"none"}}>
                <span className="logo">
                    Book4Me 
                </span>
                </Link>
                {user? user.username :  (<div className="navItems">
                    <button className="navButton"> Register</button>
                    <button className="navButton" onClick={handleLogin}> Login </button>
                </div>)
                }
            </div>
  
        </div>
    )
}

export default NavBar;