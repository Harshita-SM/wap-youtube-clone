import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Home, Compass, PlaySquare, Clock, ThumbsUp, History, UserSquare, 
    Flame, Music, Gamepad2, Newspaper, Trophy, Settings, Flag, HelpCircle, MessageSquare, Video,
    ListVideo, Download, User, ChevronRight
} from 'lucide-react';

const primaryItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'shorts', icon: Video, label: 'Shorts' },
    { id: 'subscriptions', icon: PlaySquare, label: 'Subscriptions' },
];

const secondaryItems = [
    { id: 'your-channel', icon: User, label: 'Your channel' },
    { id: 'history', icon: History, label: 'History' },
    { id: 'playlists', icon: ListVideo, label: 'Playlists' },
    { id: 'your-videos', icon: UserSquare, label: 'Your videos' },
    { id: 'watch-later', icon: Clock, label: 'Watch Later' },
    { id: 'liked', icon: ThumbsUp, label: 'Liked videos' },
    { id: 'downloads', icon: Download, label: 'Downloads' },
];

const exploreItems = [
    { id: 'trending', icon: Flame, label: 'Trending' },
    { id: 'music', icon: Music, label: 'Music' },
    { id: 'gaming', icon: Gamepad2, label: 'Gaming' },
    { id: 'news', icon: Newspaper, label: 'News' },
    { id: 'sports', icon: Trophy, label: 'Sports' },
];

const settingItems = [
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'report', icon: Flag, label: 'Report history' },
    { id: 'help', icon: HelpCircle, label: 'Help' },
    { id: 'feedback', icon: MessageSquare, label: 'Send feedback' },
];

function Sidebar({ isOpen }) {
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <aside className='sidebar'>
            <div className="sidebar-section">
                {primaryItems.map((item) => (
                    <div 
                        key={item.id} 
                        className={`sidebar-item ${item.id === 'home' ? 'active' : ''}`}
                        onClick={() => {
                            if (item.id === 'home') navigate('/');
                        }}
                    >
                        <item.icon className='sidebar-icon' size={20} />
                        <span className='sidebar-text' style={{ fontSize: '14px' }}>{item.label}</span>
                    </div>
                ))}
            </div>

            <hr className="sidebar-divider" style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '12px 0' }} />

            <div className="sidebar-section">
                <div className="sidebar-item" style={{ fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px', paddingLeft: '12px' }}>
                    You <ChevronRight size={18} style={{ marginTop: '2px' }} />
                </div>
                {secondaryItems.map((item) => (
                    <div 
                        key={item.id} 
                        className='sidebar-item'
                        onClick={() => {
                            if (item.id === 'your-channel') navigate('/channel/1');
                            if (['history', 'playlists', 'liked'].includes(item.id)) navigate('/library');
                        }}
                    >
                        <item.icon className='sidebar-icon' size={20} />
                        <span className='sidebar-text' style={{ fontSize: '14px' }}>{item.label}</span>
                    </div>
                ))}
            </div>

            <hr className="sidebar-divider" style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '12px 0' }} />

            <div className="sidebar-section">
                <h3 style={{ padding: '8px 12px', margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Explore</h3>
                {exploreItems.map((item) => (
                    <div key={item.id} className='sidebar-item'>
                        <item.icon className='sidebar-icon' size={20} />
                        <span className='sidebar-text' style={{ fontSize: '14px' }}>{item.label}</span>
                    </div>
                ))}
            </div>

            <hr className="sidebar-divider" style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '12px 0' }} />

            <div className="sidebar-section">
                {settingItems.map((item) => (
                    <div key={item.id} className='sidebar-item'>
                        <item.icon className='sidebar-icon' size={20} />
                        <span className='sidebar-text' style={{ fontSize: '14px' }}>{item.label}</span>
                    </div>
                ))}
            </div>

            <hr className="sidebar-divider" style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '12px 0' }} />

            <div className="sidebar-footer" style={{ padding: '12px', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                <p style={{ margin: '0 0 8px 0', fontWeight: '500' }}>About Press Copyright Contact us Creators Advertise Developers</p>
                <p style={{ margin: '0 0 8px 0', fontWeight: '500' }}>Terms Privacy Policy & Safety How YouTube works Test new features</p>
                <p style={{ margin: 0 }}>© 2026 Google LLC</p>
            </div>
        </aside>
    );
}

export default Sidebar;
