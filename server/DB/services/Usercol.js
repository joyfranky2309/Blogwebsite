const express = require("express");
require("dotenv").config()
const bcrypt = require('bcryptjs')
const UserCol = require("../../models/User")
const jwt = require('jsonwebtoken')
const secretKey=process.env.SECRET_KEY
const connectDB = require("../../DB/connector")
connectDB()
const registerUser=async(req,res)=>{
    try {
        let{ role, username, password } = req.body
        password = bcrypt.hashSync(password, 10)
        const NewUser = new UserCol({ role,username, password })
        await NewUser.save()
        res.status(201).send("User Registered Successfully")
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
}
const loginUser= async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await UserCol.findOne({ username })
        if (!user) {
            return res.status(404).send("User not found")
        }
        if (bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: "1h" });
            return res.status(200).json({message:"Login Success",user,token})
        }
        else {
            return res.status(401).send("Invalid Credentials")
        }
    }
    catch (err) {
        console.log("login error: " + err)
    }
}
const getAllUsers= async (req, res) => {
    try {
        const users = await UserCol.find()
        res.status(200).json(users)
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
}
const getUserById=async(req,res)=>{
    try {
        const user = await UserCol.findById(req.params.id)
        if(!user){
            return res.status(404).send("User not found")
        }
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}
const updateUser=async(req,res)=>{
    try{
        const user= await UserCol.findByIdAndUpdate(req.params.id,{...req.body},{new:true})
        if(!user){
            return res.status(404).send("User not found")
        }
        res.status(200).json(user)
    }
    catch(err){
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
}
const deleteUser=async(req,res)=>{
    try{
        const user= await UserCol.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send("User not found")
        }
        res.status(200).send("User Deleted Successfully")
    }
    catch(err){
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
}
module.exports = {registerUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser};