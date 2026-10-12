import mongoose from "mongoose";
import { categoriasService } from "../services/categorias.service.js";

const getCategorias = async (req, res, next) => {
  try {
    const categorias = await categoriasService.listarTodas();
    return res.status(200).json(categorias);
  } catch (error) {
    next(error);
  }
};

const getCategoriaById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de categoría inválido" });
    }

    const categoria = await categoriasService.obtenerPorId(id);
    if (!categoria) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    return res.status(200).json(categoria);
  } catch (error) {
    next(error);
  }
};

const createCategoria = async (req, res, next) => {
  try {
    const categoriaGuardada = await categoriasService.crear(req.body);
    return res.status(201).json(categoriaGuardada);
  } catch (error) {
    next(error);
  }
};

const updateCategoria = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de categoría inválido" });
    }

    const categoriaActualizada = await categoriasService.actualizar(id, req.body);
    if (!categoriaActualizada) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    return res.status(200).json(categoriaActualizada);
  } catch (error) {
    next(error);
  }
};

const deleteCategoria = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de categoría inválido" });
    }

    const categoriaEliminada = await categoriasService.eliminar(id);
    if (!categoriaEliminada) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    return res.status(200).json({ message: "Categoría eliminada exitosamente" });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    }
    next(error);
  }
};

export {
  getCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};
