import Producto from "../models/product.model.js";
/* 
Desarrollar la funcion:
-crearProduct (title, price)
-obtenerProductPorId(product_id)
-eliminarProductPorId(product_id)
-actualizarProductPorId(product_id, update_product)
*/

export async function crearProducto(title, price){
    await Producto.create({
        title: title,
        price: price
    })
}

export async function obtenerProductoPorId(product_id){
    const producto = await Producto.findById(product_id)
    return producto
}

export async function actualizarProductoorId (product_id, update_product){
    return await Producto.findByIdAndUpdate(
        product_id,
        update_product,
        { new: true }
    )
}

export async function eliminarProductoPorId(product_id){
    await Producto.findByIdAndDelete(product_id)
}