import { Schema, model } from "mongoose";

const AdministradorSchema = new Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true }
}, {
  timestamps: false,
  versionKey: false
});

export const Administrador = model("Administrador", AdministradorSchema);
