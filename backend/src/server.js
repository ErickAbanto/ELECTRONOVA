import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { authRoutes } from "./routes/auth.routes.js";
import { productosRoutes } from "./routes/productos.routes.js";
import { categoriasRoutes } from "./routes/categorias.routes.js";
import { empresaRoutes } from "./routes/empresa.routes.js";
import { usuariosRoutes } from "./routes/usuarios.routes.js";

import { connectDB } from "./config/db.js";


dotenv.config();


const app = express();


// Conectar Base de Datos
connectDB();


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Configuración CORS
const allowedOrigin =
  process.env.ALLOWED_ORIGIN || "http://localhost:5173";


app.use(
  cors({
    origin: allowedOrigin,
  })
);


// ===============================
// PRUEBA DE CONEXIÓN FRONTEND-BACKEND
// ===============================

app.get("/", (req, res) => {

  res.json({
    mensaje: "API ELECTRONOVA conectada correctamente"
  });

});


// ===============================
// RUTAS DE LA API
// ===============================

app.use("/auth", authRoutes);

app.use("/productos", productosRoutes);

app.use("/categorias", categoriasRoutes);

app.use("/empresa", empresaRoutes);

app.use("/usuarios", usuariosRoutes);


// Puerto
const PORT = Number(process.env.PORT) || 3000;


// Iniciar servidor
app.listen(PORT, () => {

  console.log(`Server on: http://localhost:${PORT}/`);

});