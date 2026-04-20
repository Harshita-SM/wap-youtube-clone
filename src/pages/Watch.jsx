import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RelatedVideos from '../components/RelatedVideos';
import CommentSection from '../components/CommentSection';
import { mockVideos } from '../data/mockData';

/**
 * Watch Page Component
 * This is the most important page where users spend their time watching content.
 * It brings together the Video Player, Video Info, Comments, and Related Videos.
 */
function Watch() {
    // 1. Get the video ID from the URL (e.g., /watch/1)
    const { id } = useParams();
    
    // 2. State to track if the user is subscribed (simple toggle)
    const [isSubscribed, setIsSubscribed] = useState(false);

    // 3. Find the specific video data from our mock database using the ID
    const video = mockVideos.find(v => v.id === id);

    // 4. Optimization: Scroll to the top of the page whenever the video ID changes
    // This provides a better user experience when clicking on a related video.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    // 5. If the video doesn't exist (wrong ID), show a simple error message
    if (!video) {
        return (
            <div className="error-page" style={{ padding: '20px', textAlign: 'center' }}>
                <h2>Oops! Video not found.</h2>
            </div>
        );
    }

    return (
        <div className="watch-container">
            {/* LEFT SIDE: Main content (Video + Info + Comments) */}
            <main className="watch-main-content">
                
                {/* Video Player Placeholder */}
                <div className="video-player-box">
                    <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="main-video-image"
                        style={{ width: '100%', borderRadius: '12px', aspectRatio: '16/9', objectFit: 'cover' }}
                    />
                    {/* In a real app, an <iframe /> or <video /> tag would go here */}
                </div>
                
                {/* Video Details Section */}
                <section className="video-info-section">
                    <h1 className="video-page-title">{video.title}</h1>
                    
                    <div className="video-page-stats">
                        <div className="channel-info">
                            <img 
                                src={video.channelAvatar} 
                                alt={video.channelName} 
                                className="channel-avatar-large" 
                                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                            />
                            <div className="channel-text">
                                <h4 style={{ margin: 0 }}>{video.channelName}</h4>
                                <span style={{ fontSize: '12px', color: '#606060' }}>1.2M subscribers</span>
                            </div>
                            
                            {/* Subscribe Button Toggle */}
                            <button 
                                className={`subscribe-btn ${isSubscribed ? 'subscribed' : ''}`}
                                onClick={() => setIsSubscribed(!isSubscribed)}
                                style={{
                                    marginLeft: '20px',
                                    padding: '8px 16px',
                                    borderRadius: '20px',
                                    border: 'none',
                                    backgroundColor: isSubscribed ? '#f2f2f2' : '#0f0f0f',
                                    color: isSubscribed ? '#0f0f0f' : '#ffffff',
                                    fontWeight: '500',
                                    cursor: 'pointer'
                                }}
                            >
                                {isSubscribed ? 'Subscribed' : 'Subscribe'}
                            </button>
                        </div>
                    </div>

                    {/* Description Box */}
                    <div className="video-description-box" style={{ backgroundColor: '#f2f2f2', padding: '12px', borderRadius: '12px', marginTop: '16px' }}>
                        <p style={{ fontWeight: 'bold', margin: '0 0 8px 0' }}>{video.views} • {video.uploadDate}</p>
                        <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.4' }}>{video.description}</p>
                    </div>
                </section>

                {/* Comments Section Component */}
                <CommentSection />
            </main>

            {/* RIGHT SIDE: Related Videos List */}
            <aside className="watch-sidebar">
                <h3 className="related-heading" style={{ fontSize: '16px', marginBottom: '16px' }}>Up Next</h3>
                <RelatedVideos />
            </aside>
        </div>
    );
}

export default Watch;
