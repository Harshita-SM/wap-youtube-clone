import React, { useCallback } from 'react';
import { Home, Compass, PlaySquare, Clock, ThumbsUp, History, UserSquare } from 'lucide-react';

const SIDEBAR_ITEMS = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'explore', icon: Compass, label: 'Explore' },
    { id: 'subscriptions', icon: PlaySquare, label: 'Subscriptions' },
];

const SIDEBAR_ITEMS_SECONDARY = [
    { id: 'history', icon: History, label: 'History' },
    { id: 'your-videos', icon: UserSquare, label: 'Your Videos' },
    { id: 'watch-later', icon: Clock, label: 'Watch Later' },
    { id: 'liked', icon: ThumbsUp, label: 'Liked Videos' },
];

function Sidebar() {
    const handleItemClick = useCallback((itemId) => {
        console.log('Navigating to:', itemId);
        // TODO: Implement navigation
    }, []);

    const renderSidebarItems = (items) => (
        items.map(({ id, icon: Icon, label }) => (
            <button
                key={id}
                className='sidebar-item'
                onClick={() => handleItemClick(id)}
                aria-label={label}
            >
                <Icon className='sidebar-icon' size={24} />
                <span className='sidebar-text'>{label}</span>
            </button>
        ))
    );

    return (
        <aside className='sidebar' role="navigation" aria-label="Main navigation">
            {renderSidebarItems(SIDEBAR_ITEMS)}
            <hr className='sidebar-divider' />
            {renderSidebarItems(SIDEBAR_ITEMS_SECONDARY)}
        </aside>
    );
}

export default Sidebar;