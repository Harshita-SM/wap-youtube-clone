import React from 'react';
import { useParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { mockVideos } from '../data/videos';
import { mockChannels } from '../data/channels';
import { useApp } from '../AppContext';

/**
 * Channel Page Component
 * Shows details about a specific channel and its uploaded videos.
 */
function Channel() {
    // 1. Get the channel ID from URL
    const { id } = useParams();
    
    // 2. Access Global State
    const { toggleSubscription, isSubscribed } = useApp();

    // 3. Find specific channel data
    const channel = mockChannels.find(c => c.id === id) || mockChannels[0];
    
    // 4. Filter videos belonging to this channel
    const channelVideos = mockVideos.filter(video => video.channelName === channel.name);
    
    // 5. Check subscription status
    const subscribed = isSubscribed(channel.name);

    return (
        <div className="channel-page">
            {/* Channel Banner */}
            <div 
                className="channel-banner"
                style={{ 
                    width: '100%', 
                    height: '200px', 
                    backgroundColor: '#e5e5e5', 
                    backgroundImage: `url(${channel.banner})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            ></div>
            
            {/* Channel Header Info */}
            <div style={{ padding: '24px 72px', display: 'flex', gap: '24px', alignItems: 'flex-start', borderBottom: '1px solid var(--border)' }}>
                <img 
                    src={channel.avatar} 
                    alt={channel.name} 
                    style={{ width: '160px', height: '160px', borderRadius: '50%', objectFit: 'cover' }} 
                />
                <div style={{ flex: 1 }}>
                    <h1 style={{ margin: '0 0 8px 0', fontSize: '36px', fontWeight: 'bold' }}>{channel.name}</h1>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '12px' }}>
                        <span>{channel.handle}</span> • <span>{channel.subscribers} subscribers</span> • <span>{channel.videoCount} videos</span>
                    </div>
                    <p style={{ margin: '0 0 16px 0', fontSize: '14px', maxWidth: '600px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                        {channel.description}
                    </p>
                    
                    {/* Integrated Subscribe Toggle */}
                    <button 
                        className={`subscribe-btn ${subscribed ? 'subscribed' : ''}`}
                        onClick={() => toggleSubscription(channel.name)}
                        style={{
                            margin: 0,
                            padding: '10px 20px',
                            borderRadius: '24px',
                            border: 'none',
                            backgroundColor: subscribed ? 'var(--hover-bg)' : 'var(--text)',
                            color: subscribed ? 'var(--text)' : 'var(--bg)',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {subscribed ? 'Subscribed' : 'Subscribe'}
                    </button>
                </div>
            </div>

            {/* Channel Content Tabs (Simplified) */}
            <div style={{ padding: '0 72px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', gap: '24px' }}>
                    <div style={{ padding: '16px 0', borderBottom: '3px solid var(--text)', fontWeight: '600', cursor: 'pointer' }}>Videos</div>
                    <div style={{ padding: '16px 0', color: 'var(--text-secondary)', fontWeight: '500', cursor: 'pointer' }}>Playlists</div>
                    <div style={{ padding: '16px 0', color: 'var(--text-secondary)', fontWeight: '500', cursor: 'pointer' }}>Community</div>
                    <div style={{ padding: '16px 0', color: 'var(--text-secondary)', fontWeight: '500', cursor: 'pointer' }}>About</div>
                </div>
            </div>

            {/* Video Grid */}
            <div style={{ padding: '24px 72px' }}>
                <div className="video-grid">
                    {channelVideos.length > 0 ? (
                        channelVideos.map(video => (
                            <VideoCard key={video.id} video={video} />
                        ))
                    ) : (
                        <p style={{ color: 'var(--text-secondary)' }}>No videos uploaded yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Channel;
