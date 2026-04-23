import React from 'react';

const SkeletonCard = () => {
    return (
        <div className="video-card skeleton" style={{ gap: '12px' }}>
            <div style={{ 
                width: '100%', 
                aspectRatio: '16/9', 
                borderRadius: '12px', 
                backgroundColor: 'var(--hover-bg)',
                animation: 'pulse 1.5s infinite' 
            }}></div>
            <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: '50%', 
                    backgroundColor: 'var(--hover-bg)',
                    animation: 'pulse 1.5s infinite'
                }}></div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ 
                        width: '90%', 
                        height: '16px', 
                        borderRadius: '4px', 
                        backgroundColor: 'var(--hover-bg)',
                        animation: 'pulse 1.5s infinite'
                    }}></div>
                    <div style={{ 
                        width: '60%', 
                        height: '12px', 
                        borderRadius: '4px', 
                        backgroundColor: 'var(--hover-bg)',
                        animation: 'pulse 1.5s infinite'
                    }}></div>
                </div>
            </div>
            <style>
                {`
                    @keyframes pulse {
                        0% { opacity: 0.6; }
                        50% { opacity: 1; }
                        100% { opacity: 0.6; }
                    }
                `}
            </style>
        </div>
    );
};

export default SkeletonCard;
