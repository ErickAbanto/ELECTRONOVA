import { productosService } from "../services/productos.service.js";

const productosController = {
  getProductos: (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    const soloActivos = req.query.soloActivos === "true" || req.query.estado === "true";

    productosService
      .getProductos(page, limit, soloActivos)
      .then((response) =>
        res.status(200).json({
          message: "Productos Obtenidos",
          data: response.productos,
          pagination: response.pagination,
        })
      )
      .catch((error) => res.status(500).json({ message: error.message }));
  },

  getProductoById: (req, res) => {
    const id = req.params.id;
    productosService
      .getProductoById(id)
      .then((producto) =>
        res.status(200).json({
          message: "Producto encontrado",
          data: producto,
        })
      )
      .catch((error) => {
        if (error.message === "Producto no encontrado") {
          return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
      });
  },

  createProducto: (req, res) => {
    productosService
      .crearProducto(req.body, req.files)
      .then((nuevoProducto) =>
        res.status(201).json({
          message: "Producto creado con éxito",
          data: nuevoProducto,
        })
      )
      .catch((err) =>
        res.status(500).json({ message: "Error al crear producto", error: err.message })
      );
  },

  updateProducto: (req, res) => {
    const id = req.params.id;
    productosService
      .actualizarProducto(id, req.body, req.files, req.body.imagenesExistentes)
      .then((productoActualizado) =>
        res.status(200).json({
          message: "Producto actualizado con éxito",
          data: productoActualizado,
        })
      )
      .catch((error) => {
        if (error.message === "Producto no encontrado") {
          return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
      });
  },

  deleteProducto: (req, res) => {
    const id = req.params.id;
    productosService
      .eliminarProducto(id)
      .then(() =>
        res.status(200).json({
          message: "Producto eliminado con éxito",
        })
      )
      .catch((error) => {
        if (error.message === "Producto no encontrado") {
          return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
      });
  },

  searchProductos: (req, res) => {
    const { q } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;

    productosService
      .buscar(q, page, limit)
      .then((response) =>
        res.status(200).json({
          message: "Búsqueda completada",
          data: response.productos,
          pagination: response.pagination,
        })
      )
      .catch((error) => res.status(500).json({ message: error.message }));
  },

  filterProductos: (req, res) => {
    const { categoria } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;

    productosService
      .filtrarPorCategoria(categoria, page, limit)
      .then((response) =>
        res.status(200).json({
          message: "Filtro aplicado",
          data: response.productos,
          pagination: response.pagination,
        })
      )
      .catch((error) => res.status(500).json({ message: error.message }));
  },
};

const getProductos = productosController.getProductos;
const getProductoById = productosController.getProductoById;
const createProducto = productosController.createProducto;
const updateProducto = productosController.updateProducto;
const deleteProducto = productosController.deleteProducto;
const searchProductos = productosController.searchProductos;
const filterProductos = productosController.filterProductos;

export {
  productosController,
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
  searchProductos,
  filterProductos,
};
