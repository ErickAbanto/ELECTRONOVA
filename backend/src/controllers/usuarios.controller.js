import { usuariosService } from "../services/usuarios.service.js";

const getUsuarios = async (req, res, next) => {
  try {
    const usuarios = await usuariosService.listarTodos();
    return res.status(200).json(usuarios);
  } catch (error) {
    next(error);
  }
};

export { getUsuarios };
