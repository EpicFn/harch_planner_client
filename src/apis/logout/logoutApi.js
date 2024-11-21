import axios from 'axios'

const logoutApi = async () => {
  try {
    const response = await axios.get('http://3.38.113.63:1500/account/logout')
    return response.data
  } catch (error) {
    throw error.response ? error.response.data : error
  }
}

export default logoutApi
