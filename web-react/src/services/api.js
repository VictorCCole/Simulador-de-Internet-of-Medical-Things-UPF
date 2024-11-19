// src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000'
});

export const usuarioService = {
    getAll: () => api.get('/usuario/'),
    getOne: (id) => api.get(`/usuario/${id}`),
    create: (data) => api.post('/usuario/', data),
    update: (id, data) => api.put(`/usuario/${id}`, data),
    delete: (id) => api.delete(`/usuario/${id}`)
};

export const dadosColetadosService = {
    getAll: () => api.get('/dadosColetados/'),
    getOne: (id) => api.get(`/dadosColetados/${id}`),
    create: (data) => api.post('/dadosColetados/', data),
    update: (id, data) => api.put(`/dadosColetados/${id}`, data),
    delete: (id) => api.delete(`/dadosColetados/${id}`)
};