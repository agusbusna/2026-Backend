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
    '/ping', 
    (request, response) => {
        response.send(
            {
                ok: true,
                message: "Pong!"
            }
        )
    }

    )


const products = []

app.get(
    '/products',
    (request, response) => {

        /* 
        filtros: max_price, min_price, search_term
        */
        
        const {search_term, min_price, max_price} = request.query
        
        //Si hay precio mínimo, debe ser un numero positivo
        if (min_price && (isNaN(min_price) || min_price < 0)){
            return response.send({
                ok: false,
                message: "min_price debe ser un numero positivo"
            }
            )
        }
        if(max_price && (isNaN(max_price) || max_price < 0)){
            return response.send({
                ok: false,
                message: "max_price debe ser un numero positivo"
            })
        }
        if (min_price && min_price >= max_price){
            return response.send({
                ok: false,
                message: "min_price debe ser un numero menor a max_price"
            })
        }

        let filtered_products = [...products]
        if(min_price){
            filtered_products = filtered_products.filter(product => product.price >= min_price)
        }

        if(max_price){
            filtered_products = filtered_products.filter(product => product.price <= max_price)
        }

        if (search_term){
            filtered_products = filtered_products.filter(product => product.title.toLowerCase().includes(search_term.trim().toLowerCase()))
        }
        response.send({
            ok: true,
            message: "Lista de productos obtenida",
            data: {
                products: filtered_products
            }
        })

    }
)

/* 
    titulo, precio
*/
app.post('/products',
    (request, response) => {
        const {title, price} = request.body
        if(!title || !price){
            return response.send({
                ok: false,
                message: 'title y price son valores requeridos'
            })
        }
        if(title.lenght < 2){
            return response.send({
                ok: false,
                message: "title debe ser un string de más de dos caracteres"
            })
        }
        if(isNaN(price) || price <=0){
            return response.send({
                ok: false,
                message: "price debe ser un número positivo"
            })
        }

        //Agrego el producto a la lista interna
        products.push({
            title: title,
            price: price, 
            id: products.length + 1
        })

        return response.send({
            ok: true,
            message: "El producto fue agregado existosamente"
        }
        )
    }
)


app.get (
    '/products/:product_id',
    (request, response) => {
        const {product_id} = request.params

        if(!product_id || product_id < 0){
            return response.send({
                ok: false,
                message: "product_id debe ser un numero positivo"
            })
        }
        for(const product of products){
            if(Number(product.id) === Number(product_id)){
                return response.send (
                    {
                        ok: true,
                        message: "Producto por id obetenido correctamente",
                        data: {
                            product_detail: product
                        }
                    }
                ) 
            }
        }
        return response.send(
            {
                ok: false,
                message: "Producto por id no encontrado"
            }
        )
    }
)

app.delete(
    '/products/:product_id',
    (request, response) =>{
        const {product_id} = request.params
        console.log('ID Buscado:', product_id)
        console.log('Productos registrados:', products)
        
        if(!product_id || product_id < 0){
            return response.send({
                ok: false,
                message: "product_id debe ser un numero positivo"
            })
        }
        for(const product of products){
            if (Number(product.id) === Number(product_id)){
                const product_index = products.indexOf(product)
                products.splice(product_index, 1)

                return response.send(
                    {
                        ok: true,
                        message: "Producto eliminado existosamente"
                    }
                )
            }
        }
        return response.send(
            {
                ok: false,
                message: "Producto no encontrado"
            }
        )
    }
)

/* 
PUT /products/:product_id
body: {price, title}
*/

app.put(
    '/products/:product_id',
    (request, response) =>{
        const {product_id} = request.params
        const {price, title} = request.body
        
        console.log('ID Buscado:', product_id)
        console.log('Productos registrados:', products)
        
        if(!product_id || product_id < 0){
            return response.send({
                ok: false,
                message: "product_id debe ser un numero positivo"
            })
        }
        if(price && (isNaN(price) || price <= 0)){
            return response.send(
                {
                    ok: false,
                    message: "El precio debe ser un numero positivo"
                }
            )
        }
        if (title && (title.lenght < 2)){
            return response.send(
                {
                    ok: false,
                    message: "El titulo debe ser un texto de más de dos caracteres"
                }
            )
        }

        for (let product of products){
            if (Number(product.id) === Number(product_id)){
                if (price){
                    product.price = price
                }

                if (title){
                    product.title = title
                }
                return response.send({
                    ok: true,
                    message: "Producto actualizado exitosamente"
                })
            }
        }
        return response.send({
            ok: false,
            message: "Producto no encontrado"
        })
    }
)
/*  
    En el cliente la validacion es OPCIONAL
    En el Servidor la validacion es SIEMPRE OBLIGATORIA.
*/
/*
    GET / => Mensaje/pantalla de bievenidad de la API
    GET /healtcheck => Mensaje con una definicion de la sanidad de sus servicios
    {
        ok: true,
        status: 200,
        message: "Healtcheck",
        services: [
            {
                name: "Database conecction",
                status: 'coneccted'
            }
        ]
    }
    GET /ping => Mensaje de PONG, normalmente para saber si una API da señales de vida. 
 */


app.listen(
    PORT,
    ()=> {
        console.log(`Aplicacion escuchando exitosamente el puerto ${PORT}`)
    }
)