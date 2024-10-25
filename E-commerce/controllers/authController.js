// const { models } = require("mongoose")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const crypto = require("crypto")

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
		res.status(500).json({message:"Something went wrong",err:err})
	}
}

const updateUser = async(req,res)=>{
	const user = await User.findByIdAndUpdate(
		req.params.id,
		req.body,
		{new:true}
	)
	res.json({message:"successfully record update",user})
}

const user = async(req,res)=>{
	const user = await User.findById(req.params.id)
	res.status(200).json(user)
}

const deleteUser = async(req,res)=>{
	const user = await User.findById(req.params.id)
	if(!user){
		res.status(404).json({message:"user not found"})
	}
	await User.deleteOne(user)
	res.status(200).json({message:"successfully record delete",user})
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

// const requestPasswordReset  = async(req,res)=>{
// 	try{
// 		const {email} = req.body;
// 		// console.log("email",email)
// 		if(!email){
// 			return res.status(400).json({message:"Please provide email"})
// 		}
// 		const checkUser = await User.findOne({email})
// 		if(!checkUser){
// 			return res.status(400).json({message:"User not found please register"})
// 		}
// 		const token = jwt.sign(
// 			{email},process.env.JWT_SECRET,{expiresIn:"1h"}
// 		)

// 		const transporter = nodemailer.createTransport({
// 			service: "gmail",
// 			auth: {
// 				user: process.env.EMAIL,
// 				pass: process.env.PASS,
// 			},
// 		})
// 		// console.log("hello",transporter)

// 		const receiver  = {
// 			from:"harshitghevariya24@gmail.com",
// 			to:email,
// 			subject:"Passsword reset request",
// 			text:`Click on this link to generate your new password ${process.env.CLIENT_URL}/requestpasswordreset/Token = ${token}`
// 		}
// 		console.log("receiver",receiver)

// 		await transporter.sendMail(receiver);
// 		// console.log("transport",transporter)
// 		return res.status(200).json({message:"Password reset link send successfully on your gmail account"})

// 	}catch(err){
// 		return res.status(500).send({message:"Somthing went wrong",err:err})
// 	}
// }

// const resetPassword = async(req,res)=>{
// 	try{
// 		const {token} = req.params;
// 		console.log("token",token)
// 		const {password} = req.body;
// 		console.log("pass",password)

// 		if(!password){
// 			return res.status(400).send({message:"Please provide password"})
// 		}

// 		const decode = jwt.verify(token,process.env.JWT_SECRET)
// 		console.log("decode",decode)

// 		const user = await User.findOne({email:decode.email})
// 		console.log(user)

// 		console.log("aaaaa")
// 		const newPassword = await hashedPassword(password)
// 		user.password = newPassword;
// 		console.log("b")
// 		await user.save();
// 		console.log("save",user.save())
// 		console.log("c")

// 		return res.status(200).send({message:"Password reset successfully"})
// 	}catch(error){
// 		return res.status(500).send({message:"Something went wrong",error:error})
// 	}
// }

const requestPasswordReset  = async(req,res)=>{
	try {
	const { email } = req.body;

    const user = await User.findOne({email});
    
    const otp = crypto.randomInt(100000,999999);
    user.resetOtp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000; //5 min expiry
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASS
		}
	});
	
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'OTP to Reset password',
        text: `Your OTP for password reset is: ${user.resetOtp}. 
        Validity 5 Mins`
    };
	await transporter.sendMail(mailOptions);
	return res.status(200).json({message:'OTP email sent to:', email})
    } catch (error) {
        return res.status(500).json({message:"Somthing went wrong",error})
    }
}

const resetPassword = async(req,res)=>{
	const body = req.body;
    const password = body.password;
    const confirmPassword = body.confirmPassword;

    if (isEmpty(body)) return next(new AppError('form data not found', 400));

    try {

        const { error } = RESET_PASSWORD_MODEL.validate(body);

        if (error) return next(new AppError(error.details[0].message, 400));

        if (password.localeCompare(confirmPassword) != 0) return next(new AppError('passwords are not equal', 400));

        connection.query("SELECT * FROM user WHERE otp = ? AND otpExpire > NOW()", [[body.otp]], async (err, data, fields) => {
            if (err) return next(new AppError(err, 500));

            if (data.length == 0) return next(new AppError('Invalid or expired OTP', 400));

            const solt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, solt);

            connection.query("UPDATE user SET password = ?, otp = null, otpExpire = null WHERE otp = ?", [hashedPassword, body.otp], async (err, data, fields) => {
                if (err) return next(new AppError(err, 500));

                res.json({
                    data: 'Password reset successful'
                })

            })

        })

    }
    catch (err) {
        return next(new AppError(err, 500));
    }
}

module.exports = {register,login,resetPassword,requestPasswordReset,getusers,updateUser,deleteUser,user}