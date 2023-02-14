import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthoContext";
import  "./Login.css";

const Login =()=>{
    const [credentials, setCredentials]=useState({
        username:undefined,
        password:undefined
    })


    const {user, loading, error, dispatch} = useContext(AuthContext);

    const navigate=useNavigate();

    const handleChange= (e)=>{
        setCredentials((prev)=>({...prev, [e.target.id] : e.target.value}))


    }
    /*
    case "LOGIN_START" : return {user:null, loading:true, error:null};
    case "LOGIN_SUCCESS": return {user:action.payload, loading:false, error:null};
    case "LOGIN_FAILURE": return {user:null, loading:false, error:action.payload};
    case "LOGOUT": return {user:null, loading:false, error:null};
    */

    const handleLogin= async (e)=>{
        e.preventDefault();
        console.log("dispatching: Login_start")
        dispatch({type:"LOGIN_START"});

        try{

            console.log("credentials:", credentials)
            const res = await axios.post("/auth/login", credentials);
            dispatch({type:"LOGIN_SUCCESS", payload:res.data.details});
            navigate("/")


        }
        catch(e)
        {
            console.log("error:", e)
            dispatch({type:"LOGIN_FAILURE", payload:e.response.data});
        }

    }

    console.log("user:", user)

    return (
        <div className="login">
            <div className="lcontainer">
                <input type="text" placeholder="username" id="username" onChange={handleChange} className="lInputs" />
                <input type="password" placeholder="password" id="password" onChange={handleChange} className="lInputs" />
                <button disabled={loading} className="lButton" onClick={handleLogin}>
                    Login
                </button>
                {error && 
                <span> {error.message} </span>
                }

            </div> 
        
        </div>
    )
}

export default Login;