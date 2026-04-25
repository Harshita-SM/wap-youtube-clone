import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RelatedVideos from '../components/RelatedVideos';
import CommentSection from '../components/CommentSection';
import VideoPlayer from '../components/VideoPlayer';
import NotFound from '../components/NotFound';
import { mockVideos } from '../data/videos';
import { ThumbsUpIcon, ThumbsDownIcon, ShareIcon, MoreIcon, WatchLaterIcon } from '../components/YouTubeIcons';

import { useApp } from '../AppContext';
import { formatDuration } from '../utils/formatters';

/**
 * Watch Page Component
 * This is the most important page where users spend their time watching content.
 * It brings together the Video Player, Video Info, Comments, and Related Videos.
 */
function Watch() {
    // 1. Get the video ID from the URL (e.g., /watch/1)
    const { id } = useParams();
    
    // 2. Access Global State from AppContext
    const { 
        addToHistory, 
        toggleLike, 
        isLiked, 
        toggleSubscription, 
        isSubscribed,
        toggleWatchLater,
        isWatchLater,
        showToast
    } = useApp();

    // 3. Find the specific video data from our mock database using the ID
    const video = mockVideos.find(v => v.id === id);

    // 4. Optimization: Scroll to the top and add to history
    useEffect(() => {
        window.scrollTo(0, 0);
        if (video) {
            addToHistory(video);
        }
    }, [id, video]);

    // 5. If the video doesn't exist (wrong ID), show the proper 404 component
    if (!video) {
        return (
            <NotFound
                heading="Video not found"
                message="This video may have been removed or the link might be broken."
            />
        );
    }

    const liked = isLiked(video.id);
    const subscribed = isSubscribed(video.channelName);
    const savedLater = isWatchLater(video.id);

    return (
        <div className="watch-container">
            {/* LEFT SIDE: Main content (Video + Info + Comments) */}
            <main className="watch-main-content">
                
                <div className="video-player-box">
                    <iframe 
                        width="100%" 
                        style={{ aspectRatio: '16/9', borderRadius: '12px', border: 'none' }}
                        src={`https://www.youtube.com/embed/${video.youtubeId || 'dQw4w9WgXcQ'}?autoplay=1`}
                        title="YouTube video player" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    ></iframe>
                </div>
                
                {/* Video Details Section */}
                <section className="video-info-section">
                    <h1 className="video-page-title">{video.title}</h1>
                    
                    <div className="video-page-stats" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                        <div className="channel-info" style={{ display: 'flex', alignItems: 'center' }}>
                            <img 
                                src={video.channelAvatar} 
                                alt={video.channelName} 
                                className="channel-avatar-large" 
                                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                            />
                            <div className="channel-text" style={{ marginLeft: '12px' }}>
                                <h4 style={{ margin: 0 }}>{video.channelName}</h4>
                                <span style={{ fontSize: '12px', color: '#606060' }}>1.2M subscribers</span>
                            </div>
                            
                            {/* Subscribe Button Toggle with Global State */}
                            <button 
                                className={`subscribe-btn ${subscribed ? 'subscribed' : ''}`}
                                onClick={() => toggleSubscription(video.channelName)}
                                style={{
                                    marginLeft: '20px',
                                    padding: '8px 16px',
                                    borderRadius: '20px',
                                    border: 'none',
                                    backgroundColor: subscribed ? 'var(--hover-bg)' : 'var(--text)',
                                    color: subscribed ? 'var(--text)' : 'var(--bg)',
                                    fontWeight: '500',
                                    cursor: 'pointer'
                                }}
                            >
                                {subscribed ? 'Subscribed' : 'Subscribe'}
                            </button>
                        </div>

                        <div className="video-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div className="action-group" style={{ display: 'flex', backgroundColor: 'var(--hover-bg)', borderRadius: '20px', overflow: 'hidden' }}>
                                <button 
                                    onClick={() => toggleLike(video)}
                                    style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '6px', 
                                        padding: '8px 16px', 
                                        border: 'none', 
                                        background: 'none', 
                                        cursor: 'pointer', 
                                        borderRight: '1px solid var(--border)',
                                        color: liked ? '#065fd4' : 'inherit'
                                    }}
                                >
                                    <ThumbsUpIcon size={20} /> <span style={{ fontWeight: '500' }}>{liked ? 'Liked' : '12K'}</span>
                                </button>
                                <button 
                                    onClick={() => showToast("Noted! We'll show less of this.")}
                                    style={{ padding: '8px 16px', border: 'none', background: 'none', cursor: 'pointer' }}
                                >
                                    <ThumbsDownIcon size={20} />
                                </button>
                            </div>
                            <button 
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    showToast("Link copied to clipboard!");
                                }}
                                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '20px', border: 'none', backgroundColor: 'var(--hover-bg)', cursor: 'pointer' }}
                            >
                                <ShareIcon size={20} /> <span style={{ fontWeight: '500' }}>Share</span>
                            </button>
                            <button 
                                onClick={() => toggleWatchLater(video)}
                                style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '6px', 
                                    padding: '8px 16px', 
                                    borderRadius: '20px', 
                                    border: 'none', 
                                    backgroundColor: savedLater ? '#e8f0fe' : 'var(--hover-bg)', 
                                    color: savedLater ? '#065fd4' : 'inherit',
                                    cursor: 'pointer' 
                                }}
                            >
                                <WatchLaterIcon size={20} /> <span style={{ fontWeight: '500' }}>{savedLater ? 'Saved' : 'Save'}</span>
                            </button>
                            <button 
                                onClick={() => showToast("More options coming soon!")}
                                style={{ padding: '8px', borderRadius: '50%', border: 'none', backgroundColor: 'var(--hover-bg)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <MoreIcon size={20} />
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
