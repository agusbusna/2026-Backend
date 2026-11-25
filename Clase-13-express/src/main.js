import connectMongoDB from "./config/mongoDB.config.js";
import express from 'express';
import { crearMembresia } from "./repository/membresias.repository.js";
import { crearMensaje } from "./repository/mensaje.repository.js";
import statusRouter from "./routes/status.router.js";
import productsRouter from "./routes/product.router.js";
import products from "./routes/product.router.js";

crearMensaje("Hola, primer mensaje", '6afb0f2549fbc6d4738214b1','6afda8c7ad23eb5d36bddae7')
connectMongoDB()

const PORT = 8080

//Se crea la api de express

const app = express()


//Middelware que permite que nuestro servidor de express PUEDA recibir JSON
app.use(express.json())

app.use('/api/status', statusRouter)
app.use('/api/products', productsRouter)



app.listen(
    PORT,
    ()=> {
        console.log(`Aplicacion escuchando exitosamente el puerto ${PORT}`)
    }
)