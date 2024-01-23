const express=require("express");
const app=express();
require("./DB/Connection");
const cors=require("cors");
const router=require("./Routes/Route");
const cookieParser=require("cookie-parser");
const port=process.env.PORT || 4000;


app.get("/", (req, res)=>{
    res.status(201).json({
        message: "Welcome to the API"
    })
})


app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(router);


app.listen(port, ()=>{
    console.log(`Server is running on ${port}`)
})