import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MoreIcon, SearchIcon, FlagIcon, WatchLaterIcon, PlaylistsIcon } from './YouTubeIcons';
import { useApp } from '../AppContext';

/**
 * VideoCard Component - Now with hover actions!
 */
function VideoCard({ video }) {
    const { toggleWatchLater, isWatchLater } = useApp();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const menuRef = useRef(null);

    const savedLater = isWatchLater(video.id);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMenuClick = (e) => {
        e.preventDefault(); // Prevent navigating to watch page
        e.stopPropagation(); // Prevent event bubbling
        setIsMenuOpen(!isMenuOpen);
    };

    const handleWatchLater = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWatchLater(video);
    };

    return (
        <div 
            className="video-card-container" 
            style={{ position: 'relative' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="video-card">
                {/* Video Thumbnail - Links to Watch Page */}
                <Link to={`/watch/${video.id}`} className="video-card-link">
                    <div className="thumbnail-container" style={{ position: 'relative' }}>
                        <img 
                            src={video.thumbnail} 
                            alt={video.title} 
                            className="video-thumbnail" 
                            loading="lazy"
                            style={{ width: '100%', aspectRatio: '16/9', borderRadius: '12px', objectFit: 'cover' }}
                        />
                        
                        {/* HOVER ACTIONS - Quick Save */}
                        {isHovered && (
                            <div style={{ 
                                position: 'absolute', 
                                top: '8px', 
                                right: '8px', 
                                display: 'flex', 
                                flexDirection: 'column', 
                                gap: '4px' 
                            }}>
                                <button 
                                    onClick={handleWatchLater}
                                    title={savedLater ? "Remove from Watch later" : "Watch later"}
                                    style={{
                                        backgroundColor: 'rgba(0,0,0,0.8)',
                                        border: 'none',
                                        borderRadius: '4px',
                                        padding: '4px',
                                        color: savedLater ? '#3ea6ff' : 'white',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <WatchLaterIcon size={20} />
                                </button>
                                <button 
                                    title="Add to queue"
                                    style={{
                                        backgroundColor: 'rgba(0,0,0,0.8)',
                                        border: 'none',
                                        borderRadius: '4px',
                                        padding: '4px',
                                        color: 'white',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <PlaylistsIcon size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                </Link>

                {/* Video Information */}
                <div className="video-details" style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                    {/* Channel Avatar - Links to Channel Page */}
                    <Link to={`/channel/${video.channelId || '1'}`}>
                        <img 
                            src={video.channelAvatar} 
                            alt={`${video.channelName} avatar`} 
                            className="channel-avatar" 
                            style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                    </Link>
                    
                    <div className="video-text" style={{ flex: 1, position: 'relative' }}>
                        {/* Title - Links to Watch Page */}
                        <Link to={`/watch/${video.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <h3 className="video-title" style={{ 
                                margin: '0 20px 4px 0', 
                                fontSize: '16px', 
                                fontWeight: '500', 
                                lineHeight: '1.4',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}>
                                {video.title}
                            </h3>
                        </Link>

                        {/* Channel Name - Links to Channel Page */}
                        <Link to={`/channel/${video.channelId || '1'}`} style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>
                            <p className="channel-name" style={{ margin: 0, fontSize: '14px' }}>{video.channelName}</p>
                        </Link>

                        <p className="video-metadata" style={{ margin: '2px 0 0', fontSize: '14px', color: 'var(--text-secondary)' }}>
                            {video.views} • {video.uploadDate}
                        </p>
                    </div>
                </div>
            </div>

            {/* MORE BUTTON */}
            {isHovered && (
                <div 
                    className="video-card-more" 
                    ref={menuRef}
                    style={{ position: 'absolute', top: '200px', right: '0', cursor: 'pointer', padding: '4px' }}
                    onClick={handleMenuClick}
                >
                    <MoreIcon size={20} />
                    
                    {isMenuOpen && (
                        <div className="dropdown-menu" style={{ 
                            position: 'absolute',
                            right: '0', 
                            top: '24px', 
                            width: '220px',
                            backgroundColor: 'var(--bg)',
                            border: '1px solid var(--border)',
                            borderRadius: '12px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            zIndex: 10
                        }}>
                            <div className="dropdown-item" style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '12px' }} onClick={handleWatchLater}>
                                <WatchLaterIcon size={18} /> <span>{savedLater ? 'Remove from Watch later' : 'Save to Watch later'}</span>
                            </div>
                            <div className="dropdown-item" style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <PlaylistsIcon size={18} /> <span>Save to playlist</span>
                            </div>
                            <div className="dropdown-item" style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <FlagIcon size={18} /> <span>Report</span>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default VideoCard;

