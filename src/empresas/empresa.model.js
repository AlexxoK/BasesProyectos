import { Schema, model } from "mongoose";

const EmpresaSchema = Schema({
    impacto: {
        type: String,
        required: [true, "El impacto es obligatorio."],
        maxlength: [500, "El impacto debe tener máximo 500 caracteres."],
        trim: true,
    },

    trayectoria: {
        type: String,
        required: [true, "La trayectoria es obligatoria."],
        maxlength: [500, "La trayectoria debe tener máximo 500 caracteres."],
        trim: true,
    },

    categoria: {
        type: String,
        required: [true, "La categoría empresarial es obligatoria."],
        maxlength: [500, "La categoría debe tener máximo 500 caracteres."],
        trim: true,
    },

    estado: {
        type: Boolean,
        default: true,
    }
},
    {
        timestamps: true,
        versionKey: false,
    });

export default model('Empresa', EmpresaSchema);