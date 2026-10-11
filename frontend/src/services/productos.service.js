import api from './api';

export const productosService = {
  /**
   * Obtener productos con paginación desde el backend
   */
  getPaginated: async ({ page = 1, limit = 12, categoria = '', q = '' } = {}) => {
    let response;
    if (q && q.trim()) {
      response = await api.get('/productos/buscar', { params: { q: q.trim(), page, limit } });
    } else if (categoria) {
      response = await api.get('/productos/filtrar', { params: { categoria, page, limit } });
    } else {
      response = await api.get('/productos', { params: { page, limit } });
    }
    return response.data;
  },

  getAll: async (params = {}) => {
    const response = await api.get('/productos', { params: { limit: 100, ...params } });
    return response.data?.data ? response.data.data : response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/productos/${id}`);
    return response.data?.data ? response.data.data : response.data;
  },

  search: async (params = {}) => {
    const response = await api.get('/productos/buscar', { params });
    return response.data?.data ? response.data.data : response.data;
  },

  filter: async (params = {}) => {
    const response = await api.get('/productos/filtrar', { params });
    return response.data?.data ? response.data.data : response.data;
  },

  create: async (productoData) => {
    let data = productoData;
    let config = {};

    if (productoData instanceof FormData) {
      config = { headers: { 'Content-Type': 'multipart/form-data' } };
    }

    const response = await api.post('/productos', data, config);
    return response.data?.data ? response.data.data : response.data;
  },

  update: async (id, productoData) => {
    let data = productoData;
    let config = {};

    if (productoData instanceof FormData) {
      config = { headers: { 'Content-Type': 'multipart/form-data' } };
    }

    const response = await api.put(`/productos/${id}`, data, config);
    return response.data?.data ? response.data.data : response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/productos/${id}`);
    return response.data;
  },
};
