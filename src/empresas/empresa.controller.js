import { response, request } from "express";
import Empresa from "./empresa.model.js";

export const saveEmpresa = async (req, res) => {
    try {
        const data = req.body;

        const empresa = new Empresa(data);

        await empresa.save();

        res.status(200).json({
            success: true,
            message: 'Empresa guardada con éxito!',
            empresa
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al guardar la empresa!',
            error
        })
    }
}

export const findAllEmpresas = async (req = request, res = response) => {
    try {
        const { limite = 10, desde = 0 } = req.query;
        const query = { estado: true };

        const [total, empresas] = await Promise.all([
            Empresa.countDocuments(query),
            Empresa.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        res.status(200).json({
            success: true,
            total,
            empresas
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al obtener las empresas!',
            error
        })
    }
}

export const findOneEmpresaById = async (req, res) => {
    try {
        const { id } = req.params;

        const empresa = await Empresa.findById(id);

        if (!empresa) {
            return res.status(404).json({
                success: false,
                msg: 'Empresa no encontrada!'
            })
        }

        res.status(200).json({
            success: true,
            empresa
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al obtener la empresa!',
            error
        })
    }
}

export const putEmpresaById = async (req, res) => {
    try {
        const { id } = req.params;
        const { _id, ...data } = req.body;

        const empresa = await Empresa.findById(id);

        if (!empresa) {
            return res.status(404).json({
                success: false,
                msg: 'Empresa no encontrada!',
            });
        }

        const updatedEmpresa = await Empresa.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Empresa actualizada con éxito!',
            empresa: updatedEmpresa,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            msg: 'Error al actualizar la empresa!',
            error: error.message || 'Error interno del servidor',
        });
    }
};

export const deleteEmpresaById = async (req, res) => {
    try {

        const { id } = req.params;

        const empresa = await Empresa.findByIdAndUpdate(id, { estado: false }, { new: true });

        const authenticatedEmpresa = req.empresa;

        res.status(200).json({
            success: true,
            msg: 'Empresa desactivada!',
            empresa,
            authenticatedEmpresa
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al desactivar la empresa!',
            error
        })
    }
}