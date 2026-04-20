import React from 'react';
import { useParams } from 'react-router-dom';
import RelatedVideos from '../components/RelatedVideos';
import CommentSection from '../components/CommentSection';
import { mockVideos } from '../data/mockData';

function Watch() {
    const { id } = useParams();
    const video = mockVideos.find(v => v.id === id);

    if (!video) return <div>Video not found</div>;

    return (
        <div className="watch-container">
            <div className="watch-main-content">
                <div className="video-player-container">
                    <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        style={{ width: '100%', borderRadius: '12px', aspectRatio: '16/9', objectFit: 'cover' }} 
                    />
                </div>
                
                <div className="video-info-section">
                    <h1 className="video-page-title">{video.title}</h1>
                    <div className="video-page-stats">
                        <div className="channel-info">
                            <img src={video.channelAvatar} alt={video.channelName} className="channel-avatar" />
                            <div>
                                <h4>{video.channelName}</h4>
                                <span>1.2M subscribers</span>
                            </div>
                            <button className="subscribe-btn">Subscribe</button>
                        </div>
                    </div>
                    <div className="video-description">
                        <p><strong>{video.views} • {video.uploadDate}</strong></p>
                        <p>{video.description}</p>
                    </div>
                </div>

                <CommentSection />
            </div>

            <div className="watch-sidebar">
                <RelatedVideos />
            </div>
        </div>
    );
}

export default Watch;
