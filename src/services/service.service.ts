import api from '@/lib/api'

export interface Service {
  id: number
  name: string
  description?: string
}

export const serviceService = {

  getAll: async () => {

    const res =
      await api.get(
        '/services',
      )

    return res.data
  },

  create: async (
    data: Partial<Service>,
  ) => {

    const res =
      await api.post(
        '/services',
        data,
      )

    return res.data
  },

  update: async (
    id: number,
    data: Partial<Service>,
  ) => {

    const res =
      await api.put(
        `/services/${id}`,
        data,
      )

    return res.data
  },

  delete: async (
    id: number,
  ) => {

    const res =
      await api.delete(
        `/services/${id}`,
      )

    return res.data
  },
}