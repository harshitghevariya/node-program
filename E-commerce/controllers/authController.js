// const { models } = require("mongoose")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = async(req,res) =>{
	try{
		const {username,email,password,role} = req.body
		const hashedPassword = await bcrypt.hash(password,10)
		const newUser = new User({username,email,password:hashedPassword,role})
		await newUser.save();
		res.status(201).json({message:`User register with email ${email}`})
	}catch(err){
		res.status(500).json({message:"Something went wrong"})
	}
}

const login = async(req,res) =>{
	const {email,password} = req.body
	if(!email||!password){
		res
		.status(400)
		.json("All fields are mandatory!")
	}
	const user = await User.findOne({email})
	if(!user){
		return res.status(404).json({message:`User with email ${email} not found`})
	}
	const isMatch = await bcrypt.compare(password,user.password)
	if(!isMatch){
		return res.status(400).json({message:"Invalid credentails"})
	}
	const token = jwt.sign(
		{id: user._id,role:user.role},
		process.env.JWT_SECRET,
		{expiresIn:"1h"}
	)
	res.status(200).json({token})
}

module.exports = {register,login}