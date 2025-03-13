const express = require("express");
const router = express.Router();
const{registerUser,loginUser,getAllUsers,getUserById,updateUser,deleteUser}=require("../DB/services/Usercol.js");
router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/getall",getAllUsers)
router.get("/getuser/:id",getUserById)
router.put("/updateuser/:id",updateUser)
router.delete("/deleteuser/:id",deleteUser)

module.exports=router;