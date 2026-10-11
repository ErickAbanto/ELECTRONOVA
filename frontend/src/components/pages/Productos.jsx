import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import TarjetaProducto from '../molecules/TarjetaProducto';
import ModalProductoDetalle from '../organisms/ModalProductoDetalle';
import Paginacion from '../molecules/Paginacion';
import { productosService } from '../../services/productos.service';
import { categoriasService } from '../../services/categorias.service';
import './Productos.css';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [error, setError] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [filtrosMobileAbiertos, setFiltrosMobileAbiertos] = useState(false);
  
  // Estado de paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const [paginacionInfo, setPaginacionInfo] = useState(null);
  const limitePorPagina = 12;

  const location = useLocation();

  const [busqueda, setBusqueda] = useState(() => {
    const q = new URLSearchParams(location.search).get('q');
    return q || '';
  });

  // Cargar categorías una sola vez
  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const catsData = await categoriasService.getAll();
        setCategorias(catsData);
      } catch (err) {
        console.error("Error cargando categorías:", err);
      }
    };
    cargarCategorias();
  }, []);

  // Función unificada para obtener productos paginados desde el backend
  const cargarProductos = async (pagina = 1, categoria = categoriaSeleccionada, textoBusqueda = busqueda) => {
    try {
      setLoading(true);
      setError(null);

      const respuesta = await productosService.getPaginated({
        page: pagina,
        limit: limitePorPagina,
        categoria,
        q: textoBusqueda,
      });

      if (respuesta && respuesta.data) {
        setProductos(respuesta.data);
        setPaginacionInfo(respuesta.pagination || null);
        setPaginaActual(respuesta.pagination ? respuesta.pagination.page : pagina);
      } else {
        setProductos(Array.isArray(respuesta) ? respuesta : []);
        setPaginacionInfo(null);
      }
    } catch (err) {
      console.error("Error cargando productos:", err);
      setError("No se pudieron cargar los productos. Asegúrate de que el backend esté conectado.");
    } finally {
      setLoading(false);
    }
  };

  // Carga inicial y respuesta a parámetros en la URL (?q=...)
  useEffect(() => {
    const q = new URLSearchParams(location.search).get('q');
    if (q !== null && q !== busqueda) {
      setBusqueda(q);
      setPaginaActual(1);
      cargarProductos(1, categoriaSeleccionada, q);
    } else {
      cargarProductos(paginaActual, categoriaSeleccionada, busqueda);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  // Debounce para búsqueda en vivo al escribir
  useEffect(() => {
    const timer = setTimeout(() => {
      setPaginaActual(1);
      cargarProductos(1, categoriaSeleccionada, busqueda);
    }, 400);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busqueda]);

  const handleBuscar = (e) => {
    e.preventDefault();
    setPaginaActual(1);
    cargarProductos(1, categoriaSeleccionada, busqueda);
  };

  const handleFiltrarCategoria = (catId) => {
    setCategoriaSeleccionada(catId);
    setPaginaActual(1);
    cargarProductos(1, catId, busqueda);
  };

  const handleCambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
    cargarProductos(nuevaPagina, categoriaSeleccionada, busqueda);
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  const getImagenUrl = (prod) => {
    if (prod.imagenes && prod.imagenes.length > 0) {
      const url = prod.imagenes[0].ubicacion;
      return url.startsWith('http') || url.startsWith('data:image') ? url : `${import.meta.env.VITE_API_URL}${url}`;
    }
    return prod.imagenPrincipal || "https://via.placeholder.com/300";
  };

  return (
    <div className="pagina-productos">
      <div className="productos-header">
        <h1>Catálogo de Productos</h1>
        <p>Encuentra todo lo que necesitas para tus proyectos eléctricos</p>
      </div>

      <div className="productos-contenedor">
        <aside className={`filtros-sidebar ${filtrosMobileAbiertos ? 'abierto' : ''}`}>
          <div className="filtro-caja">
            <h3><Filter size={18} /> Filtrar por</h3>

            <div className="filtro-grupo">
              <h4>Categorías</h4>
              <ul className="lista-categorias">
                <li
                  className={categoriaSeleccionada === '' ? 'activo' : ''}
                  onClick={() => handleFiltrarCategoria('')}
                >
                  Todas las categorías
                </li>
                {categorias.map(cat => (
                  <li
                    key={cat._id || cat.idCategoria}
                    className={categoriaSeleccionada === (cat._id || cat.idCategoria) ? 'activo' : ''}
                    onClick={() => handleFiltrarCategoria(cat._id || cat.idCategoria)}
                  >
                    {cat.nombre}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        <div className="productos-principal">
          <div className="productos-controles">
            <form onSubmit={handleBuscar} className="busqueda-form">
              <Search size={18} className="icono-busqueda" />
              <input
                type="text"
                placeholder="Buscar por nombre, calibre, marca..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <button type="submit">Buscar</button>
            </form>
            <div className="controles-derecha">
              <button type="button" className="btn-mobile-filtros" onClick={() => setFiltrosMobileAbiertos(!filtrosMobileAbiertos)}>
                <SlidersHorizontal size={20} /> Filtros
              </button>
            </div>
          </div>

          {error && <div className="mensaje-error">{error}</div>}

          {loading ? (
            <div className="cargando">Cargando productos...</div>
          ) : (
            <>
              <div className="cuadricula-catalogo">
                {productos.length > 0 ? (
                  productos.map(prod => (
                    <TarjetaProducto
                      key={prod._id || prod.idProducto}
                      id={prod._id || prod.idProducto}
                      titulo={prod.nombre}
                      precio={prod.precio}
                      imagen={getImagenUrl(prod)}
                      estado={prod.estado}
                      onClick={async () => {
                        try {
                          const prodCompleto = await productosService.getById(prod._id || prod.idProducto);
                          setProductoSeleccionado(prodCompleto);
                        } catch (err) {
                          console.error('Error al obtener detalle del producto:', err);
                          setProductoSeleccionado(prod);
                        }
                      }}
                    />
                  ))
                ) : (
                  <div className="sin-resultados">
                    <h3>No se encontraron productos</h3>
                    <p>Intenta con otros términos de búsqueda o selecciona otra categoría.</p>
                  </div>
                )}
              </div>

              {/* Componente de Paginación */}
              <Paginacion
                pagination={paginacionInfo}
                onCambiarPagina={handleCambiarPagina}
              />
            </>
          )}
        </div>
      </div>

      <ModalProductoDetalle
        producto={productoSeleccionado}
        onClose={() => setProductoSeleccionado(null)}
      />
    </div>
  );
}

export { Productos };
export default Productos;
