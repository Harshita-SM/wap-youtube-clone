import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Toast from './components/Toast';
import Home from './pages/Home';
import Watch from './pages/Watch';
import SearchResults from './pages/SearchResults';
import Channel from './pages/Channel';
import Library from './pages/Library';
import Shorts from './pages/Shorts';
import Subscriptions from './pages/Subscriptions';

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
            <Route path="/shorts" element={<Shorts />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/watch/:id" element={<Watch />} />
            <Route path="/search/:query" element={<SearchResults />} />
            <Route path="/channel/:id" element={<Channel />} />
            <Route path="/library" element={<Library />} />
          </Routes>
        </div>
      </div>
      <Toast />
    </>
  )
}

export default App
