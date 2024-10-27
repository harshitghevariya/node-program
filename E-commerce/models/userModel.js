const mongoose = require("mongoose")
const validateEmail = function(email) {
	const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	return regex.test(email);
};

// const validationPassword = function(password){
// 	const pass = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
// 	return pass.test(password)
// }

const userSchema = new mongoose.Schema(
	{
	username:{
		type:String,
		require:[true,"Please add the username"],
		min: 3,
		max:10
	},
	email:{
		type:String,
		require:true,
		unique:[true,"please add the user email address"],
		validate: [validateEmail, "Please enter a valid email"],
		min:10,
		max:20
	},
	password:{
		type:String,
		require:[true,"Please add the user password"],
		// validate:[validationPassword,"Please enter a valid password"],
		min:8,
		max:10
	},
	role:{
		type:String,
		require:[true,"Please add the user role"],
		enum:["admin","user"],
	}
	},
	{
		timeseries:true,
	}
)
module.exports = mongoose.model("User",userSchema)