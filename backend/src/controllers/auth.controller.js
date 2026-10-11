import { authService } from "../services/auth.service.js";

const login = async (req, res, next) => {
  const { correo, contraseña } = req.body;

  if (!correo || !contraseña) {
    return res.status(400).json({ message: "Por favor, proporcione correo y contraseña." });
  }

  try {
    const resultado = await authService.login(correo, contraseña);
    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      ...resultado,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  return res.status(200).json({
    message: "Cierre de sesión exitoso. Por favor, elimine el token en el cliente.",
  });
};

const forgotPassword = async (req, res, next) => {
  const { correo } = req.body;

  if (!correo) {
    return res.status(400).json({ message: "El correo es obligatorio." });
  }

  try {
    await authService.solicitarRecuperacion(correo);
    return res.status(200).json({
      message: "Se ha enviado un enlace de recuperación a su correo electrónico.",
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  const { id, token, nuevaContrasena } = req.body;

  if (!id || !token || !nuevaContrasena) {
    return res.status(400).json({ message: "Faltan datos obligatorios." });
  }

  try {
    await authService.restablecerContraseña(id, token, nuevaContrasena);
    return res.status(200).json({ message: "Contraseña actualizada exitosamente." });
  } catch (error) {
    next(error);
  }
};

export { login, logout, forgotPassword, resetPassword };
