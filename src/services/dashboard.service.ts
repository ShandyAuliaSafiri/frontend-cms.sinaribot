import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL =
process.env.NEXT_PUBLIC_API_URL!

export const dashboardService = {
  async getDashboard() {
    const token = Cookies.get('admin_token')

    const response =
      await axios.get(
        `${API_URL}/dashboard`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        },
      )

    return response.data
  },
}
