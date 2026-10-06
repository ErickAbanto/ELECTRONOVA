import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import TarjetaProducto from "../molecules/TarjetaProducto";
import ModalProductoDetalle from "../organisms/ModalProductoDetalle";
import { productosService } from "../../services/productos.service";
import { categoriasService } from "../../services/categorias.service";
import "./Productos.css";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [error, setError] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [filtrosMobileAbiertos, setFiltrosMobileAbiertos] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    limit: 9,
  });
  const location = useLocation();

  const [busqueda, setBusqueda] = useState(() => {
    const q = new URLSearchParams(location.search).get("q");
    return q || "";
  });

  const cargarDatos = async (page = 1) => {
    try {
      setLoading(true);
      const [prodsData, catsData] = await Promise.all([
        productosService.getAll(page, pagination.limit),
        categoriasService.getAll(), // Note: categorias doesn't have pagination yet
      ]);
      setProductos(prodsData.data || prodsData);
      if (prodsData.pagination) setPagination(prodsData.pagination);

      // Handle array returned for cats if pagination is not there
      setCategorias(catsData.data || catsData);
    } catch (error) {
      console.error("Error cargando datos:", error);
      setError("No se pudieron cargar los productos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const q = new URLSearchParams(location.search).get("q");
    if (q && q !== busqueda) {
      setBusqueda(q);
    } else if (!q && busqueda === "") {
      cargarDatos(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!loading && busqueda !== "") {
        realizarBusqueda(busqueda, 1);
      } else if (busqueda === "") {
        // Only load if it was a clear action
        if (categoriaSeleccionada) {
          handleFiltrarCategoria(categoriaSeleccionada, 1);
        }
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [busqueda]);

  const realizarBusqueda = async (term, page = 1) => {
    try {
      setLoading(true);
      const resultados = await productosService.search(
        { q: term },
        page,
        pagination.limit,
      );
      setProductos(resultados.data || resultados);
      if (resultados.pagination) setPagination(resultados.pagination);
    } catch (error) {
      console.error("Error en la búsqueda:", error);
      setError("Error en la búsqueda.");
    } finally {
      setLoading(false);
    }
  };

  const handleBuscar = (e) => {
    e.preventDefault();
    if (busqueda.trim() === "") {
      cargarDatos(1);
    } else {
      realizarBusqueda(busqueda, 1);
    }
  };

  const handleFiltrarCategoria = async (catId, page = 1) => {
    setCategoriaSeleccionada(catId);
    setBusqueda(""); // clear search when filtering by category
    try {
      setLoading(true);
      if (catId === "") {
        cargarDatos(page);
        return;
      }
      const resultados = await productosService.filter(
        { categoria: catId },
        page,
        pagination.limit,
      );
      setProductos(resultados.data || resultados);
      if (resultados.pagination) setPagination(resultados.pagination);
    } catch (error) {
      console.error("Error al filtrar:", error);
      setError("Error filtrando por categoría.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      if (busqueda) {
        realizarBusqueda(busqueda, newPage);
      } else if (categoriaSeleccionada) {
        handleFiltrarCategoria(categoriaSeleccionada, newPage);
      } else {
        cargarDatos(newPage);
      }
    }
  };

  const getImagenUrl = (prod) => {
    if (prod.imagenes && prod.imagenes.length > 0) {
      const url = prod.imagenes[0].ubicacion;
      return url.startsWith("http") || url.startsWith("data:image")
        ? url
        : `${import.meta.env.VITE_API_URL}${url}`;
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
        <aside
          className={`filtros-sidebar ${filtrosMobileAbiertos ? "abierto" : ""}`}
        >
          <div className="filtro-caja">
            <h3>
              <Filter size={18} /> Filtrar por
            </h3>

            <div className="filtro-grupo">
              <h4>Categorías</h4>
              <ul className="lista-categorias">
                <li
                  className={categoriaSeleccionada === "" ? "activo" : ""}
                  onClick={() => handleFiltrarCategoria("")}
                >
                  Todas
                </li>
                {categorias.map((cat) => (
                  <li
                    key={cat._id || cat.idCategoria}
                    className={
                      categoriaSeleccionada === (cat._id || cat.idCategoria)
                        ? "activo"
                        : ""
                    }
                    onClick={() =>
                      handleFiltrarCategoria(cat._id || cat.idCategoria)
                    }
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
                placeholder="Buscar por nombre, descripción..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <button type="submit">Buscar</button>
            </form>
            <div className="controles-derecha">
              <button
                type="button"
                className="btn-mobile-filtros"
                onClick={() => setFiltrosMobileAbiertos(!filtrosMobileAbiertos)}
              >
                <SlidersHorizontal size={20} /> Filtros
              </button>
            </div>
          </div>

          {error && <div className="mensaje-error">{error}</div>}

          {loading ? (
            <div className="cargando">Cargando productos...</div>
          ) : (
            <div className="cuadricula-catalogo">
              {productos.length > 0 ? (
                productos.map((prod) => (
                  <TarjetaProducto
                    key={prod._id || prod.idProducto}
                    id={prod._id || prod.idProducto}
                    titulo={prod.nombre}
                    precio={prod.precio}
                    imagen={getImagenUrl(prod)}
                    estado={prod.estado}
                    onClick={async () => {
                      try {
                        const prodCompleto = await productosService.getById(
                          prod._id || prod.idProducto,
                        );
                        setProductoSeleccionado(prodCompleto);
                      } catch (err) {
                        setProductoSeleccionado(prod);
                      }
                    }}
                  />
                ))
              ) : (
                <div className="sin-resultados">
                  <h3>No se encontraron productos</h3>
                  <p>Intenta con otros términos de búsqueda o filtros.</p>
                </div>
              )}
            </div>
          )}

          {!loading && pagination && pagination.totalPages > 1 && (
            <div className="paginacion-controles">
              <button
                disabled={pagination.page <= 1}
                onClick={() => handlePageChange(pagination.page - 1)}
                className="btn-paginacion"
              >
                &laquo; Anterior
              </button>
              <span className="info-paginacion">
                Página {pagination.page} de {pagination.totalPages}
              </span>
              <button
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => handlePageChange(pagination.page + 1)}
                className="btn-paginacion"
              >
                Siguiente &raquo;
              </button>
            </div>
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
