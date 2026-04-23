import React from 'react';
import { useParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { mockVideos } from '../data/mockData';

function Channel() {
    const { id } = useParams();
    // For mock purposes, just pick a random video to get channel info, or use the first video's channel
    // In a real app, we'd fetch channel details by ID.  Let's just use mockVideos[0] as the channel
    const channelInfo = mockVideos[0];
    
    // We'll just show all mock videos as this channel's videos for demonstration
    const channelVideos = mockVideos;

    return (
        <div>
            {/* Channel Banner */}
            <div style={{ width: '100%', height: '200px', backgroundColor: '#e5e5e5', backgroundImage: 'linear-gradient(90deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)' }}></div>
            
            {/* Channel Header */}
            <div style={{ padding: '24px', display: 'flex', gap: '24px', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
                <img 
                    src={channelInfo.channelAvatar} 
                    alt={channelInfo.channelName} 
                    style={{ width: '128px', height: '128px', borderRadius: '50%', objectFit: 'cover' }} 
                />
                <div>
                    <h1 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>{channelInfo.channelName}</h1>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '12px' }}>
                        <span>@channelusername</span> • <span>1.5M subscribers</span> • <span>120 videos</span>
                    </div>
                    <p style={{ margin: '0 0 16px 0', fontSize: '14px', maxWidth: '600px', color: 'var(--text-secondary)' }}>
                        Welcome to the official channel! We post new videos every week. Subscribe for more content.
                    </p>
                    <button className="subscribe-btn" style={{ margin: 0 }}>Subscribe</button>
                </div>
            </div>

            {/* Channel Videos */}
            <div style={{ padding: '24px' }}>
                <h3 style={{ marginBottom: '16px' }}>Videos</h3>
                <div className="video-grid">
                    {channelVideos.map(video => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Channel;
