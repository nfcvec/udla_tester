import axios from 'axios';

const API_URL = 'http://localhost:8001';

export const getCasos = async () => {
    const response = await axios.get(`${API_URL}/casos/`);
    return response.data;
};

export const getCaso = async (id) => {
    const response = await axios.get(`${API_URL}/casos/${id}`);
    return response.data;
};

export const createCaso = async (caso) => {
    const response = await axios.post(`${API_URL}/casos/`, caso);
    return response.data;
};

export const updateCaso = async (id, caso) => {
    const response = await axios.put(`${API_URL}/casos/${id}`, caso);
    return response.data;
};

export const deleteCaso = async (id) => {
    const response = await axios.delete(`${API_URL}/casos/${id}`);
    return response.data;
};