import React, { useState, useCallback } from 'react';
import {Menu, Search , Video, Bell, User} from 'lucide-react';

function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    
    const handleSearch = useCallback((e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            console.log('Searching for:', searchQuery);
            // TODO: Navigate to search results page
        }
    }, [searchQuery]);

    const handleKeyPress = useCallback((e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    }, [handleSearch]);

    return (
        <header className='header' role="banner">
            <div className='header-left'>
                <button className='menu-button' aria-label="Toggle menu">
                    <Menu className='icon'/>
                </button>
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" 
                    alt="Youtube Logo"  
                    className='header-logo'
                />
            </div>

            <form className='header-center' onSubmit={handleSearch}>
                <input 
                    type="text" 
                    placeholder='Search' 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    aria-label="Search"
                />
                <button 
                    type="submit"
                    className='search-button'
                    aria-label="Search"
                > 
                    <Search size={20}/> 
                </button>
            </form>

            <div className='header-right'> 
                <button aria-label="Create" className='icon-button'>
                    <Video className='icon'/>
                </button>
                <button aria-label="Notifications" className='icon-button'>
                    <Bell className='icon' />
                </button>
                <button aria-label="Account" className='icon-button'>
                    <User className='icon'/>
                </button>
            </div>
        </header>
    )
}

export default Header;