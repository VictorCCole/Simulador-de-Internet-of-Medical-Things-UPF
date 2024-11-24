import axios from 'axios'
import { toast } from 'sonner'

const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: false,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error)
    
    if (error.response) {
      if (error.response.status === 422) {
        console.error('Validation Error:', error.response.data)
        toast.error(`Erro de validação: ${JSON.stringify(error.response.data)}`)
      } else {
        toast.error(`Erro: ${error.response.data.detail || 'Erro ao comunicar com o servidor'}`)
      }
    } else if (error.request) {
      toast.error('Erro de conexão com o servidor')
    } else {
      toast.error('Erro ao processar a requisição')
    }

    return Promise.reject(error)
  }
)

export interface DadosColetados {
  seq?: number
  codigo: number
  DataHora: string
  Tipo: number
  Valor1: number
  Valor2?: number
  EmCasa: boolean
}

export interface Usuario {
  codigo: number;
  Nome: string;
  Nascimento: string;
  Sexo: string;
  Latitude: number;
  Longitude: number;
}

export const dadosColetadosService = {
  getAll: async () => {
    try {
      const response = await api.get<DadosColetados[]>('/dadosColetados/')
      return response.data
    } catch (error) {
      console.error('Error fetching dados coletados:', error)
      throw error
    }
  },

  getById: async (seq: number) => {
    try {
      const response = await api.get<DadosColetados>(`/dadosColetados/${seq}/`)
      return response.data
    } catch (error) {
      console.error('Error fetching dado coletado by id:', error)
      throw error
    }
  },

  create: async (dados: Omit<DadosColetados, 'seq'>) => {
    try {
      const response = await api.post<DadosColetados>('/dadosColetados/', dados)
      return response.data
    } catch (error) {
      console.error('Error creating dado coletado:', error)
      throw error
    }
  },

  update: async (seq: number, dados: Partial<DadosColetados>) => {
    try {
      const response = await api.put<DadosColetados>(`/dadosColetados/${seq}/`, dados)
      return response.data
    } catch (error) {
      console.error('Error updating dado coletado:', error)
      throw error
    }
  },

  delete: async (seq: number) => {
    try {
      const response = await api.delete<DadosColetados>(`/dadosColetados/${seq}/`)
      return response.data
    } catch (error) {
      console.error('Error deleting dado coletado:', error)
      throw error
    }
  }
}

export const usuariosService = {
  getAll: async () => {
    try {
      const response = await api.get<Usuario[]>('/usuarios/')
      return response.data
    } catch (error) {
      console.error('Error fetching usuarios:', error)
      throw error
    }
  },

  getById: async (codigo: number) => {
    try {
      const response = await api.get<Usuario>(`/usuarios/${codigo}/`)
      return response.data
    } catch (error) {
      console.error('Error fetching usuario by id:', error)
      throw error
    }
  },

  create: async (usuario: Usuario) => {
    try {
      const response = await api.post<Usuario>('/usuarios/', usuario)
      return response.data
    } catch (error) {
      console.error('Error creating usuario:', error)
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(JSON.stringify(error.response.data))
      }
      throw error
    }
  },

  update: async (codigo: number, usuario: Partial<Usuario>) => {
    try {
      const response = await api.put<Usuario>(`/usuarios/${codigo}/`, usuario)
      return response.data
    } catch (error) {
      console.error('Error updating usuario:', error)
      throw error
    }
  },

  delete: async (codigo: number) => {
    try {
      const response = await api.delete<Usuario>(`/usuarios/${codigo}/`)
      return response.data
    } catch (error) {
      console.error('Error deleting usuario:', error)
      throw error
    }
  }
}

