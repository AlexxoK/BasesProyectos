import { response, request } from "express";
import Cliente from "./cliente.model.js";

export const saveCliente = async (req, res) => {
    try {
        const data = req.body;

        const cliente = new Cliente(data);

        await cliente.save();

        res.status(200).json({
            success: true,
            message: 'Cliente saved successfully!',
            cliente
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error saving Cliente!',
            error
        })
    }
}

export const findAllClientes = async (req = request, res = response) => {
    try {
        const { limite = 10, desde = 0 } = req.query;
        const query = { estado: true };

        const [total, clientes] = await Promise.all([
            Cliente.countDocuments(query),
            Cliente.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        res.status(200).json({
            success: true,
            total,
            clientes
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error getting clientes!',
            error
        })
    }
}

export const findOneClienteById = async (req, res) => {
    try {
        const { id } = req.params;

        const cliente = await Cliente.findById(id);

        if (!cliente) {
            return res.status(404).json({
                success: false,
                msg: 'Cliente not found!'
            })
        }

        res.status(200).json({
            success: true,
            cliente
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error getting cliente!',
            error
        })
    }
}

export const putClienteById = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { _id, ...data } = req.body;

        const cliente = await Cliente.findById(id);

        if (!cliente) {
            return res.status(404).json({
                success: false,
                msg: 'Cliente not found!',
            });
        }

        const updatedCliente = await Cliente.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Cliente updated successfully!',
            cliente: updatedCliente,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            msg: 'Error updating cliente!',
            error: error.message || 'Internal server error',
        });
    }
};

export const deleteClienteById = async (req, res) => {
    try {

        const { id } = req.params;

        const cliente = await Cliente.findByIdAndUpdate(id, { estado: false }, { new: true });

        const authenticatedCliente = req.cliente;

        res.status(200).json({
            success: true,
            msg: 'Deactivate cliente!',
            cliente,
            authenticatedCliente
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Deactivate error!',
            error
        })
    }
}