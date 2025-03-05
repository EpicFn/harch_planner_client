import axios from 'axios'

const fetchSubjects = async () => {
  try {
    const response = await axios.get('/api/subject/subject_list')
    return response.data.subject_list
  } catch (error) {
    console.error('Error fetching subjects:', error)
    throw error.response ? error.response.data : error
  }
}

export default fetchSubjects
