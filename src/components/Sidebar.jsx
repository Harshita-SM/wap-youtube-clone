import React from 'react';
import { Home, Compass, PlaySquare, Clock, ThumbsUp, History, UserSquare } from 'lucide-react';

// We define our sidebar items in an array to make the code cleaner and easier to manage
const primaryItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'explore', icon: Compass, label: 'Explore' },
    { id: 'subscriptions', icon: PlaySquare, label: 'Subscriptions' },
];

const secondaryItems = [
    { id: 'history', icon: History, label: 'History' },
    { id: 'your-videos', icon: UserSquare, label: 'Your Videos' },
    { id: 'watch-later', icon: Clock, label: 'Watch Later' },
    { id: 'liked', icon: ThumbsUp, label: 'Liked Videos' },
];

function Sidebar() {
    return (
        <aside className='sidebar'>
            {/* Map through primary items */}
            {primaryItems.map((item) => (
                <div key={item.id} className='sidebar-item'>
                    <item.icon className='sidebar-icon' />
                    <span className='sidebar-text'>{item.label}</span>
                </div>
            ))}

            <hr className="sidebar-divider" />

            {/* Map through secondary items */}
            {secondaryItems.map((item) => (
                <div key={item.id} className='sidebar-item'>
                    <item.icon className='sidebar-icon' />
                    <span className='sidebar-text'>{item.label}</span>
                </div>
            ))}
        </aside>
    );
}

export default Sidebar;
