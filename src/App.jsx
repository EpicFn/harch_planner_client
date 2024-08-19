import React from 'react'
import './App.css'
import MainPage from '@pages/MainPage/MainPage'
import GlobalStyle from '@styles/GlobalStyle'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import DailyPlanner from '@pages/DailyPlanner/DailyPlanner'

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
