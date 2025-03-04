import { Router } from "express";
import { check } from "express-validator";
import { saveEmpresa, findAllEmpresas, findOneEmpresaById, putEmpresaById, deleteEmpresaById } from "./empresa.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWTAdmin } from "../middlewares/validar-jwt.js";
import { tieneRoleAdmin } from "../middlewares/validar-roles.js";
import { existeEmpresaById } from "../helpers/db-validator.js";

const router = Router();

router.post(
    "/saveEmpresa",
    [
        validarJWTAdmin,
        tieneRoleAdmin("ADMIN_ROLE"),
        validarCampos
    ],
    saveEmpresa
)

router.get("/findAllEmpresas", findAllEmpresas)

router.get(
    "/findOneEmpresaById/:id",
    [
        validarJWTAdmin,
        tieneRoleAdmin("ADMIN_ROLE"),
        check("id", "id invalid!").isMongoId(),
        check("id").custom(existeEmpresaById),
        validarCampos
    ],
    findOneEmpresaById
)

router.put(
    "/putEmpresaById/:id",
    [
        validarJWTAdmin,
        tieneRoleAdmin("ADMIN_ROLE"),
        check("id", "id invalid!").isMongoId(),
        check("id").custom(existeEmpresaById),
        validarCampos
    ],
    putEmpresaById
)

router.delete(
    "/deleteEmpresaById/:id",
    [
        validarJWTAdmin,
        tieneRoleAdmin("ADMIN_ROLE"),
        check("id", "id invalid!").isMongoId(),
        check("id").custom(existeEmpresaById),
        validarCampos
    ],
    deleteEmpresaById
)

export default router;