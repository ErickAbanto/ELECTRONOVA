import { Categoria } from "../models/Categoria.js";

const categoriasService = {
  async listarTodas() {
    return await Categoria.find().sort({ nombre: 1 });
  },

  async obtenerPorId(id) {
    return await Categoria.findById(id);
  },

  async crear(datos) {
    const nuevaCategoria = new Categoria(datos);
    return await nuevaCategoria.save();
  },

  async actualizar(id, datos) {
    return await Categoria.findByIdAndUpdate(id, datos, {
      returnDocument: "after",
    });
  },

  async eliminar(id) {
    return await Categoria.findByIdAndDelete(id);
  },
};

export { categoriasService };
