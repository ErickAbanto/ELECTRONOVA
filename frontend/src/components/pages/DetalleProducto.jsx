import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { productosService } from "../../services/productos.service";
import "./DetalleProducto.css";

export const DetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const data = await productosService.getProductoById(id);
        setProducto(data);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar el producto");
        setLoading(false);
      }
    };
    fetchProducto();
  }, [id]);

  if (loading)
    return <div className="detalle-loading">Cargando producto...</div>;
  if (error) return <div className="detalle-error">{error}</div>;
  if (!producto)
    return <div className="detalle-not-found">Producto no encontrado</div>;

  return (
    <div className="detalle-producto-container">
      <Link to="/productos" className="btn-volver">
        &larr; Volver a Productos
      </Link>
      <div className="detalle-grid">
        <div className="detalle-imagenes">
          {producto.imagenes && producto.imagenes.length > 0 ? (
            <img
              src={`http://localhost:3000${producto.imagenes[0].url}`}
              alt={producto.nombre}
              className="detalle-imagen-principal"
            />
          ) : (
            <div className="detalle-imagen-placeholder">Sin imagen</div>
          )}
          <div className="detalle-miniaturas">
            {producto.imagenes?.slice(1).map((img, idx) => (
              <img
                key={idx}
                src={`http://localhost:3000${img.url}`}
                alt={`${producto.nombre} miniatura`}
                className="detalle-miniatura"
              />
            ))}
          </div>
        </div>
        <div className="detalle-info">
          <h1 className="detalle-titulo">{producto.nombre}</h1>
          <p className="detalle-precio">S/ {producto.precio?.toFixed(2)}</p>
          <div className="detalle-descripcion">
            <h3>Descripción Corta</h3>
            <p>{producto.descripcionCorta}</p>
          </div>
          {producto.caracteristicas && (
            <div className="detalle-caracteristicas">
              <h3>Características</h3>
              <p>{producto.caracteristicas}</p>
            </div>
          )}
          {producto.especificacionesTec && (
            <div className="detalle-especificaciones">
              <h3>Especificaciones Técnicas</h3>
              <p>{producto.especificacionesTec}</p>
            </div>
          )}
          {producto.descripcionCompleta && (
            <div className="detalle-descripcion-completa">
              <h3>Descripción Completa</h3>
              <p>{producto.descripcionCompleta}</p>
            </div>
          )}
          <button className="btn-comprar">Añadir al Carrito</button>
        </div>
      </div>
    </div>
  );
};
