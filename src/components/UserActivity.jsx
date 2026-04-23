import React, { useState, useMemo, useCallback } from 'react';
import { useApp } from '../AppContext';
import { HistoryIcon, ThumbsUpIcon, WatchLaterIcon, TrendingIcon } from './YouTubeIcons';

/**
 * UserActivity Component
 * Displays comprehensive user engagement statistics and activity insights
 * Shows viewing patterns, engagement metrics, and personalized recommendations
 */
function UserActivity() {
    const { history, likedVideos, watchLater, subscriptions } = useApp();
    const [timeFilter, setTimeFilter] = useState('all'); // 'week', 'month', 'all'
    const [activityTab, setActivityTab] = useState('overview'); // 'overview', 'timeline', 'insights'

    // Calculate activity metrics
    const metrics = useMemo(() => {
        const filterByTime = (items) => {
            if (timeFilter === 'all') return items;
            
            const cutoffDate = new Date();
            if (timeFilter === 'week') {
                cutoffDate.setDate(cutoffDate.getDate() - 7);
            } else if (timeFilter === 'month') {
                cutoffDate.setMonth(cutoffDate.getMonth() - 1);
            }
            
            return items.filter(item => new Date(item.addedAt || item.uploadedAt) >= cutoffDate);
        };

        const filteredHistory = filterByTime(history);
        const filteredLikes = filterByTime(likedVideos);
        const filteredWatchLater = filterByTime(watchLater);

        // Calculate time spent watching (assuming average 5 min per video)
        const timeSpentMinutes = filteredHistory.length * 5;
        const timeSpentHours = Math.floor(timeSpentMinutes / 60);

        // Find most watched category
        const categories = filteredHistory.map(v => v.category || 'Other');
        const categoryCount = {};
        categories.forEach(cat => {
            categoryCount[cat] = (categoryCount[cat] || 0) + 1;
        });
        const mostWatchedCategory = Object.keys(categoryCount).length > 0 
            ? Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0][0]
            : 'None';

        // Calculate engagement rate
        const engagementRate = filteredHistory.length > 0 
            ? Math.round((filteredLikes.length / filteredHistory.length) * 100)
            : 0;

        // Get most active time
        const dayOfWeek = new Date().toLocaleDateString('en-US', { weekday: 'long' });

        return {
            videosWatched: filteredHistory.length,
            videosLiked: filteredLikes.length,
            savedForLater: filteredWatchLater.length,
            timeSpentHours,
            timeSpentMinutes,
            engagementRate,
            subscriptions: subscriptions.length,
            mostWatchedCategory,
            lastWatchedTime: filteredHistory.length > 0 ? new Date(filteredHistory[0].addedAt || filteredHistory[0].uploadedAt) : null,
            currentDay: dayOfWeek
        };
    }, [history, likedVideos, watchLater, subscriptions, timeFilter]);

    // Get activity timeline
    const activityTimeline = useMemo(() => {
        const events = [];
        
        history.forEach(video => {
            events.push({
                type: 'watched',
                video: video.title,
                channel: video.channelName,
                date: new Date(video.addedAt || video.uploadedAt),
                icon: 'play'
            });
        });

        likedVideos.forEach(video => {
            events.push({
                type: 'liked',
                video: video.title,
                channel: video.channelName,
                date: new Date(video.addedAt || video.uploadedAt),
                icon: 'like'
            });
        });

        watchLater.forEach(video => {
            events.push({
                type: 'saved',
                video: video.title,
                channel: video.channelName,
                date: new Date(video.addedAt || video.uploadedAt),
                icon: 'save'
            });
        });

        return events
            .sort((a, b) => b.date - a.date)
            .slice(0, 10); // Show last 10 activities
    }, [history, likedVideos, watchLater]);

    // Get insights
    const insights = useMemo(() => {
        const tips = [];

        if (metrics.engagementRate > 50) {
            tips.push({
                type: 'positive',
                text: '🎉 Great engagement! You\'re really enjoying content!'
            });
        }

        if (metrics.videosWatched > 20) {
            tips.push({
                type: 'positive',
                text: '🔥 You\'re very active! Watch out for binge-watching!'
            });
        }

        if (metrics.savedForLater > 10) {
            tips.push({
                type: 'info',
                text: '📋 You have ' + metrics.savedForLater + ' videos saved. Time to watch them?'
            });
        }

        if (metrics.subscriptions < 5 && metrics.videosWatched > 10) {
            tips.push({
                type: 'suggestion',
                text: '⭐ Subscribe to your favorite channels to stay updated!'
            });
        }

        if (metrics.mostWatchedCategory !== 'None') {
            tips.push({
                type: 'info',
                text: `👀 Your favorite category: ${metrics.mostWatchedCategory}`
            });
        }

        return tips.length > 0 ? tips : [
            {
                type: 'info',
                text: 'Start watching videos to get personalized insights!'
            }
        ];
    }, [metrics]);

    const handleTimeFilterChange = useCallback((filter) => {
        setTimeFilter(filter);
    }, []);

    const handleTabChange = useCallback((tab) => {
        setActivityTab(tab);
    }, []);

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
            {/* Header */}
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Your Activity</h1>
                <p style={{ color: 'var(--text)', fontSize: '14px', margin: 0 }}>
                    Track your viewing habits and engagement
                </p>
            </div>

            {/* Time Filter Tabs */}
            <div style={{ 
                display: 'flex', 
                gap: '12px', 
                marginBottom: '24px',
                borderBottom: '1px solid var(--border)',
                paddingBottom: '12px'
            }}>
                {['week', 'month', 'all'].map(filter => (
                    <button
                        key={filter}
                        onClick={() => handleTimeFilterChange(filter)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '20px',
                            border: timeFilter === filter ? '2px solid var(--accent)' : '1px solid var(--border)',
                            backgroundColor: timeFilter === filter ? 'var(--accent-bg)' : 'transparent',
                            color: timeFilter === filter ? 'var(--accent)' : 'var(--text)',
                            fontSize: '13px',
                            fontWeight: timeFilter === filter ? '600' : '500',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            textTransform: 'capitalize'
                        }}
                    >
                        Last {filter === 'all' ? 'All Time' : filter}
                    </button>
                ))}
            </div>

            {/* Activity Tabs */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                {['overview', 'timeline', 'insights'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => handleTabChange(tab)}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '20px',
                            border: activityTab === tab ? '2px solid var(--accent)' : '1px solid var(--border)',
                            backgroundColor: activityTab === tab ? 'var(--accent-bg)' : 'transparent',
                            color: activityTab === tab ? 'var(--accent)' : 'var(--text)',
                            fontSize: '14px',
                            fontWeight: activityTab === tab ? '600' : '500',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            textTransform: 'capitalize'
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Overview Tab */}
            {activityTab === 'overview' && (
                <div>
                    {/* Stats Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '16px',
                        marginBottom: '32px'
                    }}>
                        {/* Videos Watched Card */}
                        <div style={{
                            padding: '20px',
                            borderRadius: '12px',
                            backgroundColor: 'var(--code-bg)',
                            border: '1px solid var(--border)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}>
                            <HistoryIcon size={32} />
                            <div>
                                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                    {metrics.videosWatched}
                                </div>
                                <div style={{ fontSize: '12px', color: 'var(--text)' }}>
                                    Videos Watched
                                </div>
                            </div>
                        </div>

                        {/* Videos Liked Card */}
                        <div style={{
                            padding: '20px',
                            borderRadius: '12px',
                            backgroundColor: 'var(--code-bg)',
                            border: '1px solid var(--border)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}>
                            <ThumbsUpIcon size={32} />
                            <div>
                                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                    {metrics.videosLiked}
                                </div>
                                <div style={{ fontSize: '12px', color: 'var(--text)' }}>
                                    Videos Liked
                                </div>
                            </div>
                        </div>

                        {/* Saved for Later Card */}
                        <div style={{
                            padding: '20px',
                            borderRadius: '12px',
                            backgroundColor: 'var(--code-bg)',
                            border: '1px solid var(--border)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}>
                            <WatchLaterIcon size={32} />
                            <div>
                                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                    {metrics.savedForLater}
                                </div>
                                <div style={{ fontSize: '12px', color: 'var(--text)' }}>
                                    Saved Videos
                                </div>
                            </div>
                        </div>

                        {/* Engagement Card */}
                        <div style={{
                            padding: '20px',
                            borderRadius: '12px',
                            backgroundColor: 'var(--code-bg)',
                            border: '1px solid var(--border)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}>
                            <TrendingIcon size={32} />
                            <div>
                                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                    {metrics.engagementRate}%
                                </div>
                                <div style={{ fontSize: '12px', color: 'var(--text)' }}>
                                    Engagement Rate
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div style={{
                        padding: '20px',
                        borderRadius: '12px',
                        backgroundColor: 'var(--code-bg)',
                        border: '1px solid var(--border)'
                    }}>
                        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px' }}>Summary</h3>
                        <div style={{ display: 'grid', gap: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Time Spent Watching:</span>
                                <strong>{metrics.timeSpentHours}h {metrics.timeSpentMinutes % 60}m</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Subscribed Channels:</span>
                                <strong>{metrics.subscriptions}</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Favorite Category:</span>
                                <strong>{metrics.mostWatchedCategory}</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Most Active:</span>
                                <strong>{metrics.currentDay}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Timeline Tab */}
            {activityTab === 'timeline' && (
                <div>
                    <div style={{ fontSize: '14px', color: 'var(--text)', marginBottom: '16px' }}>
                        {activityTimeline.length} recent activities
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {activityTimeline.length > 0 ? (
                            activityTimeline.map((event, idx) => (
                                <div key={idx} style={{
                                    padding: '16px',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border)',
                                    backgroundColor: 'var(--code-bg)'
                                }}>
                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            backgroundColor: event.type === 'watched' ? '#4CAF50' 
                                                           : event.type === 'liked' ? '#FF6B6B'
                                                           : '#2196F3',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            fontSize: '14px',
                                            flexShrink: 0
                                        }}>
                                            {event.icon === 'play' ? '▶' : event.icon === 'like' ? '👍' : '💾'}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: '500', marginBottom: '4px' }}>
                                                {event.type === 'watched' ? 'Watched' : event.type === 'liked' ? 'Liked' : 'Saved'}
                                                {' '}<span style={{ color: 'var(--text)' }}>{event.video}</span>
                                            </div>
                                            <div style={{ fontSize: '12px', color: 'var(--text)' }}>
                                                {event.channel} • {event.date.toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text)' }}>
                                No activities yet
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Insights Tab */}
            {activityTab === 'insights' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {insights.map((insight, idx) => (
                        <div key={idx} style={{
                            padding: '16px',
                            borderRadius: '8px',
                            border: `2px solid ${
                                insight.type === 'positive' ? '#4CAF50'
                                : insight.type === 'suggestion' ? '#FF9800'
                                : '#2196F3'
                            }`,
                            backgroundColor: insight.type === 'positive' ? 'rgba(76, 175, 80, 0.1)'
                                            : insight.type === 'suggestion' ? 'rgba(255, 152, 0, 0.1)'
                                            : 'rgba(33, 150, 243, 0.1)',
                            color: insight.type === 'positive' ? '#4CAF50'
                                 : insight.type === 'suggestion' ? '#FF9800'
                                 : '#2196F3'
                        }}>
                            {insight.text}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default UserActivity;
