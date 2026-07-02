import api from "@/lib/api"

export interface User {
  id: number
  name: string
  email: string
  role: string
}

export const userService = {
  getAll: async () => {
    const res =
      await api.get("/users")

    return res.data
  },

  create: async (data: any) => {
    const res =
      await api.post(
        "/users",
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
        `/users/${id}`,
        data,
      )

    return res.data
  },

  delete: async (
    id: number,
  ) => {
    const res =
      await api.delete(
        `/users/${id}`,
      )

    return res.data
  },
}