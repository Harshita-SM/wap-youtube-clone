import React from 'react';
import { mockShorts } from '../data/shortsData';
import { ThumbsUpIcon, ThumbsDownIcon, MessageSquareIcon, ShareIcon, MoreIcon } from '../components/YouTubeIcons';

/**
 * Shorts Component - High performance vertical scroll feed
 */
function Shorts() {
    return (
        <div className="shorts-container" style={{ 
            height: 'calc(100vh - 64px)', 
            overflowY: 'scroll', 
            scrollSnapType: 'y mandatory',
            backgroundColor: '#000'
        }}>
            {mockShorts.map((short) => (
                <div key={short.id} className="short-video-wrapper" style={{
                    height: 'calc(100vh - 64px)',
                    scrollSnapAlign: 'start',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative'
                }}>
                    {/* Video / Image Background */}
                    <div style={{
                        height: '90%',
                        aspectRatio: '9/16',
                        backgroundColor: '#1a1a1a',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        position: 'relative'
                    }}>
                        <img 
                            src={short.videoUrl} 
                            alt={short.title} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />

                        {/* Text Overlay */}
                        <div style={{
                            position: 'absolute',
                            bottom: '0',
                            left: '0',
                            right: '0',
                            padding: '20px',
                            background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                            color: '#fff'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#fff' }}></div>
                                <span style={{ fontWeight: 'bold' }}>@{short.channelName}</span>
                                <button style={{ 
                                    backgroundColor: '#fff', 
                                    color: '#000', 
                                    border: 'none', 
                                    padding: '6px 12px', 
                                    borderRadius: '18px',
                                    fontSize: '12px',
                                    fontWeight: 'bold'
                                }}>Subscribe</button>
                            </div>
                            <p style={{ margin: 0, fontSize: '14px' }}>{short.title}</p>
                        </div>
                    </div>

                    {/* Sidebar Actions */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        padding: '0 20px',
                        color: '#fff',
                        alignItems: 'center'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ backgroundColor: '#333', padding: '12px', borderRadius: '50%', cursor: 'pointer' }}>
                                <ThumbsUpIcon size={24} />
                            </div>
                            <span style={{ fontSize: '12px' }}>{short.likes}</span>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ backgroundColor: '#333', padding: '12px', borderRadius: '50%', cursor: 'pointer' }}>
                                <ThumbsDownIcon size={24} />
                            </div>
                            <span style={{ fontSize: '12px' }}>Dislike</span>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ backgroundColor: '#333', padding: '12px', borderRadius: '50%', cursor: 'pointer' }}>
                                <MessageSquareIcon size={24} />
                            </div>
                            <span style={{ fontSize: '12px' }}>{short.comments}</span>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ backgroundColor: '#333', padding: '12px', borderRadius: '50%', cursor: 'pointer' }}>
                                <ShareIcon size={24} />
                            </div>
                            <span style={{ fontSize: '12px' }}>Share</span>
                        </div>
                        <div style={{ cursor: 'pointer' }}>
                            <MoreIcon size={24} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Shorts;
