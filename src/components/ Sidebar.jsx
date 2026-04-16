import React from 'react';
import { Home, Compass, PlaySquare, Clock, ThumbsUp, User, History, UserSquare} from 'lucide-react';
// I discovered the lucide-react on internet it is a icon library for react. 

function Sidebar() {
    return (
        <div className='sidebar'>
            <div className='sidebar-item active'>
                <Home className='sidebar-icon' />
                <span className='sidebar-text' >Home</span>
            </div>

            <div className='sidebar-item'>
                <Compass className='sidebar-icon' />
                <span className='sidebar-text'>Explore</span>
            </div>

            <div className='sidebar-item'>
                <PlaySquare className='sidebar-icon'/>
                <span className='sidebar-text'>Subscriptions</span>
            </div>





             <hr /> {/* this is a horizontal line  */}







            <div className='sidebar-item'>
                <History className='sidebar-icon'/>
                <span className='sidebar-text'>History</span>
            </div>

            <div className='sidebar-item'>
                <ThumbsUp className='sidebar-icon'/>
                <span className='sidebar-text'>Like</span>

            </div>

        </div>
    )
}

export default Sidebar;