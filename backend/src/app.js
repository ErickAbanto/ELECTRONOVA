import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { authRoutes } from "./routes/auth.routes.js";
import { productosRoutes } from "./routes/productos.routes.js";
import { categoriasRoutes } from "./routes/categorias.routes.js";
import { empresaRoutes } from "./routes/empresa.routes.js";
import { usuariosRoutes } from "./routes/usuarios.routes.js";

dotenv.config();

const app = express();

// Middlewares
const allowedOrigin =
  process.env.ALLOWED_ORIGIN ||
  process.env.FRONTEND_URL ||
  "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Rutas
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API ELECTRONOVA operativa",
  });
});

app.use("/auth", authRoutes);
app.use("/productos", productosRoutes);
app.use("/categorias", categoriasRoutes);
app.use("/empresa", empresaRoutes);
app.use("/usuarios", usuariosRoutes);

// Manejo de ruta no encontrada (404)
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `La ruta '${req.originalUrl}' no existe.`,
  });
});

// Manejo global de errores (500)
app.use((err, req, res, next) => {
  console.error("[Error]:", err.message || err);
  res.status(err.status || 500).json({
    message: err.message || "Error interno del servidor",
  });
});

export { app };
export default app;
