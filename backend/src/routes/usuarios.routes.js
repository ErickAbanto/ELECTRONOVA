import { Router } from "express";
import { getUsuarios } from "../controllers/usuarios.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const usuariosRoutes = Router();

// Protegido con authMiddleware
usuariosRoutes.get("/", authMiddleware, getUsuarios);

export { usuariosRoutes };
