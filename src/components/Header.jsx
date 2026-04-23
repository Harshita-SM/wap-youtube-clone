import React, { useState } from 'react';
import { MenuIcon, SearchIcon, CreateIcon, BellIcon, UserIcon, MicIcon } from './YouTubeIcons';
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
                <MenuIcon className='icon' onClick={toggleSidebar} />
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
                        <SearchIcon size={20} />
                    </button>
                </form>
                <div className='mic-button' title='Search with your voice'>
                    <MicIcon size={24} />
                </div>
            </div>

            {/* Right Section: Icons (Create, Notifications, User) */}
            <div className='header-right'>
                <button className='icon-button' aria-label='Create'>
                    <CreateIcon className='icon' />
                </button>
                <button className='icon-button' aria-label='Notifications'>
                    <BellIcon className='icon' />
                </button>
                <button className='user-icon-container' aria-label='User Profile'>
                    <UserIcon className='icon' />
                </button>
            </div>
        </header>
    );
}

export default Header;
