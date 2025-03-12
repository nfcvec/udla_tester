import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_CASES_BACKEND_URL;

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

  createProceso: (data) => axios.post(`${API_BASE_URL}/proceso/`, data),
  readProcesos: (params) => axios.get(`${API_BASE_URL}/proceso/`, { params }),
  readProceso: (id) => axios.get(`${API_BASE_URL}/proceso/${id}`),
  updateProceso: (id, data) => axios.put(`${API_BASE_URL}/proceso/${id}`, data),
  deleteProceso: (id) => axios.delete(`${API_BASE_URL}/proceso/${id}`),

  createTestersProceso: (data) => axios.post(`${API_BASE_URL}/testers_proceso/`, data),
  readTestersProcesos: (params) => axios.get(`${API_BASE_URL}/testers_proceso/`, { params }),
  readTestersProceso: (id) => axios.get(`${API_BASE_URL}/testers_proceso/${id}`),
  updateTestersProceso: (id, data) => axios.put(`${API_BASE_URL}/testers_proceso/${id}`, data),
  deleteTestersProceso: (id) => axios.delete(`${API_BASE_URL}/testers_proceso/${id}`),

  createFuncionalidadesProceso: (data) => axios.post(`${API_BASE_URL}/funcionalidades_proceso/`, data),
  readFuncionalidadesProcesos: (params) => axios.get(`${API_BASE_URL}/funcionalidades_proceso/`, { params }),
  readFuncionalidadesProceso: (id) => axios.get(`${API_BASE_URL}/funcionalidades_proceso/${id}`),
  updateFuncionalidadesProceso: (id, data) => axios.put(`${API_BASE_URL}/funcionalidades_proceso/${id}`, data),
  deleteFuncionalidadesProceso: (id) => axios.delete(`${API_BASE_URL}/funcionalidades_proceso/${id}`),

  createAsignacion: (data) => axios.post(`${API_BASE_URL}/asignacion/`, data),
  readAsignaciones: (params) => axios.get(`${API_BASE_URL}/asignacion/`, { params }),
  readAsignacion: (id) => axios.get(`${API_BASE_URL}/asignacion/${id}`),
  updateAsignacion: (id, data) => axios.put(`${API_BASE_URL}/asignacion/${id}`, data),
  deleteAsignacion: (id) => axios.delete(`${API_BASE_URL}/asignacion/${id}`),

  createResultado: (data) => axios.post(`${API_BASE_URL}/resultado/`, data),
  readResultados: (params) => axios.get(`${API_BASE_URL}/resultado/`, { params }),
  readResultado: (id) => axios.get(`${API_BASE_URL}/resultado/${id}`),
  updateResultado: (id, data) => axios.put(`${API_BASE_URL}/resultado/${id}`, data),
  deleteResultado: (id) => axios.delete(`${API_BASE_URL}/resultado/${id}`),

  
  readRoot: () => axios.get(`${API_BASE_URL}/`)
};

export default apiCases;