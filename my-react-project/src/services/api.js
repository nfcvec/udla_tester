import axios from 'axios';

const API_URL = 'http://localhost:8000/aplicacion/';

export const fetchAplicaciones = async (skip = 0, limit = 10) => {
    const response = await axios.get(API_URL, { params: { skip, limit } });
    return response.data;
};

export const createAplicacion = async (data) => {
    const response = await axios.post(API_URL, data);
    return response.data;
};

export const updateAplicacion = async (id, data) => {
    const response = await axios.put(`${API_URL}${id}/`, data);
    return response.data;
};

export const deleteAplicacion = async (id) => {
    const response = await axios.delete(`${API_URL}${id}/`);
    return response.data;
};