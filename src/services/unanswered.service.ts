import api from '@/lib/api'

export const unansweredService = {

  getAll: async () => {

    const response =
      await api.get('/chatlogs')

    return response.data
  },

  getTop: async () => {

    const response =
      await api.get('/chatlogs/top')

    return response.data
  },

  resolve: async (
  id: number,
) => {

  const res =
    await api.delete(
  `/chatlogs/${id}`
)

  return res.data
}
}