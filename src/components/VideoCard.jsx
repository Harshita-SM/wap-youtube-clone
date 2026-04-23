import React from 'react';
import { Link } from 'react-router-dom';
import { MoreIcon } from './YouTubeIcons';

// VideoCard component takes a 'video' object as a prop
function VideoCard({ video }) {
    return (
        // Link wraps the entire card so clicking it takes you to the watch page
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

                    {/* Video Information (Channel Avatar and Text) */}
                    <div className="video-details">
                        <img 
                            src={video.channelAvatar} 
                            alt={`${video.channelName} avatar`} 
                            className="channel-avatar" 
                            loading="lazy"
                        />
                        <div className="video-text">
                            <h3 className="video-title" style={{ paddingRight: '20px' }}>{video.title}</h3>
                            <p className="channel-name">{video.channelName}</p>
                            <p className="video-metadata">
                                {video.views} • {video.uploadDate}
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
            <div className="video-card-more" style={{ position: 'absolute', bottom: '55px', right: '0', cursor: 'pointer', padding: '4px' }}>
                <MoreIcon size={20} />
            </div>
        </div>
    );
}

export default VideoCard;
