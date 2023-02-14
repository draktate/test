import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export const  useFetch=(url)=>{
    const [data,setData] = useState("");
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    console.log("UseFetch Url:",url);




useEffect(()=>{
    const fetchData = async()=>{

    setLoading(true);
    try{

        console.log("axios res", Date());

        const res = await axios.get(url)
        console.log("=", res) 
        setData(res.data);

    }
    catch(e)
    {
        console.log("no data retrieved")
        setError(e);

    }
    setLoading(false);
} 
fetchData();

},[])



const reFetch = async()=>{

    setLoading(true);
    try{

        const res = await axios.get(url) 
        setData(res.data);

    }
    catch(e)
    {
        setError(e);

    }
    setLoading(false);
};

return {data, loading, error, reFetch}

} 