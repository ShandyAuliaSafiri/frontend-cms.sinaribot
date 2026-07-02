import api from '@/lib/api'

export interface News {
  id: number
  title: string
  content: string
  imageUrl?: string
  createdAt?: string
  category: string
  author?: {
    id: number
    name: string
  }
}

export const newsService = {
  getAll: async () => {
    const res = await api.get('/news')
    return res.data
  },

  getById: async (id: number) => {
    const res = await api.get(`/news/${id}`)
    return res.data
  },

  create: async (formData: FormData) => {
    const res = await api.post(
      '/news',
      formData,
      {
        headers: {
          'Content-Type':
            'multipart/form-data',
        },
      },
    )

    return res.data
  },

update: async (
  id: number,
  data: FormData,
) => {
  const res = await api.put(
    `/news/${id}`,
    data,
    {
      headers: {
        'Content-Type':
          'multipart/form-data',
      },
    },
  )

  return res.data
},

  delete: async (id: number) => {
    const res = await api.delete(
      `/news/${id}`,
    )

    return res.data
  },
}