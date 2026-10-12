import { Administrador } from "../models/Administrador.js";

const usuariosService = {
  async listarTodos() {
    return await Administrador.find().select("-contraseña");
  },
};

export { usuariosService };
