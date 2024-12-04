import Preferences from '@components/Preferences/Preferences'
import CalendarPage from '@pages/Calendar/CalendarPage'
import DailyPlanner from '@pages/DailyPlanner/DailyPlannerPage'
import LibraryPage from '@pages/Library/LibraryPage'
import LoadingPage from '@pages/Loading/LoadingPage'
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
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/Preferences" element={<Preferences />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
