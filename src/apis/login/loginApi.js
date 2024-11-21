import axios from 'axios'

const loginApi = async (email, password) => {
  try {
    const response = await axios.post('http://3.38.113.63:1500/account/login', {
      email,
      password,
    })

    console.log('Response Headers:', response.headers)
    console.log(response.data)
    return response.data
  } catch (error) {
    throw error.response ? error.response.data : error
  }
}

export default loginApi
