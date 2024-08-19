import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainPage from '@pages/MainPage/MainPage'
import GlobalStyle from '@styles/GlobalStyle'
import CalendarPage from '@pages/Calendar/CalendarPage'
import LibraryPage from '@pages/Library/LibraryPage'
import DailyPlanPage from '@pages/DailyPlan/DailyPlanPage'
import TodayRecord from '@pages/Record/TodayRecord/TodayRecord'

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/daily-plan" element={<DailyPlanPage />} />
          <Route path="/today-record" element={<TodayRecord />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
