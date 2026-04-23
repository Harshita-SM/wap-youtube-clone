import React, { useState, useEffect } from 'react';
import { MenuIcon, SearchIcon, CreateIcon, BellIcon, UserIcon, MicIcon } from './YouTubeIcons';
import { useNavigate, Link } from 'react-router-dom';

/**
 * Header Component - Now with fully functional "Interactive" buttons!
 */
function Header({ toggleSidebar }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const navigate = useNavigate();

    // 1. Handle Search
    const handleSearch = (e) => {
        if (e) e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search/${encodeURIComponent(searchQuery)}`);
            setIsVoiceSearchOpen(false);
        }
    };

    // 2. Simulated Voice Search logic
    useEffect(() => {
        let timer;
        if (isVoiceSearchOpen) {
            // After 3 seconds of "listening", simulate finding a result
            timer = setTimeout(() => {
                setSearchQuery('React best practices');
                // Note: In a real app we might call handleSearch() here
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [isVoiceSearchOpen]);

    return (
        <header className='header'>
            {/* Left Section */}
            <div className='header-left'>
                <MenuIcon className='icon' onClick={toggleSidebar} />
                <Link to="/">
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" 
                        alt="YouTube Logo" 
                        title="YouTube Home"
                        className='header-logo'
                    />
                </Link>
            </div>

            {/* Center Section */}
            <div className='header-search-container'>
                <form className='header-center' onSubmit={handleSearch}>
                    <input 
                        type="text" 
                        placeholder='Search' 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className='search-button'>
                        <SearchIcon size={20} />
                    </button>
                </form>
                
                {/* MIC BUTTON - Now ALIVE! */}
                <div 
                    className='mic-button' 
                    title='Search with your voice'
                    onClick={() => setIsVoiceSearchOpen(true)}
                >
                    <MicIcon size={24} />
                </div>
            </div>

            {/* Right Section */}
            <div className='header-right'>
                {/* CREATE BUTTON - Now ALIVE! */}
                <div style={{ position: 'relative' }}>
                    <button 
                        className='icon-button' 
                        onClick={() => setIsCreateOpen(!isCreateOpen)}
                    >
                        <CreateIcon className='icon' />
                    </button>
                    
                    {isCreateOpen && (
                        <div className="dropdown-menu">
                            <div className="dropdown-item">
                                <SearchIcon size={20} /> <span>Upload video</span>
                            </div>
                            <div className="dropdown-item">
                                <MicIcon size={20} /> <span>Go live</span>
                            </div>
                        </div>
                    )}
                </div>

                <button className='icon-button'>
                    <BellIcon className='icon' />
                </button>
                
                <div className='user-icon-container'>
                    <UserIcon className='icon' />
                </div>
            </div>

            {/* VOICE SEARCH MODAL */}
            {isVoiceSearchOpen && (
                <div className="voice-search-overlay">
                    <div className="voice-search-content">
                        <button className="close-voice" onClick={() => setIsVoiceSearchOpen(false)}>✕</button>
                        <div className="mic-animation">
                            <MicIcon size={40} />
                        </div>
                        <h2>{searchQuery || 'Listening...'}</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            {searchQuery ? 'Click search to confirm' : 'Say something like "React Tutorial"'}
                        </p>
                        {searchQuery && (
                            <button 
                                onClick={() => handleSearch()}
                                style={{
                                    marginTop: '20px',
                                    padding: '10px 24px',
                                    borderRadius: '20px',
                                    border: 'none',
                                    backgroundColor: '#cc0000',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            >
                                Search Now
                            </button>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
