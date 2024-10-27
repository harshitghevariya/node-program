const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema(
    {
        product_id:{
            type: mongoose.Schema.Types.ObjectId,
            require:true,
            ref:"Product"
        },
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            require:true,
            ref:"User"
        },
        quantity:{
            type : Number
        },
        price:{
            type : Number
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Cart",cartSchema)