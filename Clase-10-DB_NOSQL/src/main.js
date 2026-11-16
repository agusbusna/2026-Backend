import Usuario from "./models/user.model.js";
import connectMongoDB from "./config/mongoDB.config.js";
import { actualizarUsuarioPorId, buscarUsuarioPorId, eliminarUsuarioPorId, obtenerUsuarios } from "./repository/user.repository.js";
import { crearEspacio, eliminarEspacioPorId } from "./repository/espacioTrabajo.repository.js";



connectMongoDB()



//crearUsuario("maria", "maria@gmail.com", "maria1234")
async function probar() {
    //const result = await buscarUsuarioPorId("6af480a4455c09fa13534e0c")
    //const result = await eliminarUsuarioPorId("6af480a4455c09fa13534e0c")
    
    /* const result = await actualizarUsuarioPorId(
        '6af47c3cb02e3a48dad0fe6e',
        {
        nombre: "josesito"
        }) */
    //const result = await obtenerUsuarios()
    //const result = await eliminarEspacioPorId('6afaffd3b39aa5998d626107')
    const result = await actualizarUsuarioPorId(
        '6afaff17db5c3a4bca3a8c4b',
        {
            titulo: "test",
        })
    console.log(result)
}

probar()

