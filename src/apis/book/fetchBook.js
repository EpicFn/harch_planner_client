// fetchBook.js
import axios from 'axios'

const fetchBooks = async () => {
  try {
    const response = await axios.get('/api/book/list')
    return response.data.book_list
  } catch (error) {
    console.error('Error fetching books:', error)
    throw error
  }
}

export default fetchBooks
