import { Router } from "express";
import { getUsuarios } from "../controllers/usuarios.controller.js";

const usuariosRoutes = Router();

usuariosRoutes.get("/", getUsuarios);

export { usuariosRoutes };
