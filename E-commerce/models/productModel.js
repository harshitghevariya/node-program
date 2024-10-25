const mongoose = require("mongoose")

const productSchema = mongoose.Schema(
    {
        name:{
            type:String,
            require:true
        },
        image:{
            data: Buffer,
            type:String,
            require:true
        },
        color:{
            type:String,
            require:true
        },
        price:{
            type:String,
            require:true
        },
        description:{
            type:String,
            require:true
        }
    },
    {
        timestamps: true
    }
)
module.exports = mongoose.model("Product",productSchema)