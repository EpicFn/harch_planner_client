import CalendarPage from '@pages/Calendar/CalendarPage'
import DailyPlanner from '@pages/DailyPlanner/DailyPlanner'
import LibraryPage from '@pages/Library/LibraryPage'
import MainPage from '@pages/MainPage/MainPage'
import RecordPage from '@pages/Record/RecordPage'
import GlobalStyle from '@styles/GlobalStyle'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/calendarPage" element={<CalendarPage />} />
          <Route path="/dailyPlannerPage" element={<DailyPlanner />} />
          <Route path="/LibraryPage" element={<LibraryPage />} />
          <Route path="/RecordPage" element={<RecordPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
