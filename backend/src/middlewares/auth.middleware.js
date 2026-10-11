import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "No autorizado. Token no proporcionado o formato inválido.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "super_secreto_desarrollo_2026"
    );
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "No autorizado. Token inválido o expirado.",
    });
  }
};

export { authMiddleware };
