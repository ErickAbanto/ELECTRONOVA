import { Empresa } from "../models/Empresa.js";

export const getEmpresa = async (req, res) => {
  try {
    const empresa = await Empresa.findOne();
    if (!empresa) return res.status(404).json({ message: "Datos de empresa no encontrados" });
    res.status(200).json(empresa);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
