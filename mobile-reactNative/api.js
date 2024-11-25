import axios from 'axios';

// URL base da sua API FastAPI
const API_BASE_URL = 'http://34.55.164.18:8000'; // Substitua pelo endereço correto do servidor

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Funções para interagir com as rotas da API
export const obterDadosColetados = async () => {
  const response = await api.get('/dadosColetados/');
  return response.data;
};

export const criarDadoColetado = async (dado) => {
  const response = await api.post('/dadosColetados/', dado);
  return response.data;
};

export const obterUsuarios = async () => {
  const response = await api.get('/usuarios/');
  return response.data;
};

export const criarUsuario = async (usuario) => {
  const response = await api.post('/usuarios/', usuario);
  return response.data;
};

export default api;
