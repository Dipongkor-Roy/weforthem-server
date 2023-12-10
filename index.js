const express=require('express');
const app=express();
const cors=require('cors');
require("dotenv").config();
const port=process.env.PORT || 2000;

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
 res.send("Welcome WeforThem Server")
})

app.listen(port,()=>{
    console.log(`port in ${port}`)
})