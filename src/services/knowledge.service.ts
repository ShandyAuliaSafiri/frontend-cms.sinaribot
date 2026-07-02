import api from '@/lib/api'

export interface Knowledge {
  id: number
  question: string
  answer: string
  intent: string
  createdAt?: string
  createdBy?: { id: number; name: string } 
  // Map fields correctly to your backend DB schema
}

export const knowledgeService = {
  getAll: async () => {
    const res = await api.get('/knowledge')
    return res.data
  },
  
  create: async (data: Partial<Knowledge>) => {
    const res = await api.post('/knowledge', data)
    return res.data
  },
  
  update: async (id: number, data: Partial<Knowledge>) => {
    const res = await api.put(`/knowledge/${id}`, data)
    return res.data
  },
  
  delete: async (id: number) => {
    const res = await api.delete(`/knowledge/${id}`)
    return res.data
  }
}
