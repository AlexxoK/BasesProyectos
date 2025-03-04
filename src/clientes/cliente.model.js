import { Schema, model } from "mongoose";

const ClienteSchema = Schema({
    name: {
        type: String,
        required: [true, "The name is required!"],
        maxlength: [25, "25 characters maximum!"],
    },

    surname: {
        type: String,
        required: [true, "The surname is required!"],
        maxlength: [25, "25 characters maximum!"],
    },

    phone: {
        type: String,
        minlength: [8, "Phone number must be 8 digits long"],
        maxlength: [8, "Phone number must be 8 digits long"],
        required: [true, "The phone is required!"],
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

export default model('Cliente', ClienteSchema);