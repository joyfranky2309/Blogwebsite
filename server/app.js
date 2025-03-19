const express = require("express");
const app=express()
const UserRoutes = require("./routes/UserRoutes")
const BlogRoutes = require("./routes/BlogRoutes")
const LearnRoutes=require("./routes/LearnRoutes")
const cors = require('cors');
app.use(cors());
app.use(express.json());

const port =5000
app.get("/",(req,res)=>{
    res.send("welcome to blog services")
})
app.use("/api/auth",UserRoutes)
app.use("/api/blog",BlogRoutes)
app.use("/api/learn",LearnRoutes)
app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`)
})