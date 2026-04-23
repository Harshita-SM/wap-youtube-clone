import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MoreIcon, SearchIcon, Clock, FlagIcon } from './YouTubeIcons';

function VideoCard({ video }) {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

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

    const handleChannelClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/channel/${encodeURIComponent(video.channelName)}`);
    };

    return (
        <div className="video-card-container" style={{ position: 'relative' }}>
            <Link to={`/watch/${video.id}`} className="video-card-link">
                <div className="video-card">
                    {/* Video Thumbnail */}
                    <div className="thumbnail-container" style={{ position: 'relative' }}>
                        <img 
                            src={video.thumbnail} 
                            alt={video.title} 
                            className="video-thumbnail" 
                            loading="lazy"
                            title={video.title}
                        />
                    </div>

                    {/* Video Information */}
                    <div className="video-details">
                        <img 
                            src={video.channelAvatar} 
                            alt={`${video.channelName} avatar`} 
                            className="channel-avatar" 
                            loading="lazy"
                            onClick={handleChannelClick}
                            style={{ cursor: 'pointer' }}
                        />
                        <div className="video-text">
                            <h3 className="video-title" style={{ paddingRight: '20px' }}>{video.title}</h3>
                            <p className="channel-name" onClick={handleChannelClick} style={{ cursor: 'pointer' }}>{video.channelName}</p>
                            <p className="video-metadata">
                                {video.views} • {video.uploadDate}
                            </p>
                        </div>
                    </div>
                </div>
            </Link>

            {/* MORE BUTTON - Now ALIVE! */}
            <div 
                className="video-card-more" 
                ref={menuRef}
                style={{ position: 'absolute', bottom: '55px', right: '0', cursor: 'pointer', padding: '4px' }}
                onClick={handleMenuClick}
            >
                <MoreIcon size={20} />
                
                {isMenuOpen && (
                    <div className="dropdown-menu" style={{ right: '0', bottom: '30px', top: 'auto', width: '220px', backgroundColor: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', zIndex: 100, position: 'absolute', padding: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                        <div className="dropdown-item" style={{ display: 'flex', gap: '8px', padding: '8px', cursor: 'pointer' }}>
                            <SearchIcon size={18} /> <span>Add to queue</span>
                        </div>
                        <div className="dropdown-item" style={{ display: 'flex', gap: '8px', padding: '8px', cursor: 'pointer' }}>
                            <MoreIcon size={18} style={{ transform: 'rotate(90deg)' }} /> <span>Save to playlist</span>
                        </div>
                        <div className="dropdown-item" style={{ display: 'flex', gap: '8px', padding: '8px', cursor: 'pointer' }}>
                            <FlagIcon size={18} /> <span>Report</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default VideoCard;
