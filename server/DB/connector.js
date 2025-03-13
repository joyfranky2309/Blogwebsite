const mongoose = require('mongoose');
require('dotenv').config()
const db= process.env.MONGO_URI
console.log("String:"+db)
const connectDB=async()=>{
    try {
        const conn= await mongoose
          .connect(db)
          .then(() => console.log("💻 Mongodb Connected"))
          .catch(err => console.error(err));
    } catch (error) {
        console.log("Error in DB connection",error)
    }
}
module.exports=connectDB