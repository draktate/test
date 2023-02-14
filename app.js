const express = require("express")
const app=express()
app.get("/" , (req, res)=>{

    res.send("It works!")
})

app.get("/new" , (req, res)=>{

    res.send("new works!")
})
app.listen(process.env.PORT||5000)
module.exports=app