import './TarjetaProducto.css';

const TarjetaProducto = ({
  imagen,
  titulo,
  precio,
  onClick,
}) => {
  const precioFormateado = Number(precio || 0).toFixed(2);

  return (
    <article className="tarjeta-producto">
      <div className="producto-imagen">
        <img
          src={imagen}
          alt={titulo}
          loading="lazy"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300";
          }}
        />
      </div>

      <div className="producto-info">
        <h3 className="producto-titulo">{titulo}</h3>

        <div className="producto-footer">
          <p className="producto-precio">S/ {precioFormateado}</p>

          <button
            className="producto-ver"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onClick) onClick();
            }}
          >
            Ver detalle
          </button>
        </div>
      </div>
    </article>
  );
};

export default TarjetaProducto;