import mongoose from "mongoose";

const DB_URL = "mongodb://localhost:27017"
const DB_NAME = "2026_UTN_PWA"

async function connectMongoDB(){
    try{
        await mongoose.connect (`${DB_URL}/${DB_NAME}`)
        console.log("Conexión exitosa")
    }
    catch(error){
        console.log("Error al conectar MongoDB:", error.message)
    }
}

export default connectMongoDB