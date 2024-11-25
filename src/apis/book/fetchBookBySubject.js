import axios from 'axios'

const fetchBookBySubject = async (subject_Id) => {
  try {
    const response = await axios.get(`/api/book/list/${subject_Id}`)
    return response.data
  } catch (error) {
    console.error(`Failed to fetch books for subject ${subject_Id}:`, error)
    throw error
  }
}

export default fetchBookBySubject
