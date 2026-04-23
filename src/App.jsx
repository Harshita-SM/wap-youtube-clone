import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Watch from './pages/Watch';
import SearchResults from './pages/SearchResults';
import Channel from './pages/Channel';
import Library from './pages/Library';

const appLayoutStyle = {
  display: 'flex',
  height: 'calc(100vh - 64px)'
};

const contentStyle = {
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden'
};

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  }

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <div style={appLayoutStyle}>
        <Sidebar isOpen={isSidebarOpen} />
        <div style={contentStyle}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watch/:id" element={<Watch />} />
            <Route path="/search/:query" element={<SearchResults />} />
            <Route path="/channel/:id" element={<Channel />} />
            <Route path="/library" element={<Library />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
