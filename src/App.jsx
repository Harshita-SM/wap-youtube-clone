import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Header from './components/Header';
import Sidebar from './components/ Sidebar';
import Home from './pages/Home';
import Watch from './pages/Watch';

function App() {
  return (
    <>
    <Header/>
    <div style={{ display: 'flex' }}>
      <Sidebar/>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watch/:id" element={<Watch />} />
        </Routes>
      </div>
    </div>
    </>
  )
}

export default App
