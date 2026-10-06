import api from "./api";

export const productosService = {
  getAll: async (page = 1, limit = 9) => {
    const response = await api.get(`/productos?page=${page}&limit=${limit}`);
    return {
      data: response.data.data || response.data,
      pagination: response.data.pagination || null,
    };
  },

  getById: async (id) => {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  },

  search: async (query, page = 1, limit = 9) => {
    const response = await api.get("/productos/buscar", {
      params: { ...query, page, limit },
    });
    return {
      data: response.data.data || response.data,
      pagination: response.data.pagination || null,
    };
  },

  filter: async (filtros, page = 1, limit = 9) => {
    const response = await api.get("/productos/filtrar", {
      params: { ...filtros, page, limit },
    });
    return {
      data: response.data.data || response.data,
      pagination: response.data.pagination || null,
    };
  },

  create: async (productoData) => {
    // Si hay archivos (imágenes), debemos usar FormData
    let data = productoData;
    let config = {};

    if (productoData instanceof FormData) {
      config = { headers: { "Content-Type": "multipart/form-data" } };
    }

    const response = await api.post("/productos", data, config);
    return response.data;
  },

  update: async (id, productoData) => {
    let data = productoData;
    let config = {};

    if (productoData instanceof FormData) {
      config = { headers: { "Content-Type": "multipart/form-data" } };
    }

    const response = await api.put(`/productos/${id}`, data, config);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/productos/${id}`);
    return response.data;
  },
};
