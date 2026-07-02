import api from '@/lib/api'

export interface SatuanItem {
  id: number
  name: string
  description?: string
}

export const satuanItemService = {

  getAll: async () => {

    const res =
      await api.get(
        '/satuan-items',
      )

    return res.data
  },

  create: async (
    data: Partial<SatuanItem>,
  ) => {

    const res =
      await api.post(
        '/satuan-items',
        data,
      )

    return res.data
  },

  update: async (
    id: number,
    data: Partial<SatuanItem>,
  ) => {

    const res =
      await api.put(
        `/satuan-items/${id}`,
        data,
      )

    return res.data
  },

  delete: async (
    id: number,
  ) => {

    const res =
      await api.delete(
        `/satuan-items/${id}`,
      )

    return res.data
  },
}