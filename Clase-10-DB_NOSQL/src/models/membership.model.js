import mongoose from "mongoose";
import { USUARIO_COLLECTION_NAME } from "./user.model";
import { ESPACIOTRABAJO_COLLECTION_NAME } from "./workSpace.model";


const membresiaSchema = new mongoose.Schema({
    rol: {
        type: String,
        enum: ["usuario", "administrador", "dueño"],
        required: true,
        default: "usuario"
    },
    fecha_creacion: {
        type: Date,
        default: Date.now
    },
    fk_id_usuario: {
        ref: USUARIO_COLLECTION_NAME,
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    fk_id_espacio_trabajo: {
        ref: ESPACIOTRABAJO_COLLECTION_NAME,
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

export const MEMBRESIA_COLLECTION_NAME = "membresias"

const Membresia = mongoose.model(MEMBRESIA_COLLECTION_NAME, membresiaSchema)

export default Membresia