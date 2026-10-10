import { Administrador } from "../models/Administrador.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secreto_super_seguro";

export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Administrador.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, correo, contraseña } = req.body;
    
    // Verificar si el correo ya existe
    const existe = await Administrador.findOne({ correo });
    if (existe) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    const nuevoAdmin = new Administrador({ nombre, correo, contraseña });
    await nuevoAdmin.save();

    const token = jwt.sign({ id: nuevoAdmin._id }, JWT_SECRET, { expiresIn: "1d" });
    
    res.status(201).json({ admin: nuevoAdmin, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUsuario = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    const admin = await Administrador.findOne({ correo });
    if (!admin) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await admin.comparePassword(contraseña);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: "1d" });
    
    res.status(200).json({ admin, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
