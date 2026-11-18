import mongoose from "mongoose";

const espacioTrabajoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    fecha_creacion: {
        type: Date,
        default: Date.now
    }
})

export const ESPACIOTRABAJO_COLLECTION_NAME = "espaciosTrabajo"
const EspacioTrabajo = mongoose.model(ESPACIOTRABAJO_COLLECTION_NAME, espacioTrabajoSchema)

export default EspacioTrabajo