import axios from 'axios'

const logoutApi = async () => {
  try {
    const response = await axios.get('/api/account/logout', {
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    throw error.response ? error.response.data : error
  }
}

export default logoutApi
