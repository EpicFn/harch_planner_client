import axios from 'axios'

const deleteBook = async (id) => {
  const API_URL = `/api/book/delete/${id}`
  try {
    const response = await axios.delete(API_URL) // DELETE 요청
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to delete the book',
    )
  }
}

export default deleteBook
