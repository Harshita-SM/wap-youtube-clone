import React, { useState, useEffect, useRef } from 'react';
import { MenuIcon, SearchIcon, CreateIcon, BellIcon, UserIcon, MicIcon, SettingsIcon, HistoryIcon, HelpIcon } from './YouTubeIcons';
import { useNavigate, Link } from 'react-router-dom';
import { mockVideos } from '../data/videos';
import { useApp } from '../AppContext';

/**
 * Header Component - Now with Advanced Search Autocomplete and User/Notification Menus!
 */
function Header({ toggleSidebar }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    
    const { theme, toggleTheme } = useApp();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const userMenuRef = useRef(null);
    const notificationsRef = useRef(null);

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

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
                setIsUserMenuOpen(false);
            }
            if (notificationsRef.current && !notificationsRef.current.contains(e.target)) {
                setIsNotificationsOpen(false);
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

    const mockNotifications = [
        { id: 1, text: "Code Mastery uploaded: React Router v7 is here!", time: "2 hours ago", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=50&q=80" },
        { id: 2, text: "Tech Haven: 10 PC builds you missed.", time: "5 hours ago", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=50&q=80" },
        { id: 3, text: "Chill Beats is live: Lofi hip hop radio", time: "1 day ago", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=50&q=80" }
    ];

    return (
        <header className='header'>
            {/* Left Section */}
            <div className='header-left'>
                <MenuIcon className='icon' onClick={toggleSidebar} />
                <Link to="/">
                    <img 
                        src={theme === 'dark' ? "https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png" : "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"}
                        alt="YouTube Logo" 
                        className='header-logo'
                        style={{ height: theme === 'dark' ? '40px' : '20px' }}
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
                                backgroundColor: 'var(--bg)',
                                border: '1px solid var(--border)',
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
                                            backgroundColor: index === activeIndex ? 'var(--hover-bg)' : 'transparent',
                                            fontWeight: index === activeIndex ? '500' : 'normal'
                                        }}
                                    >
                                        <SearchIcon size={16} style={{ color: 'var(--text-secondary)' }} />
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

                <div style={{ position: 'relative' }} ref={notificationsRef}>
                    <button className='icon-button' onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}>
                        <BellIcon className='icon' />
                        <span style={{ position: 'absolute', top: '2px', right: '2px', backgroundColor: '#cc0000', color: 'white', fontSize: '10px', padding: '1px 5px', borderRadius: '10px' }}>3</span>
                    </button>
                    {isNotificationsOpen && (
                        <div className="dropdown-menu" style={{ width: '400px', maxHeight: '500px', overflowY: 'auto' }}>
                            <div style={{ padding: '16px', borderBottom: '1px solid var(--border)', fontWeight: '500' }}>Notifications</div>
                            {mockNotifications.map(n => (
                                <div key={n.id} className="dropdown-item" style={{ alignItems: 'flex-start', padding: '16px' }}>
                                    <img src={n.avatar} style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '14px', marginBottom: '4px' }}>{n.text}</div>
                                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{n.time}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                
                <div style={{ position: 'relative' }} ref={userMenuRef}>
                    <div className='user-icon-container' onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
                        <UserIcon className='icon' />
                    </div>
                    {isUserMenuOpen && (
                        <div className="dropdown-menu" style={{ width: '300px' }}>
                            <div style={{ display: 'flex', gap: '16px', padding: '16px', borderBottom: '1px solid var(--border)' }}>
                                <UserIcon size={40} />
                                <div>
                                    <div style={{ fontWeight: '500' }}>Guest User</div>
                                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>@guestuser123</div>
                                </div>
                            </div>
                            <div className="dropdown-item" onClick={toggleTheme}>
                                <SettingsIcon size={20} /> <span>Appearance: {theme === 'light' ? 'Light' : 'Dark'}</span>
                            </div>
                            <div className="dropdown-item">
                                <HistoryIcon size={20} /> <span>Switch account</span>
                            </div>
                            <div className="dropdown-item">
                                <HelpIcon size={20} /> <span>Sign out</span>
                            </div>
                            <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '4px 0' }} />
                            <div className="dropdown-item">
                                <SettingsIcon size={20} /> <span>Settings</span>
                            </div>
                        </div>
                    )}
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
