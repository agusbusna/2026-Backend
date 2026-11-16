import Usuario from "./models/user.model.js";
import connectMongoDB from "./config/mongoDB.config.js";
import { actualizarUsuarioPorId, buscarUsuarioPorId, eliminarUsuarioPorId, obtenerUsuarios } from "./repository/user.repository.js";
import { crearEspacio, eliminarEspacioPorId } from "./repository/espacioTrabajo.repository.js";
import { obtenerCanalPorId } from "./repository/canal.repository.js";
import { crearCanal } from "./repository/canal.repository.js";



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
    /* const result = await actualizarUsuarioPorId(
        '6afaff17db5c3a4bca3a8c4b',
        {
            titulo: "test",
        }) */

    const result = await obtenerCanalPorId('6afb0f2549fbc6d4738214b1')
    console.log(result) 
}

probar()

/* AHORA
Crear un nuevo Model de mongoose llamada Canal que tendra las propiedades
    - titulo
    - descripcion
    - fecha_creacion
    - fk_id_espacio (el espacio de trabajo al que se relaciona el canal)
Crear el canal.repository.js donde estara la funcion:
    crearCanal(titulo, descipcion, id_espacio)
    obtenerCanalPorId(canal_id) traera en su respuesta el nombre del espacio de trabajo asociado (PROTIP: Aca es donde va el populate)
    */