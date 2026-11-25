/* 

    Los repositories es una capa del servidor que tendrá la responsabilidad de interactuar con la DB

*/
import Usuario from "../models/user.model.js"


export async function crearUsuario (nombre, email, password){
    await Usuario.create({
        nombre: nombre,
        email: email,
        password: password
    })
}

export async function buscarUsuarioPorId (usuario_id){
    return await Usuario.findById(usuario_id)
}

export async function eliminarUsuarioPorId(usuario_id){
    await Usuario.findByIdAndDelete(usuario_id)
}

export async function actualizarUsuarioPorId(usuario_id, datosActualizados){
    return await Usuario.findByIdAndUpdate(
        usuario_id, 
        datosActualizados, 
        { new: true }) //Devuelve el dato actualizado
}

export async function obtenerUsuarios(){
    return await Usuario.find()
}