import React from 'react';
import VideoCard from '../components/VideoCard';
import { HistoryIcon, WatchLaterIcon, ThumbsUpIcon } from '../components/YouTubeIcons';
import { useApp } from '../AppContext';

/**
 * Library Page - Now powered by Global State!
 * This page displays the user's actual interactions tracked by AppContext.
 */
function Library() {
    const { history, likedVideos, watchLater } = useApp();

    const renderSection = (title, icon, videos, emptyMessage) => (
        <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                {icon}
                <h2 style={{ margin: 0, fontSize: '18px' }}>{title}</h2>
            </div>
            {videos.length > 0 ? (
                <div className="video-grid">
                    {videos.map(video => (
                        <VideoCard key={`${title}-${video.id}`} video={video} />
                    ))}
                </div>
            ) : (
                <p style={{ color: 'var(--text-secondary)', padding: '20px 0' }}>{emptyMessage}</p>
            )}
        </div>
    );

    return (
        <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '32px', fontSize: '24px' }}>Library</h1>
            
            {renderSection(
                "History", 
                <HistoryIcon size={24} />, 
                history, 
                "Videos you watch will show up here."
            )}
            
            <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '24px 0' }} />
            
            {renderSection(
                "Liked Videos", 
                <ThumbsUpIcon size={24} />, 
                likedVideos, 
                "Use the like button on videos to save them here."
            )}
            
            <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '24px 0' }} />
            
            {renderSection(
                "Watch Later", 
                <WatchLaterIcon size={24} />, 
                watchLater, 
                "Save videos to watch later using the Save button on any video."
            )}
        </div>
    );
}

export default Library;
