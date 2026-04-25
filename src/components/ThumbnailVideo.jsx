import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { WatchLaterIcon, MoreIcon } from './YouTubeIcons';
import { useApp } from '../AppContext';

/**
 * ThumbnailVideo Component
 * Enhanced YouTube-style video card with better thumbnail display and hover effects
 * Shows duration, overlays, and action buttons like YouTube
 */
function ThumbnailVideo({ video }) {
    const { toggleWatchLater, isWatchLater } = useApp();
    const [isHovered, setIsHovered] = useState(false);
    const [imageError, setImageError] = useState(false);

    const savedLater = isWatchLater(video.id);

    // Fallback thumbnail if image fails to load
    const fallbackThumbnail = `https://via.placeholder.com/320x180/2a2a2a/ffffff?text=${encodeURIComponent((video.title || 'Video').substring(0, 15))}`;
    const thumbnailUrl = video.thumbnail || fallbackThumbnail;

    const handleWatchLater = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWatchLater(video);
    };

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <div 
            className="thumbnail-video-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ 
                cursor: 'pointer',
                textDecoration: 'none',
                color: 'inherit'
            }}
        >
            {/* Thumbnail Container */}
            <Link to={`/watch/${video.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16/9',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    backgroundColor: '#1a1a1a',
                    marginBottom: '12px'
                }}>
                    {/* Thumbnail Image */}
                    <img
                        src={imageError ? fallbackThumbnail : thumbnailUrl}
                        alt={video.title || 'Video'}
                        loading="lazy"
                        onError={handleImageError}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.2s ease',
                            transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                            backgroundColor: '#2a2a2a'
                        }}
                    />

                    {/* Duration Badge - Bottom Right */}
                    {video.duration && (
                        <div style={{
                            position: 'absolute',
                            bottom: '8px',
                            right: '8px',
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            color: '#fff',
                            padding: '2px 4px',
                            borderRadius: '2px',
                            fontSize: '12px',
                            fontWeight: '500',
                            fontFamily: 'Roboto, Arial'
                        }}>
                            {video.duration}
                        </div>
                    )}

                    {/* Hover Overlay with Save Button */}
                    {isHovered && (
                        <div style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            display: 'flex',
                            gap: '8px',
                            animation: 'fadeIn 0.2s ease'
                        }}>
                            <button
                                onClick={handleWatchLater}
                                style={{
                                    background: savedLater ? 'rgba(6, 95, 212, 0.9)' : 'rgba(0, 0, 0, 0.7)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '36px',
                                    height: '36px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        background: 'rgba(0, 0, 0, 0.9)'
                                    }
                                }}
                                title={savedLater ? 'Saved' : 'Save for later'}
                            >
                                <WatchLaterIcon size={20} />
                            </button>
                            <button
                                style={{
                                    background: 'rgba(0, 0, 0, 0.7)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '36px',
                                    height: '36px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <MoreIcon size={20} />
                            </button>
                        </div>
                    )}

                    {/* "Streaming Now" Badge - If applicable */}
                    {video.isLive && (
                        <div style={{
                            position: 'absolute',
                            top: '8px',
                            left: '8px',
                            backgroundColor: '#cc0000',
                            color: '#fff',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            fontFamily: 'Roboto, Arial',
                            animation: 'pulse 2s infinite'
                        }}>
                            🔴 Live
                        </div>
                    )}
                </div>
            </Link>

            {/* Video Info Below Thumbnail */}
            <div style={{ display: 'flex', gap: '12px' }}>
                {/* Channel Avatar */}
                {video.channelAvatar && (
                    <img
                        src={video.channelAvatar}
                        alt={video.channelName}
                        style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            flexShrink: 0
                        }}
                    />
                )}

                {/* Video Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <Link to={`/watch/${video.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <h3 style={{
                            margin: '0 0 4px 0',
                            fontSize: '14px',
                            fontWeight: '500',
                            lineHeight: '1.4',
                            color: '#0f0f0f',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}>
                            {video.title}
                        </h3>
                    </Link>

                    {/* Channel Name */}
                    <p style={{
                        margin: '0 0 2px 0',
                        fontSize: '12px',
                        color: '#606060'
                    }}>
                        {video.channelName}
                    </p>

                    {/* Views and Upload Date */}
                    <p style={{
                        margin: '0',
                        fontSize: '12px',
                        color: '#606060'
                    }}>
                        {video.views} {video.uploadedAt && `• ${video.uploadedAt}`}
                    </p>

                    {/* Extra Info */}
                    {video.isLive && (
                        <p style={{
                            margin: '4px 0 0 0',
                            fontSize: '11px',
                            color: '#cc0000',
                            fontWeight: 'bold'
                        }}>
                            🔴 Streaming Now
                        </p>
                    )}
                </div>

                {/* More Options Menu */}
                {isHovered && (
                    <button
                        style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#606060',
                            padding: '8px',
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'center'
                        }}
                    >
                        <MoreIcon size={18} />
                    </button>
                )}
            </div>

            {/* CSS Animations */}
            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.7;
                    }
                }
            `}</style>
        </div>
    );
}

export default ThumbnailVideo;
