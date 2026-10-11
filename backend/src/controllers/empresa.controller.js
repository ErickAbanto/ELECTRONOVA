import { empresaService } from "../services/empresa.service.js";

const getEmpresa = async (req, res, next) => {
  try {
    const empresa = await empresaService.obtenerDatos();
    if (!empresa) {
      return res.status(404).json({ message: "Datos de empresa no encontrados" });
    }
    return res.status(200).json(empresa);
  } catch (error) {
    next(error);
  }
};

export { getEmpresa };
