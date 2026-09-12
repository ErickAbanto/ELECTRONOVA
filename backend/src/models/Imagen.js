import { Schema, model } from "mongoose";

const ImagenSchema = new Schema({
  idProducto: { type: Schema.Types.ObjectId, ref: "Producto", required: true },
  tipo: { type: String, required: true },
  ubicacion: { type: String, required: true },
  almacenamiento: { type: String, required: true }
}, {
  timestamps: false,
  versionKey: false
});

export const Imagen = model("Imagen", ImagenSchema);
