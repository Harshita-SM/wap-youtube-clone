import React, { useState, useEffect, useRef } from 'react';
import { MenuIcon, SearchIcon, CreateIcon, BellIcon, UserIcon, MicIcon } from './YouTubeIcons';
import { useNavigate, Link } from 'react-router-dom';
import { mockVideos } from '../data/videos';

/**
 * Header Component - Now with Advanced Search Autocomplete!
 */
function Header({ toggleSidebar }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    // Filter suggestions as user types
    useEffect(() => {
        if (searchQuery.trim().length > 0) {
            const filtered = mockVideos
                .filter(v => v.title.toLowerCase().includes(searchQuery.toLowerCase()))
                .map(v => v.title)
                .slice(0, 10);
            
            // Remove duplicates
            const uniqueSuggestions = [...new Set(filtered)];
            setSuggestions(uniqueSuggestions);
        } else {
            setSuggestions([]);
        }
        setActiveIndex(-1);
    }, [searchQuery]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e, selectedQuery) => {
        if (e) e.preventDefault();
        const finalQuery = selectedQuery || searchQuery;
        if (finalQuery.trim()) {
            navigate(`/search/${encodeURIComponent(finalQuery)}`);
            setShowSuggestions(false);
            setIsVoiceSearchOpen(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex(prev => (prev > 0 ? prev - 1 : -1));
        } else if (e.key === 'Enter') {
            if (activeIndex >= 0) {
                e.preventDefault();
                setSearchQuery(suggestions[activeIndex]);
                handleSearch(null, suggestions[activeIndex]);
            }
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
        }
    };

    return (
        <header className='header'>
            {/* Left Section */}
            <div className='header-left'>
                <MenuIcon className='icon' onClick={toggleSidebar} />
                <Link to="/">
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" 
                        alt="YouTube Logo" 
                        className='header-logo'
                    />
                </Link>
            </div>

            {/* Center Section */}
            <div className='header-search-container' ref={dropdownRef}>
                <form className='header-center' onSubmit={handleSearch}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <input 
                            type="text" 
                            placeholder='Search' 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setShowSuggestions(true)}
                            onKeyDown={handleKeyDown}
                        />
                        
                        {/* Autocomplete Dropdown */}
                        {showSuggestions && suggestions.length > 0 && (
                            <ul style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                right: 0,
                                backgroundColor: 'white',
                                border: '1px solid #ccc',
                                borderRadius: '0 0 12px 12px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                listStyle: 'none',
                                padding: '8px 0',
                                margin: 0,
                                zIndex: 1000
                            }}>
                                {suggestions.map((suggestion, index) => (
                                    <li 
                                        key={index}
                                        onClick={() => {
                                            setSearchQuery(suggestion);
                                            handleSearch(null, suggestion);
                                        }}
                                        onMouseEnter={() => setActiveIndex(index)}
                                        style={{
                                            padding: '8px 16px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            backgroundColor: index === activeIndex ? '#f2f2f2' : 'transparent',
                                            fontWeight: index === activeIndex ? '500' : 'normal'
                                        }}
                                    >
                                        <SearchIcon size={16} style={{ color: '#606060' }} />
                                        <span style={{ fontSize: '15px' }}>{suggestion}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <button type="submit" className='search-button'>
                        <SearchIcon size={20} />
                    </button>
                </form>
                
                <div 
                    className='mic-button' 
                    onClick={() => setIsVoiceSearchOpen(true)}
                >
                    <MicIcon size={24} />
                </div>
            </div>

            {/* Right Section */}
            <div className='header-right'>
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

            {/* VOICE SEARCH MODAL (rest omitted for brevity, but logically kept) */}
            {isVoiceSearchOpen && (
                <div className="voice-search-overlay">
                    <div className="voice-search-content">
                        <button className="close-voice" onClick={() => setIsVoiceSearchOpen(false)}>✕</button>
                        <div className="mic-animation">
                            <MicIcon size={40} />
                        </div>
                        <h2>{searchQuery || 'Listening...'}</h2>
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
