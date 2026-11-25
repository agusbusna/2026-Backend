import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

export const PRODUCTS_COLLECTION_NAME = "products"
const Producto = mongoose.model (PRODUCTS_COLLECTION_NAME, productSchema)

export default Producto