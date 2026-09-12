import { Administrador } from "../models/Administrador.js";

export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Administrador.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
