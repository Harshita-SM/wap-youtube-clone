import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Watch from './pages/Watch';

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
  return (
    <>
      <Header/>
      <div style={appLayoutStyle}>
        <Sidebar/>
        <div style={contentStyle}>
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
