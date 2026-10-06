import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import { Administrador } from "../models/Administrador.js";
import { Categoria } from "../models/Categoria.js";
import { Empresa } from "../models/Empresa.js";
import { Producto } from "../models/Producto.js";
import { Imagen } from "../models/Imagen.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log("Limpiando la base de datos...");
    await Administrador.deleteMany({});
    await Categoria.deleteMany({});
    await Empresa.deleteMany({});
    await Producto.deleteMany({});
    await Imagen.deleteMany({});

    console.log("Insertando datos de prueba...");

    const admin = new Administrador({
      nombre: "Admin Principal",
      correo: "admin@electronova.com",
      contraseña: "password123",
    });
    const savedAdmin = await admin.save();

    const empresa = new Empresa({
      nombre: "ELECTRONOVA S.A.C.",
      descripcion: "Catálogo virtual de productos eléctricos",
      direccion: "Av. Principal 123, Lima",
      horarioAtencion: "Lunes a Viernes de 9am a 6pm",
      contacto: "+51 987654321",
      idAdministrador: savedAdmin._id,
    });
    await empresa.save();

    const categoria = new Categoria({
      nombre: "Cables Eléctricos",
      descripcion: "Todo tipo de cables para instalaciones",
      idAdministrador: savedAdmin._id,
    });
    const savedCategoria = await categoria.save();

    const categoria2 = new Categoria({
      nombre: "Iluminación",
      descripcion: "Focos, paneles y luminarias",
      idAdministrador: savedAdmin._id,
    });
    const savedCategoria2 = await categoria2.save();

    const productosParaInsertar = [];
    for (let i = 1; i <= 25; i++) {
      productosParaInsertar.push({
        nombre: `Producto de Prueba ${i} ${i % 2 === 0 ? "Cable" : "Foco"}`,
        productoDestacado: i % 5 === 0,
        especificacionesTec: `Especificaciones técnicas genéricas para el producto ${i}, 600V, resistente.`,
        idCategoria: i % 2 === 0 ? savedCategoria._id : savedCategoria2._id,
        idAdministrador: savedAdmin._id,
        precio: (Math.random() * 100 + 10).toFixed(2),
        caracteristicas: `Característica ${i} - Color ${i % 2 === 0 ? 'Rojo' : 'Blanco'}.`,
        descripcionCorta: `Descripción corta ideal para el producto ${i}`,
        descripcionCompleta: `Descripción muy completa y detallada del producto de prueba número ${i}. Ideal para instalaciones y proyectos eléctricos comerciales y domésticos.`,
      });
    }

    await Producto.insertMany(productosParaInsertar);

    console.log("¡Base de datos inicializada con éxito!");
    process.exit(0);
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error);
    process.exit(1);
  }
};

seedDatabase();
