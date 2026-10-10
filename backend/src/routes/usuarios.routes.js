import { Router } from "express";
import { getUsuarios, registrarUsuario, loginUsuario } from "../controllers/usuarios.controller.js";

const usuariosRoutes = Router();

usuariosRoutes.get("/", getUsuarios);
usuariosRoutes.post("/register", registrarUsuario);
usuariosRoutes.post("/login", loginUsuario);

export { usuariosRoutes };
