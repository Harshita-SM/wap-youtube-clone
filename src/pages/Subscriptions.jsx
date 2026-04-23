import React from 'react';
import VideoCard from '../components/VideoCard';
import { SubscriptionsIcon } from '../components/YouTubeIcons';
import { mockVideos } from '../data/videos';
import { useApp } from '../AppContext';

/**
 * Subscriptions Page
 * Displays videos only from channels the user has subscribed to.
 */
function Subscriptions() {
    const { subscriptions } = useApp();

    // Filter videos based on subscriptions
    const subscribedVideos = mockVideos.filter(video => 
        subscriptions.includes(video.channelName)
    );

    return (
        <div className="subscriptions-page">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0 32px' }}>
                <SubscriptionsIcon size={28} />
                <h1 style={{ margin: 0, fontSize: '24px' }}>Subscriptions</h1>
            </div>

            {subscribedVideos.length > 0 ? (
                <div className="video-grid">
                    {subscribedVideos.map(video => (
                        <VideoCard key={`sub-${video.id}`} video={video} />
                    ))}
                </div>
            ) : (
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    padding: '80px 0',
                    textAlign: 'center'
                }}>
                    <div style={{ 
                        width: '120px', 
                        height: '120px', 
                        backgroundColor: 'var(--hover-bg)', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        marginBottom: '24px'
                    }}>
                        <SubscriptionsIcon size={60} style={{ opacity: 0.5 }} />
                    </div>
                    <h2 style={{ fontSize: '20px', marginBottom: '12px' }}>Don't miss new videos</h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto', lineHeight: '1.5' }}>
                        Subscribe to your favorite channels to see the latest videos right here.
                    </p>
                    <button 
                        onClick={() => window.location.href = '/'}
                        style={{
                            marginTop: '24px',
                            padding: '10px 20px',
                            borderRadius: '24px',
                            border: '1px solid var(--border)',
                            backgroundColor: 'transparent',
                            color: '#065fd4',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        Go to Home
                    </button>
                </div>
            )}
        </div>
    );
}

export default Subscriptions;
