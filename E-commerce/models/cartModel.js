const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema(
    {
        product_id:{
            type: mongoose.Schema.Types.ObjectId,
            require:true,
            ref:"Product"
        },
        products:[
            {
                name:String,
                quantity:Number,
                price:Number
            }
        ],
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Cart",cartSchema)