import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000'
})

export interface DadosColetados {
  seq?: number
  codigo: number
  DataHora: string
  Tipo: number
  Valor1: number
  Valor2?: number
  EmCasa: boolean
}

export const dadosColetadosService = {
  getAll: async () => {
    const response = await api.get<DadosColetados[]>('/dadosColetados')
    return response.data
  },

  getById: async (seq: number) => {
    const response = await api.get<DadosColetados>(`/dadosColetados/${seq}`)
    return response.data
  },

  create: async (dados: Omit<DadosColetados, 'seq'>) => {
    const response = await api.post<DadosColetados>('/dadosColetados', dados)
    return response.data
  },

  update: async (seq: number, dados: Partial<DadosColetados>) => {
    const response = await api.put<DadosColetados>(`/dadosColetados/${seq}`, dados)
    return response.data
  },

  delete: async (seq: number) => {
    const response = await api.delete<DadosColetados>(`/dadosColetados/${seq}`)
    return response.data
  }
}

