import api from '@/lib/api'

export interface Branch {
  id: number
  name: string
  address: string
}

export const branchService = {

  getAll: async () => {

    const res =
      await api.get(
        '/branches',
      )

    return res.data
  },

  create: async (
    data: Partial<Branch>,
  ) => {

    const res =
      await api.post(
        '/branches',
        data,
      )

    return res.data
  },

  update: async (
    id: number,
    data: Partial<Branch>,
  ) => {

    const res =
      await api.put(
        `/branches/${id}`,
        data,
      )

    return res.data
  },

  delete: async (
    id: number,
  ) => {

    const res =
      await api.delete(
        `/branches/${id}`,
      )

    return res.data
  },
}