import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import MainPage from './components/MainPage'
import About from './components/About'
import Contact from './components/Contact'
import Analytics from './components/Analytics'
import AlertHistory from './components/AlertHistory'
import Settings from './components/Settings'
import Alerts from './components/Alerts'

function App() {
  const [alertHistory, setAlertHistory] = useState([]);

  // Function to add alert to history
  const addAlertToHistory = (message, time) => {
    setAlertHistory(prevHistory => [
      ...prevHistory,
      { message, time },
    ]);
  };


  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<>
          <Hero />
          <MainPage />
        </>} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/analytics' element={<Analytics />} />
        <Route path='/alert-history' element={<AlertHistory alertHistory={alertHistory} />} />
        <Route path='/alerts' element={<Alerts addAlertToHistory={addAlertToHistory} />} />
        <Route path='/settings' element={<Settings />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
