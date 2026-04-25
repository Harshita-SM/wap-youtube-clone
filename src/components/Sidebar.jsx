import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    HomeIcon, ShortsIcon, SubscriptionsIcon, HistoryIcon, UserIcon, LibraryIcon,
    PlaylistsIcon, YourVideosIcon, WatchLaterIcon, LikedVideosIcon, DownloadsIcon,
    TrendingIcon, MusicIcon, GamingIcon, NewsIcon, SportsIcon, SettingsIcon,
    FlagIcon, HelpIcon, FeedbackIcon, ChevronRightIcon
} from './YouTubeIcons';
import { useApp } from '../AppContext';
import { mockChannels } from '../data/channels';

const primaryItems = [
    { id: 'home', icon: HomeIcon, label: 'Home', path: '/' },
    { id: 'shorts', icon: ShortsIcon, label: 'Shorts', path: '/shorts' },
    { id: 'subscriptions', icon: SubscriptionsIcon, label: 'Subscriptions', path: '/subscriptions' },
];

const secondaryItems = [
    { id: 'your-channel', icon: UserIcon, label: 'Your channel', path: '/channel/1' },
    { id: 'history', icon: HistoryIcon, label: 'History', path: '/library' },
    { id: 'playlists', icon: PlaylistsIcon, label: 'Playlists', path: '/library' },
    { id: 'your-videos', icon: YourVideosIcon, label: 'Your videos' },
    { id: 'watch-later', icon: WatchLaterIcon, label: 'Watch Later' },
    { id: 'liked', icon: LikedVideosIcon, label: 'Liked videos', path: '/library' },
    { id: 'downloads', icon: DownloadsIcon, label: 'Downloads' },
    { id: 'activity', icon: TrendingIcon, label: 'Your activity', path: '/activity' },
];

const exploreItems = [
    { id: 'trending', icon: TrendingIcon, label: 'Trending', path: '/trending' },
    { id: 'music', icon: MusicIcon, label: 'Music' },
    { id: 'gaming', icon: GamingIcon, label: 'Gaming' },
    { id: 'news', icon: NewsIcon, label: 'News' },
    { id: 'sports', icon: SportsIcon, label: 'Sports' },
];

const settingItems = [
    { id: 'settings', icon: SettingsIcon, label: 'Settings' },
    { id: 'report', icon: FlagIcon, label: 'Report history' },
    { id: 'help', icon: HelpIcon, label: 'Help' },
    { id: 'feedback', icon: FeedbackIcon, label: 'Send feedback' },
];

function Sidebar({ isOpen }) {
    const navigate = useNavigate();
    const location = useLocation();

    // Helper to determine if an item is active based on the URL
    const getActivePath = () => {
        const path = location.pathname;
        if (path === '/') return 'home';
        if (path.startsWith('/shorts')) return 'shorts';
        if (path.startsWith('/library')) return 'history'; // For Library view group
        if (path.startsWith('/channel')) return 'your-channel';
        return '';
    };

    const currentActive = getActivePath();
    const { subscriptions } = useApp();

    if (!isOpen) return null;

    const isActive = (path) => {
        if (!path) return false;
        if (path === '/' && location.pathname === '/') return true;
        if (path !== '/' && location.pathname.startsWith(path)) return true;
        return false;
    };

    // Filter channels that the user is subscribed to
    const subscribedChannels = mockChannels.filter(channel =>
        subscriptions.includes(channel.name)
    );

    const handleItemClick = (item) => {
        if (item.path) {
            navigate(item.path);
        } else {
            showToast(`${item.label} coming soon!`);
        }
    };

    return (
        <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <div className="sidebar-section">
                {primaryItems.map((item) => (
                    <div 
                        key={item.id} 
                        className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
                        onClick={() => handleItemClick(item)}
                    >
                        <item.icon className='sidebar-icon' size={20} />
                        <span className='sidebar-text' style={{ fontSize: '14px' }}>{item.label}</span>
                    </div>
                ))}
            </div>

            <hr className="sidebar-divider" style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '12px 0' }} />

            <div className="sidebar-section">
                <div className="sidebar-item" style={{ fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px', paddingLeft: '12px' }}>
                    You <ChevronRightIcon size={18} style={{ marginTop: '2px' }} />
                </div>
                {secondaryItems.map((item) => (
                    <div 
                        key={item.id} 
                        className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
                        onClick={() => {
                            if (item.path) navigate(item.path);
                        }}
                    >
                        <item.icon className='sidebar-icon' size={20} />
                        <span className='sidebar-text' style={{ fontSize: '14px' }}>{item.label}</span>
                    </div>
                ))}
            </div>

            <hr className="sidebar-divider" style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '12px 0' }} />

            {/* Subscriptions Section - New dynamic part! */}
            {subscribedChannels.length > 0 && (
                <>
                    <div className="sidebar-section">
                        <h3 style={{ padding: '8px 12px', margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Subscriptions</h3>
                        {subscribedChannels.map((channel) => (
                            <div
                                key={channel.id}
                                className={`sidebar-item ${isActive(`/channel/${channel.id}`) ? 'active' : ''}`}
                                onClick={() => navigate(`/channel/${channel.id}`)}
                                style={{ gap: '24px' }}
                            >
                                <img
                                    src={channel.avatar}
                                    alt={channel.name}
                                    style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }}
                                />
                                <span className='sidebar-text' style={{ fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {channel.name}
                                </span>
                            </div>
                        ))}
                    </div>
                    <hr className="sidebar-divider" style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '12px 0' }} />
                </>
            )}

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
