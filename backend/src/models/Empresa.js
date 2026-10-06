import { Schema, model } from "mongoose";

const EmpresaSchema = new Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: false },
    direccion: { type: String, required: false },
    horarioAtencion: { type: String, required: false },
    redesSociales: { type: String, required: false },
    contacto: { type: String, required: false },
    idAdministrador: {
      type: Schema.Types.ObjectId,
      ref: "Administrador",
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  },
);

export const Empresa = model("Empresa", EmpresaSchema);
