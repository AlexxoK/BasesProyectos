import { Router } from "express";
import { check } from "express-validator";
import { saveCliente, findAllClientes, findOneClienteById, putClienteById, deleteClienteById } from "./cliente.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWTAdmin } from "../middlewares/validar-jwt.js";
import { tieneRoleAdmin } from "../middlewares/validar-roles.js";
import { existeClienteById } from "../helpers/db-validator.js";

const router = Router();

router.post(
    "/saveCliente",
    [
        validarJWTAdmin,
        tieneRoleAdmin("ADMIN_ROLE"),
        validarCampos
    ],
    saveCliente
)

router.get("/findAllClientes", findAllClientes)

router.get(
    "/findOneClienteById/:name",
    [
        validarJWTAdmin,
        tieneRoleAdmin("ADMIN_ROLE"),
        check("id", "id invalid!").isMongoId(),
        check("id").custom(existeClienteById),
        validarCampos
    ],
    findOneClienteById
)

router.put(
    "/putClienteById/:id",
    [
        validarJWTAdmin,
        tieneRoleAdmin("ADMIN_ROLE"),
        check("id", "id invalid!").isMongoId(),
        check("id").custom(existeClienteById),
        validarCampos
    ],
    putClienteById
)

router.delete(
    "/deleteClienteById/:id",
    [
        validarJWTAdmin,
        tieneRoleAdmin("ADMIN_ROLE"),
        check("id", "id invalid!").isMongoId(),
        check("id").custom(existeClienteById),
        validarCampos
    ],
    deleteClienteById
)

export default router;