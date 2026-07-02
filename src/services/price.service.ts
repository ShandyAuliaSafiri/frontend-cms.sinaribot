import api from '@/lib/api'

export interface Price {
  id: number
  price: number
  duration: string
  minimalQty?: number
  maxQty?: number

  satuanItem?: {
    id: number
    name: string
  }

  branchService: {
    branch: {
      id: number
      name: string
    }

    service: {
      id: number
      name: string
    }
  }
}

export const priceService = {

  getAll: async () => {
    const res =
      await api.get('/prices')

    return res.data
  },

  create: async (data: any) => {
    const res =
      await api.post(
        '/prices',
        data,
      )

    return res.data
  },

  update: async (
    id: number,
    data: any,
  ) => {

    const res =
      await api.put(
        `/prices/${id}`,
        data,
      )

    return res.data
  },

  delete: async (
    id: number,
  ) => {

    const res =
      await api.delete(
        `/prices/${id}`,
      )

    return res.data
  },
}