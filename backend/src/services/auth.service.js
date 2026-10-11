import jwt from "jsonwebtoken";
import { Administrador } from "../models/Administrador.js";
import { enviarCorreoRecuperacion } from "../utils/email.util.js";

const authService = {
  async login(correo, contraseña) {
    const admin = await Administrador.findOne({ correo });
    if (!admin) {
      const err = new Error("Credenciales inválidas.");
      err.status = 401;
      throw err;
    }

    const esValida = await admin.comparePassword(contraseña);
    if (!esValida) {
      const err = new Error("Credenciales inválidas.");
      err.status = 401;
      throw err;
    }

    const token = jwt.sign(
      { id: admin._id, correo: admin.correo },
      process.env.JWT_SECRET || "super_secreto_desarrollo_2026",
      { expiresIn: "1d" }
    );

    return {
      token,
      admin: {
        id: admin._id,
        nombre: admin.nombre,
        correo: admin.correo,
      },
    };
  },

  async solicitarRecuperacion(correo) {
    const admin = await Administrador.findOne({ correo });
    if (!admin) {
      const err = new Error("No existe un administrador registrado con ese correo.");
      err.status = 404;
      throw err;
    }

    const secret = (process.env.JWT_SECRET || "super_secreto_desarrollo_2026") + admin.contraseña;
    const token = jwt.sign({ correo: admin.correo, id: admin._id }, secret, {
      expiresIn: "15m",
    });

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const resetLink = `${frontendUrl}/reset-password?token=${token}&id=${admin._id}`;

    await enviarCorreoRecuperacion({
      destinatario: admin.correo,
      nombre: admin.nombre,
      resetLink,
    });
  },

  async restablecerContraseña(id, token, nuevaContrasena) {
    const admin = await Administrador.findById(id);
    if (!admin) {
      const err = new Error("Administrador no encontrado.");
      err.status = 404;
      throw err;
    }

    const secret = (process.env.JWT_SECRET || "super_secreto_desarrollo_2026") + admin.contraseña;

    try {
      jwt.verify(token, secret);
    } catch {
      const err = new Error("El enlace de recuperación es inválido o ha expirado.");
      err.status = 400;
      throw err;
    }

    admin.contraseña = nuevaContrasena;
    await admin.save();
  },
};

export { authService };
