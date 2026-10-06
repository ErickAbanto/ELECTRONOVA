import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { authRoutes } from "./routes/auth.routes.js";
import { productosRoutes } from "./routes/productos.routes.js";
import { categoriasRoutes } from "./routes/categorias.routes.js";
import { empresaRoutes } from "./routes/empresa.routes.js";
import { usuariosRoutes } from "./routes/usuarios.routes.js";
import { connectDB } from "./config/db.js";
import multer from "multer";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigin =
  process.env.ALLOWED_ORIGIN ||
  process.env.FRONTEND_URL ||
  "http://localhost:5173";
app.use(
  cors({
    origin: allowedOrigin,
  }),
);

app.get("/", (req, res) => {
  res.json({ mensaje: "Conexión exitosa al backend de Electronova" });
});

app.use("/auth", authRoutes);
app.use("/productos", productosRoutes);
app.use("/categorias", categoriasRoutes);
app.use("/empresa", empresaRoutes);
app.use("/usuarios", usuariosRoutes);

// Manejador global de errores (captura MulterErrors, etc.)
app.use((err, req, res, next) => {
  console.error("Error global:", err);
  if (err instanceof multer?.MulterError) {
    return res.status(400).json({ message: `Error al subir archivo: ${err.message}` });
  }
  res.status(500).json({ message: err.message || "Error interno del servidor" });
});

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Servidor en: http://localhost:${PORT}/`);
});
