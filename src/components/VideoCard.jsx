import React, { memo, useCallback } from 'react';

/**
 * VideoCard Component - Memoized for performance
 * Displays a single video item on the homepage grid.
 *
 * Props:
 *  - video: {
 *      id: string,
 *      title: string,
 *      thumbnail: string,
 *      channelName: string,
 *      channelAvatar: string,
 *      views: string,
 *      uploadedAt: string,
 *      duration: string
 *    }
 *  - onClick: function called when the card is clicked
 */
function VideoCard({ video, onClick }) {
    const {
        id = '',
        title = 'Untitled Video',
        thumbnail = 'https://via.placeholder.com/320x180?text=No+Thumbnail',
        channelName = 'Unknown Channel',
        channelAvatar = 'https://via.placeholder.com/36x36?text=?',
        views = '0 views',
        uploadedAt = 'some time ago',
        duration = '0:00',
    } = video || {};

    const handleClick = useCallback(() => {
        if (onClick && id) {
            onClick(id);
        }
    }, [onClick, id]);

    const handleKeyPress = useCallback((e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
        }
    }, [handleClick]);

    return (
        <article 
            className="video-card" 
            onClick={handleClick}
            onKeyPress={handleKeyPress}
            role="button" 
            tabIndex={0}
            aria-label={`${title} by ${channelName}`}
        >
            {/* Thumbnail */}
            <div className="video-thumbnail-wrapper">
                <img
                    src={thumbnail}
                    alt={`Thumbnail for ${title}`}
                    className="video-thumbnail"
                    loading="lazy"
                />
                <span className="video-duration" aria-label={`Duration: ${duration}`}>
                    {duration}
                </span>
            </div>

            {/* Video Info */}
            <div className="video-info">
                {/* Channel Avatar */}
                <img
                    src={channelAvatar}
                    alt={`${channelName} avatar`}
                    className="channel-avatar"
                    loading="lazy"
                />

                {/* Text Details */}
                <div className="video-details">
                    <h3 className="video-title">{title}</h3>
                    <p className="video-channel">{channelName}</p>
                    <p className="video-meta">
                        {views} <span aria-hidden="true">&bull;</span> {uploadedAt}
                    </p>
                </div>
            </div>
        </article>
    );
}

export default memo(VideoCard);
