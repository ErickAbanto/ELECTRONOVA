import { Router } from "express";
import {
  getCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria
} from "../controllers/categorias.controller.js";

const categoriasRoutes = Router();

categoriasRoutes.get("/", getCategorias);
categoriasRoutes.get("/:id", getCategoriaById);
categoriasRoutes.post("/", createCategoria);
categoriasRoutes.put("/:id", updateCategoria);
categoriasRoutes.delete("/:id", deleteCategoria);

export { categoriasRoutes };
