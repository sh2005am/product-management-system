import mongoose from 'mongoose'
const { Schema } = mongoose
const productSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
    },
    image: {
        type: String,
    },
    stock: {
        type: Number,
        default: 0
    },
    sku: {
        type: String,
    }
},
    { timestamps: true })
    const Product = mongoose.model("Product", productSchema)
    export default Product;