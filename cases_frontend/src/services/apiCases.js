import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const apiCases = {
  createAplicacion: (data) => axios.post(`${API_BASE_URL}/aplicacion/`, data),
  readAplicaciones: (params) => axios.get(`${API_BASE_URL}/aplicacion/`, { params }),
  readAplicacion: (id) => axios.get(`${API_BASE_URL}/aplicacion/${id}`),
  updateAplicacion: (id, data) => axios.put(`${API_BASE_URL}/aplicacion/${id}`, data),
  deleteAplicacion: (id) => axios.delete(`${API_BASE_URL}/aplicacion/${id}`),

  createPantalla: (data) => axios.post(`${API_BASE_URL}/pantalla/`, data),
  readPantallas: (params) => axios.get(`${API_BASE_URL}/pantalla/`, { params }),
  readPantalla: (id) => axios.get(`${API_BASE_URL}/pantalla/${id}`),
  updatePantalla: (id, data) => axios.put(`${API_BASE_URL}/pantalla/${id}`, data),
  deletePantalla: (id) => axios.delete(`${API_BASE_URL}/pantalla/${id}`),

  createFuncionalidad: (data) => axios.post(`${API_BASE_URL}/funcionalidad/`, data),
  readFuncionalidades: (params) => axios.get(`${API_BASE_URL}/funcionalidad/`, { params }),
  readFuncionalidad: (id) => axios.get(`${API_BASE_URL}/funcionalidad/${id}`),
  updateFuncionalidad: (id, data) => axios.put(`${API_BASE_URL}/funcionalidad/${id}`, data),
  deleteFuncionalidad: (id) => axios.delete(`${API_BASE_URL}/funcionalidad/${id}`),

  createSo: (data) => axios.post(`${API_BASE_URL}/so/`, data),
  readSos: (params) => axios.get(`${API_BASE_URL}/so/`, { params }),
  readSo: (id) => axios.get(`${API_BASE_URL}/so/${id}`),
  updateSo: (id, data) => axios.put(`${API_BASE_URL}/so/${id}`, data),
  deleteSo: (id) => axios.delete(`${API_BASE_URL}/so/${id}`),

  createTipoPrueba: (data) => axios.post(`${API_BASE_URL}/tipo_prueba/`, data),
  readTiposPrueba: (params) => axios.get(`${API_BASE_URL}/tipo_prueba/`, { params }),
  readTipoPrueba: (id) => axios.get(`${API_BASE_URL}/tipo_prueba/${id}`),
  updateTipoPrueba: (id, data) => axios.put(`${API_BASE_URL}/tipo_prueba/${id}`, data),
  deleteTipoPrueba: (id) => axios.delete(`${API_BASE_URL}/tipo_prueba/${id}`),

  createTipoUsuario: (data) => axios.post(`${API_BASE_URL}/tipo_usuario/`, data),
  readTiposUsuario: (params) => axios.get(`${API_BASE_URL}/tipo_usuario/`, { params }),
  readTipoUsuario: (id) => axios.get(`${API_BASE_URL}/tipo_usuario/${id}`),
  updateTipoUsuario: (id, data) => axios.put(`${API_BASE_URL}/tipo_usuario/${id}`, data),
  deleteTipoUsuario: (id) => axios.delete(`${API_BASE_URL}/tipo_usuario/${id}`),

  createCasoPrueba: (data) => axios.post(`${API_BASE_URL}/caso_prueba/`, data),
  readCasosPrueba: (params) => axios.get(`${API_BASE_URL}/caso_prueba/`, { params }),
  readCasoPrueba: (id) => axios.get(`${API_BASE_URL}/caso_prueba/${id}`),
  updateCasoPrueba: (id, data) => axios.put(`${API_BASE_URL}/caso_prueba/${id}`, data),
  deleteCasoPrueba: (id) => axios.delete(`${API_BASE_URL}/caso_prueba/${id}`),

  readRoot: () => axios.get(`${API_BASE_URL}/`)
};

export default apiCases;