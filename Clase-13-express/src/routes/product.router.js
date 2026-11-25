import express from 'express';
import { crearProducto, eliminarProductoPorId, obtenerProductoPorId } from '../repository/product.repository.js';


const productsRouter = express.Router()

const products = []


//Crear producto
productsRouter.post('/',
    async (request, response) => {
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

        await crearProducto(title, price)

        return response.send({
            ok: true,
            message: "El producto fue agregado existosamente"
        }
        )
    }
)

//Eliminar producto
productsRouter.delete(
    '/:product_id',
    async (request, response) =>{
        const {product_id} = request.params
        
        const product_to_delete = await obtenerProductoPorId(product_id)

        if(!product_to_delete){
            return response.send(
                {
                    ok: false,
                    message: "Producto no encontrado"
                }
            )
        }

        await eliminarProductoPorId(product_id)
        return response.send(
            {
                ok: true,
                message: "Producto eliminado existosamente"
            }
        )
    }
)


//Buscar producto por id
productsRouter.get(
    '/:product_id',
    async (request, response) => {
        const {product_id} = request.params
        
        const product_detail= await obtenerProductoPorId(product_id)
        if(!product_detail){
            return response.send(
                {
                    ok: false,
                    message: "Producto por id no encontrado"
                }
            )
        }
        return response.send({
            ok: true,
            message: "Producto por id obtenido existosamente",
            data: {
                product_detail: product_detail
            }
        })

    }
)

//Filtrar productos: max_price, min_price, search_term
productsRouter.get(
    '/',
    (request, response) => {        
        const {search_term, min_price, max_price} = request.query
        
        //Si hay precio mínimo, debe ser un numero positivo
        if (min_price && (isNaN(min_price) || Number(min_price) < 0)){
            return response.send({
                ok: false,
                message: "min_price debe ser un numero positivo"
            }
            )
        }
        if(max_price && (isNaN(max_price) || Number(max_price) < 0)){
            return response.send({
                ok: false,
                message: "max_price debe ser un numero positivo"
            })
        }
        console.log({min_price, max_price, resultado: min_price >= max_price})
        if (min_price && (Number(min_price) >= Number(max_price))){
            return response.send({
                ok: false,
                message: "min_price debe ser un numero menor a max_price"
            })
        }

        let filtered_products = [...products]
        if(min_price){
            filtered_products = filtered_products.filter(product => Number(product.price) >= Number(min_price))
        }

        if(max_price){
            filtered_products = filtered_products.filter(product => Number(product.price) <= Number(max_price))
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

//Actualizar producto por id
productsRouter.put(
    '/:product_id',
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

export default productsRouter