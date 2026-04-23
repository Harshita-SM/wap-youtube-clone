import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// VideoCard component takes a 'video' object as a prop
function VideoCard({ video }) {
    const navigate = useNavigate();

    const handleChannelClick = (e) => {
        e.preventDefault();
        navigate(`/channel/${encodeURIComponent(video.channelName)}`);
    };

    return (
        // Link wraps the entire card so clicking it takes you to the watch page
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

                {/* Video Information (Channel Avatar and Text) */}
                <div className="video-details">
                    <img 
                        src={video.channelAvatar} 
                        alt={`${video.channelName} avatar`} 
                        className="channel-avatar" 
                        loading="lazy"
                        onClick={handleChannelClick}
                    />
                    <div className="video-text">
                        <h3 className="video-title">{video.title}</h3>
                        <p className="channel-name" onClick={handleChannelClick} style={{ cursor: 'pointer' }}>{video.channelName}</p>
                        <p className="video-metadata">
                            {video.views} • {video.uploadDate}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default VideoCard;
