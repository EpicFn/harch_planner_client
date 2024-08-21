import DailyPlanner from '@pages/DailyPlanner/DailyPlanner'
import MainPage from '@pages/MainPage/MainPage'
import GlobalStyle from '@styles/GlobalStyle'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/dailyPlanner" element={<DailyPlanner />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
