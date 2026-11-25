import mongoose from "mongoose";
import { CANAL_COLLECTION_NAME } from "./canal.model.js";
import { MEMBRESIA_COLLECTION_NAME } from "./membership.model.js";

const mensajeSchema = new mongoose.Schema({
    contenido: {
        type: String,
        required: true
    },
    fecha_creacion: {
        type: Date,
        default: Date.now
    },
    fk_id_canal: {
        ref: CANAL_COLLECTION_NAME,
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    fk_id_membresia: {
        ref: MEMBRESIA_COLLECTION_NAME,
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});
export const MENSAJES_COLLECTION_NAME = "mensajes";
const Mensaje = mongoose.model(MENSAJES_COLLECTION_NAME, mensajeSchema);
export default Mensaje;