import React from 'react';
import VideoCard from '../components/VideoCard';
import { mockVideos } from '../data/mockData';
import { History, Clock, ThumbsUp } from 'lucide-react';

function Library() {
    // Just mock subsets of videos for different sections
    const historyVideos = mockVideos.slice(0, 4);
    const watchLaterVideos = mockVideos.slice(2, 5);
    const likedVideos = mockVideos.slice(1, 6);

    const renderSection = (title, icon, videos) => (
        <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                {icon}
                <h2 style={{ margin: 0, fontSize: '18px' }}>{title}</h2>
            </div>
            <div className="video-grid">
                {videos.map(video => (
                    <VideoCard key={`${title}-${video.id}`} video={video} />
                ))}
            </div>
        </div>
    );

    return (
        <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '32px', fontSize: '24px' }}>Library</h1>
            
            {renderSection("History", <History size={24} />, historyVideos)}
            <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '24px 0' }} />
            
            {renderSection("Watch Later", <Clock size={24} />, watchLaterVideos)}
            <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '24px 0' }} />
            
            {renderSection("Liked Videos", <ThumbsUp size={24} />, likedVideos)}
        </div>
    );
}

export default Library;
