import api from '@/lib/api'

export const branchServiceApi = {

  getAll: async () => {

    const res =
      await api.get(
        '/branch-services',
      )

    return res.data
  },

  create: async (
    data: any,
  ) => {

    const res =
      await api.post(
        '/branch-services',
        data,
      )

    return res.data
  },

  delete: async (
    id: number,
  ) => {

    const res =
      await api.delete(
        `/branch-services/${id}`,
      )

    return res.data
  },
}