import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    HomeIcon, ShortsIcon, SubscriptionsIcon, HistoryIcon, UserIcon, LibraryIcon,
    PlaylistsIcon, YourVideosIcon, WatchLaterIcon, LikedVideosIcon, DownloadsIcon,
    TrendingIcon, MusicIcon, GamingIcon, NewsIcon, SportsIcon, SettingsIcon,
    FlagIcon, HelpIcon, FeedbackIcon, ChevronRightIcon
} from './YouTubeIcons';

const primaryItems = [
    { id: 'home', icon: HomeIcon, label: 'Home' },
    { id: 'shorts', icon: ShortsIcon, label: 'Shorts' },
    { id: 'subscriptions', icon: SubscriptionsIcon, label: 'Subscriptions' },
];

const secondaryItems = [
    { id: 'your-channel', icon: UserIcon, label: 'Your channel' },
    { id: 'history', icon: HistoryIcon, label: 'History' },
    { id: 'playlists', icon: PlaylistsIcon, label: 'Playlists' },
    { id: 'your-videos', icon: YourVideosIcon, label: 'Your videos' },
    { id: 'watch-later', icon: WatchLaterIcon, label: 'Watch Later' },
    { id: 'liked', icon: LikedVideosIcon, label: 'Liked videos' },
    { id: 'downloads', icon: DownloadsIcon, label: 'Downloads' },
];

const exploreItems = [
    { id: 'trending', icon: TrendingIcon, label: 'Trending' },
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
                            if (item.id === 'shorts') navigate('/shorts');
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
                    You <ChevronRightIcon size={18} style={{ marginTop: '2px' }} />
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
