import React from 'react';
import {Menu, Search , Video, Bell, User} from 'lucide-react';

function Header() {
    return (
        <div className='header'>
            <div className='header-left'>
                <Menu className='icon'/>
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" alt="Youtube Logo"  className='header-logo'/>
            </div>

            <div className='header-center'>
                <input type="text" placeholder='Search' />
                <button className='search-button'> 
                    <Search size={20}/> 
                </button>
            </div>

            <div className='header-right'> 
                <Video className='icon'/>
                <Bell className='icon' />
                <User className='icon'/>
            </div>
        </div>
    )
}

export default Header;