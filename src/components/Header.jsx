import React, { useState } from 'react';
import { Menu, Search, Video, Bell, User, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Header({ toggleSidebar }) {
    // State to keep track of what the user is typing in the search bar
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    // Function to handle the search action
    const handleSearch = (e) => {
        e.preventDefault(); // Prevents the page from refreshing on form submit
        if (searchQuery.trim()) {
            navigate(`/search/${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <header className='header'>
            {/* Left Section: Menu Icon and YouTube Logo */}
            <div className='header-left'>
                <Menu className='icon' onClick={toggleSidebar} />
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" 
                    alt="YouTube Logo" 
                    title="YouTube Home"
                    className='header-logo'
                />
            </div>

            {/* Center Section: Search Bar */}
            <div className='header-search-container'>
                <form className='header-center' onSubmit={handleSearch}>
                    <input 
                        type="text" 
                        placeholder='Search' 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update state as user types
                    />
                    <button type="submit" className='search-button'>
                        <Search size={20} />
                    </button>
                </form>
                <div className='mic-button' title='Search with your voice'>
                    <Mic size={20} />
                </div>
            </div>

            {/* Right Section: Icons (Create, Notifications, User) */}
            <div className='header-right'>
                <Video className='icon' />
                <Bell className='icon' />
                <div className='user-icon-container'>
                    <User className='icon' />
                </div>
            </div>
        </header>
    );
}

export default Header;
