import axios from 'axios'

const addBook = async (bookData) => {
  try {
    const response = await axios.post('api/book/register', bookData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error) {
    console.error('Failed to add book:', error.response?.data || error.message)
    throw error
  }
}

export default addBook
