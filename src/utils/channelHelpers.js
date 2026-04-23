/**
 * Channel Helper Utilities
 * Provides utility functions for channel-related operations
 */

/**
 * Calculate channel statistics from video data
 * @param {Array} videos - Array of video objects
 * @param {string} channelName - Name of the channel
 * @returns {Object} - Channel statistics
 */
export function getChannelStatistics(videos, channelName) {
    const channelVideos = videos.filter(v => v.channelName === channelName);
    
    const totalViews = channelVideos.reduce((sum, v) => {
        const views = parseInt(v.views) || 0;
        return sum + views;
    }, 0);

    const totalLikes = channelVideos.reduce((sum, v) => {
        const likes = parseInt(v.likes) || 0;
        return sum + likes;
    }, 0);

    const averageViews = channelVideos.length > 0 ? Math.floor(totalViews / channelVideos.length) : 0;

    return {
        videoCount: channelVideos.length,
        totalViews,
        totalLikes,
        averageViews,
        averageLikes: channelVideos.length > 0 ? Math.floor(totalLikes / channelVideos.length) : 0
    };
}

/**
 * Get most popular videos from a channel
 * @param {Array} videos - Array of video objects
 * @param {string} channelName - Name of the channel
 * @param {number} limit - Maximum videos to return
 * @returns {Array} - Sorted videos
 */
export function getMostPopularVideos(videos, channelName, limit = 6) {
    return videos
        .filter(v => v.channelName === channelName)
        .sort((a, b) => (parseInt(b.views) || 0) - (parseInt(a.views) || 0))
        .slice(0, limit);
}

/**
 * Get recent videos from a channel
 * @param {Array} videos - Array of video objects
 * @param {string} channelName - Name of the channel
 * @param {number} limit - Maximum videos to return
 * @returns {Array} - Sorted videos by date (newest first)
 */
export function getRecentVideos(videos, channelName, limit = 6) {
    return videos
        .filter(v => v.channelName === channelName)
        .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
        .slice(0, limit);
}

/**
 * Group channel videos by category
 * @param {Array} videos - Array of video objects
 * @param {string} channelName - Name of the channel
 * @returns {Object} - Videos grouped by category
 */
export function groupVideosByCategory(videos, channelName) {
    const channelVideos = videos.filter(v => v.channelName === channelName);
    
    return channelVideos.reduce((acc, video) => {
        const category = video.category || 'Other';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(video);
        return acc;
    }, {});
}

/**
 * Get engagement rate for channel
 * Calculates average likes per view
 * @param {Array} videos - Array of video objects
 * @param {string} channelName - Name of the channel
 * @returns {number} - Engagement rate (0-100)
 */
export function getEngagementRate(videos, channelName) {
    const channelVideos = videos.filter(v => v.channelName === channelName);
    
    if (channelVideos.length === 0) return 0;
    
    const totalViews = channelVideos.reduce((sum, v) => sum + (parseInt(v.views) || 0), 0);
    const totalLikes = channelVideos.reduce((sum, v) => sum + (parseInt(v.likes) || 0), 0);
    
    if (totalViews === 0) return 0;
    
    return ((totalLikes / totalViews) * 100).toFixed(2);
}

/**
 * Search videos within a channel
 * @param {Array} videos - Array of video objects
 * @param {string} channelName - Name of the channel
 * @param {string} searchQuery - Search query
 * @returns {Array} - Filtered videos
 */
export function searchChannelVideos(videos, channelName, searchQuery) {
    const lowerQuery = searchQuery.toLowerCase();
    
    return videos.filter(v => 
        v.channelName === channelName && (
            v.title.toLowerCase().includes(lowerQuery) ||
            (v.description && v.description.toLowerCase().includes(lowerQuery))
        )
    );
}

/**
 * Sort channel videos
 * @param {Array} videos - Array of video objects
 * @param {string} channelName - Name of the channel
 * @param {string} sortBy - Sort criteria ('views', 'date', 'title', 'likes')
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} - Sorted videos
 */
export function sortChannelVideos(videos, channelName, sortBy = 'date', order = 'desc') {
    const channelVideos = videos.filter(v => v.channelName === channelName);
    
    const sorted = [...channelVideos].sort((a, b) => {
        let compareA, compareB;
        
        switch (sortBy) {
            case 'views':
                compareA = parseInt(a.views) || 0;
                compareB = parseInt(b.views) || 0;
                break;
            case 'likes':
                compareA = parseInt(a.likes) || 0;
                compareB = parseInt(b.likes) || 0;
                break;
            case 'title':
                compareA = a.title.toLowerCase();
                compareB = b.title.toLowerCase();
                break;
            case 'date':
            default:
                compareA = new Date(a.uploadedAt);
                compareB = new Date(b.uploadedAt);
                break;
        }
        
        if (order === 'asc') {
            return compareA > compareB ? 1 : -1;
        } else {
            return compareA < compareB ? 1 : -1;
        }
    });
    
    return sorted;
}

/**
 * Paginate channel videos
 * @param {Array} videos - Array of video objects
 * @param {string} channelName - Name of the channel
 * @param {number} page - Page number (1-indexed)
 * @param {number} pageSize - Items per page
 * @returns {Object} - Pagination result
 */
export function paginateChannelVideos(videos, channelName, page = 1, pageSize = 12) {
    const channelVideos = videos.filter(v => v.channelName === channelName);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    return {
        videos: channelVideos.slice(startIndex, endIndex),
        currentPage: page,
        totalPages: Math.ceil(channelVideos.length / pageSize),
        totalItems: channelVideos.length,
        hasNextPage: page < Math.ceil(channelVideos.length / pageSize),
        hasPreviousPage: page > 1
    };
}

/**
 * Get trending videos from a channel (by upload date and views)
 * @param {Array} videos - Array of video objects
 * @param {string} channelName - Name of the channel
 * @param {number} daysLimit - Show videos uploaded in last N days
 * @param {number} limit - Maximum videos to return
 * @returns {Array} - Trending videos
 */
export function getTrendingChannelVideos(videos, channelName, daysLimit = 30, limit = 6) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysLimit);
    
    return videos
        .filter(v => 
            v.channelName === channelName && 
            new Date(v.uploadedAt) >= cutoffDate
        )
        .sort((a, b) => (parseInt(b.views) || 0) - (parseInt(a.views) || 0))
        .slice(0, limit);
}

/**
 * Get channel performance summary
 * @param {Array} videos - Array of video objects
 * @param {string} channelName - Name of the channel
 * @returns {Object} - Comprehensive performance metrics
 */
export function getChannelPerformanceSummary(videos, channelName) {
    const stats = getChannelStatistics(videos, channelName);
    const engagementRate = getEngagementRate(videos, channelName);
    const recentVideos = getRecentVideos(videos, channelName, 1);
    const mostPopularVideos = getMostPopularVideos(videos, channelName, 1);
    
    return {
        ...stats,
        engagementRate: `${engagementRate}%`,
        lastUpload: recentVideos.length > 0 ? recentVideos[0].uploadedAt : null,
        topVideo: mostPopularVideos.length > 0 ? mostPopularVideos[0].title : null,
        topVideoViews: mostPopularVideos.length > 0 ? mostPopularVideos[0].views : 0
    };
}

export default {
    getChannelStatistics,
    getMostPopularVideos,
    getRecentVideos,
    groupVideosByCategory,
    getEngagementRate,
    searchChannelVideos,
    sortChannelVideos,
    paginateChannelVideos,
    getTrendingChannelVideos,
    getChannelPerformanceSummary
};
