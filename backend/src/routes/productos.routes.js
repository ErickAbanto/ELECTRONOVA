import { Router } from "express";
import {
  getProductos,
  searchProductos,
  filterProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
} from "../controllers/productos.controller.js";

const productosRoutes = Router();

productosRoutes.get("/", getProductos);
productosRoutes.get("/buscar", searchProductos);
productosRoutes.get("/filtrar", filterProductos);
productosRoutes.get("/:id", getProductoById);
productosRoutes.post("/", createProducto);
productosRoutes.put("/:id", updateProducto);
productosRoutes.delete("/:id", deleteProducto);

export { productosRoutes };
