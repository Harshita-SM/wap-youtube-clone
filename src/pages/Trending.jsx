import React, { useState, useMemo, useCallback } from 'react';
import VideoCard from '../components/VideoCard';
import { TrendingIcon } from '../components/YouTubeIcons';
import { mockVideos } from '../data/videos';
import { getTrendingVideos } from '../utils/videoAnalytics';

/**
 * Trending Page Component
 * Displays trending videos with advanced filtering and analytics
 */
function Trending() {
    const [filterType, setFilterType] = useState('all'); // all, viral, popular, trending
    const [sortBy, setSortBy] = useState('trending'); // trending, views, recent

    // Get trending videos
    const trendingVideos = useMemo(() => {
        return getTrendingVideos(mockVideos, 50);
    }, []);

    // Categorize videos by performance (Viral, Popular, Trending)
    const categorizeVideos = (videos) => {
        const categories = {
            viral: [],
            popular: [],
            trending: [],
            average: []
        };

        videos.forEach(video => {
            const views = parseInt(video.views) || 0;
            const likes = parseInt(video.likes) || 0;
            const engagementRate = views > 0 ? (likes / views) * 100 : 0;

            if (engagementRate >= 10 && views > 100000) {
                categories.viral.push(video);
            } else if (engagementRate >= 5 && views > 50000) {
                categories.popular.push(video);
            } else if (engagementRate >= 3 && views > 10000) {
                categories.trending.push(video);
            } else {
                categories.average.push(video);
            }
        });

        return categories;
    };

    const engagementTiers = useMemo(() => {
        return categorizeVideos(mockVideos);
    }, []);

    // Filter and sort videos
    const filteredVideos = useMemo(() => {
        let filtered = mockVideos;

        // Apply filter
        if (filterType === 'viral') {
            filtered = engagementTiers.viral;
        } else if (filterType === 'popular') {
            filtered = engagementTiers.popular;
        } else if (filterType === 'trending') {
            filtered = trendingVideos;
        }

        // Apply sorting
        filtered = [...filtered].sort((a, b) => {
            switch (sortBy) {
                case 'views':
                    return parseInt(b.views) - parseInt(a.views);
                case 'recent':
                    return new Date(b.uploadedAt) - new Date(a.uploadedAt);
                case 'trending':
                default:
                    const aViews = parseInt(a.views) || 0;
                    const bViews = parseInt(b.views) || 0;
                    const aLikes = parseInt(a.likes) || 0;
                    const bLikes = parseInt(b.likes) || 0;
                    return (bViews * 0.6 + bLikes * 0.4) - (aViews * 0.6 + aLikes * 0.4);
            }
        });

        return filtered;
    }, [filterType, sortBy, trendingVideos, engagementTiers]);

    // Get statistics
    const stats = useMemo(() => {
        return {
            viral: engagementTiers.viral.length,
            popular: engagementTiers.popular.length,
            trending: trendingVideos.length,
            all: mockVideos.length
        };
    }, [engagementTiers, trendingVideos]);

    const handleFilterChange = useCallback((type) => {
        setFilterType(type);
    }, []);

    const handleSortChange = useCallback((sort) => {
        setSortBy(sort);
    }, []);

    return (
        <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <TrendingIcon size={32} />
                    <h1 style={{ fontSize: '28px', margin: 0 }}>Trending Now</h1>
                </div>
                <p style={{ color: 'var(--text)', fontSize: '14px', margin: 0 }}>
                    Watch what's viral, popular, and trending across the platform
                </p>
            </div>

            {/* Stats Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '12px',
                marginBottom: '32px'
            }}>
                <div style={{
                    padding: '16px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--code-bg)',
                    border: '1px solid var(--border)',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
                        {stats.viral}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text)' }}>🔥 Viral Videos</div>
                </div>

                <div style={{
                    padding: '16px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--code-bg)',
                    border: '1px solid var(--border)',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
                        {stats.popular}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text)' }}>⭐ Popular</div>
                </div>

                <div style={{
                    padding: '16px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--code-bg)',
                    border: '1px solid var(--border)',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
                        {stats.trending}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text)' }}>🚀 Trending</div>
                </div>

                <div style={{
                    padding: '16px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--code-bg)',
                    border: '1px solid var(--border)',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
                        {stats.all}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text)' }}>📺 Total Videos</div>
                </div>
            </div>

            {/* Filter Controls */}
            <div style={{ marginBottom: '24px' }}>
                {/* Category Filters */}
                <div style={{ marginBottom: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {['all', 'viral', 'popular', 'trending'].map(type => (
                        <button
                            key={type}
                            onClick={() => handleFilterChange(type)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '20px',
                                border: filterType === type ? '2px solid var(--accent)' : '1px solid var(--border)',
                                backgroundColor: filterType === type ? 'var(--accent-bg)' : 'transparent',
                                color: filterType === type ? 'var(--accent)' : 'var(--text)',
                                fontSize: '13px',
                                fontWeight: filterType === type ? '600' : '500',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                textTransform: 'capitalize'
                            }}
                        >
                            {type === 'all' ? 'All Videos' : type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Sort Options */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '13px', fontWeight: '500' }}>Sort:</span>
                    {['trending', 'views', 'recent'].map(sort => (
                        <button
                            key={sort}
                            onClick={() => handleSortChange(sort)}
                            style={{
                                padding: '6px 12px',
                                borderRadius: '16px',
                                border: sortBy === sort ? '2px solid var(--accent)' : '1px solid var(--border)',
                                backgroundColor: sortBy === sort ? 'var(--accent-bg)' : 'transparent',
                                color: sortBy === sort ? 'var(--accent)' : 'var(--text)',
                                fontSize: '12px',
                                fontWeight: sortBy === sort ? '600' : '500',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                textTransform: 'capitalize'
                            }}
                        >
                            {sort}
                        </button>
                    ))}
                </div>
            </div>

            {/* Videos Grid */}
            {filteredVideos.length > 0 ? (
                <div className="video-grid">
                    {filteredVideos.map((video, idx) => (
                        <div key={`${video.id}-${idx}`}>
                            <VideoCard
                                video={video}
                                onClick={(id) => window.location.href = `/watch/${id}`}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{
                    textAlign: 'center',
                    padding: '60px 24px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--code-bg)'
                }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎬</div>
                    <h2 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>No videos found</h2>
                    <p style={{ color: 'var(--text)', margin: 0 }}>
                        Try changing your filters
                    </p>
                </div>
            )}
        </div>
    );
}

export default Trending;
