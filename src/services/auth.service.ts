import api from "@/lib/api"

export const authService = {
  login: async (
    email: string,
    password: string,
  ) => {
    const res =
      await api.post(
        "/auth/login",
        {
          email,
          password,
        },
      )

    return res.data
  },

  getMe: async () => {
    const res =
      await api.get(
        "/auth/me",
      )

    return res.data
  },

  updateProfile: async (
    data: any,
  ) => {
    const res =
      await api.put(
        "/auth/profile",
        data,
      )

    return res.data
  },
}