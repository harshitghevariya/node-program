// const { models } = require("mongoose")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")

const getusers = async(req,res)=>{
    const users = await User.find();
    res.status(200).json(users)
}

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

const resetPassword = async(req,res)=>{

}
const requestPasswordReset  = async(req,res)=>{
	try{
		const {email} = req.body;
		console.log("email",email)
		if(!email){
			return res.status(400).json({message:"Please provide email"})
		}
		const checkUser = await User.findOne({email})
		if(!checkUser){
			return res.status(400).json({message:"User not found please register"})
		}
		const token = jwt.sign(
			{email},process.env.JWT_SECRET,{expiresIn:"1h"}
		)

		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.EMAIL,
				pass: process.env.PASS,
			},
		})
		console.log("hello")

		const receiver  = {
			from:"harshit.ghevariya@team.exelanceit.in",
			to:email,
			subject:"Passsword reset request",
			text:`Click on this link to generate your new password ${process.env.CLIENT_URL}/requestpasswordreset ${token}`
		}
		console.log("receiver",receiver)

		await transporter.sendMail(receiver);
		return res.status(200).json({message:"Password reset link send successfully on your gmail account"})

	}catch{
		return res.status(500).send({message:"Somthing went wrong"})
	}
}

module.exports = {register,login,resetPassword,requestPasswordReset,getusers}

// try{
// 	const user = await User.findOne({email});
// 	if(!user) return res.status(404).json({message:"User doesn't exist"});

// 	const secret = process.env.JWT_SECRET + user.password;
// 	const token = jwt.sign(
// 		{id:user._id,email:user.email},secret,{expiresIn:"1h"}
// 	)
// 	const transporter = nodemailer.createTransport({
// 		service:"gmail",
// 		auth:{
// 			user:user.email,
// 			password:user.password
// 		},
// 	})

// 	const otp = Math.floor(1000 + Math.random() * 900000);

// 		const otpExpier = new Date();
// 		otpExpier.setMinutes(otpExpier.getMinutes() + 1);

// 		connection.query("UPDATE user SET otp = ?, otpExpire = ? WHERE email = ?", [otp, otpExpier, req.body.email], (err, data2, fields) => {
// 			if (err) return next(new AppError(err, 500));

// 			const transporter = nodemailer.createTransport({
// 				service: 'gmail',
// 				auth: {
// 					user: process.env.EMAIL,
// 					pass: process.env.PASS,
// 				},
// 			});

// 			const mailOptions = {
// 				from: 'harshit.ghevariya@team.exelanceit.in',
// 				to: req.body.email,
// 				subject: 'Password reset OTP',
// 				text: `Your OTP (It is expired after 1 min) : ${otp}`,
// 			};

// 			transporter.sendMail(mailOptions, (error, info) => {
// 				if (error) {
// 					return next(new AppError(error, 500));
// 				} else {
// 					res.json({
// 						data: "Your OTP send to the email"
// 					})
// 				}
// 			});

// 		})

// 	const mailOptions = {
// 		to: user.email,
// 		frome:process.env.EMAIL,
// 		subject:"password reset request"
// 	}
// }catch(err){
// 	res.status(500).json({message:"Something went wrong"})
// }