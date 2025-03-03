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

    email: {
        type: String,
        required: [true, "The email is required!"],
        unique: true,
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

ClienteSchema.methods.toJSON = function () {
    const { _v, password, _id, ...cliente } = this.toObject();
    cliente.uid = _id;
    return cliente;
};

export default model('Cliente', ClienteSchema);