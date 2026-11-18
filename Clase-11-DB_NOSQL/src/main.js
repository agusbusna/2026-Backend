import connectMongoDB from "./config/mongoDB.config.js";
import express from 'express';
import { crearMembresia } from "./repository/membresias.repository.js";
import { crearMensaje } from "./repository/mensaje.repository.js";


crearMensaje("Hola, primer mensaje", '6afb0f2549fbc6d4738214b1','6afda8c7ad23eb5d36bddae7')
connectMongoDB()

const PORT = 8080

//Se crea la api de express

const app = express()

//Middelware que permite que nuestro servidor de express PUEDA recibir JSON
app.use(express.json())

app.get(
    "/test",
    (request, response) => {
        response.send(`<h1>Hola desde express!<h1>`)
    }
)

app.post(
    "/test",
    (request, response) => {
        console.log("Datos recibidos:", request.body)
        response.send({
            ok: true,
            message: "POST recibido!!"
        })
    }
)
app.get(
    "/",
    (request, response) => {
        console.log("hola mundo?")

        response.send({
            ok: true,
            message: "Hola desde la API"
        })
    }
)

app.listen(
    PORT,
    ()=> {
        console.log(`Aplicacion escuchando exitosamente el puerto ${PORT}`)
    }
)