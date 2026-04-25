/**
 * Video Analytics & Recommendations Engine
 * Provides advanced analytics and smart recommendation algorithms
 */

/**
 * Calculate video performance score
 * Based on views, likes, and engagement metrics
 * @param {Object} video - Video object
 * @returns {number} - Performance score (0-100)
 */
export function calculateVideoScore(video) {
    const views = parseInt(video.views) || 0;
    const likes = parseInt(video.likes) || 0;
    
    // Normalize views (0-50 points)
    const viewScore = Math.min((views / 10000) * 50, 50);
    
    // Engagement rate (0-50 points)
    const engagementRate = views > 0 ? (likes / views) * 100 : 0;
    const engagementScore = Math.min((engagementRate / 10) * 50, 50);
    
    return Math.round(viewScore + engagementScore);
}

/**
 * Get trending videos across platform
 * @param {Array} videos - All available videos
 * @param {number} limit - Number of trending videos to return
 * @returns {Array} - Trending videos sorted by score
 */
export function getTrendingVideos(videos, limit = 10) {
    return videos
        .map(video => ({
            ...video,
            score: calculateVideoScore(video)
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(({ score, ...video }) => video);
}

/**
 * Get personalized recommendations for a user
 * @param {Array} videos - All available videos
 * @param {Array} watchHistory - User's watch history
 * @param {Array} likedVideos - User's liked videos
 * @param {number} limit - Number of recommendations
 * @returns {Array} - Recommended videos
 */
export function getPersonalizedRecommendations(videos, watchHistory, likedVideos, limit = 10) {
    if (watchHistory.length === 0 && likedVideos.length === 0) {
        return getTrendingVideos(videos, limit);
    }

    // Get preferred categories from watch history and likes
    const preferredCategories = {};
    
    [...watchHistory, ...likedVideos].forEach(video => {
        const category = video.category || 'Other';
        preferredCategories[category] = (preferredCategories[category] || 0) + 1;
    });

    // Get preferred channels
    const preferredChannels = {};
    
    [...watchHistory, ...likedVideos].forEach(video => {
        const channel = video.channelName;
        preferredChannels[channel] = (preferredChannels[channel] || 0) + 1;
    });

    // Get watched and liked video IDs
    const watchedIds = new Set(watchHistory.map(v => v.id));
    const likedIds = new Set(likedVideos.map(v => v.id));

    // Score and rank videos
    const recommendations = videos
        .filter(video => !watchedIds.has(video.id))
        .map(video => {
            let score = calculateVideoScore(video);
            
            // Boost score if in preferred category
            if (preferredCategories[video.category]) {
                score += preferredCategories[video.category] * 10;
            }
            
            // Boost score if from preferred channel
            if (preferredChannels[video.channelName]) {
                score += preferredChannels[video.channelName] * 15;
            }
            
            // Slight boost for recent videos
            const daysOld = Math.floor((Date.now() - new Date(video.uploadedAt)) / (1000 * 60 * 60 * 24));
            if (daysOld < 7) score += 20;
            else if (daysOld < 30) score += 10;
            
            return { ...video, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(({ score, ...video }) => video);

    return recommendations;
}

/**
 * Get "Watch if You Liked" recommendations
 * @param {Object} video - Reference video
 * @param {Array} allVideos - All available videos
 * @param {number} limit - Number of recommendations
 * @returns {Array} - Similar videos
 */
export function getSimilarVideos(video, allVideos, limit = 6) {
    if (!video) return [];

    return allVideos
        .filter(v => v.id !== video.id && v.category === video.category)
        .map(v => ({
            ...v,
            similarity: calculateSimilarity(video, v)
        }))
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, limit)
        .map(({ similarity, ...v }) => v);
}

/**
 * Calculate similarity between two videos
 * @param {Object} video1 - First video
 * @param {Object} video2 - Second video
 * @returns {number} - Similarity score (0-100)
 */
function calculateSimilarity(video1, video2) {
    let score = 0;

    // Same category (30 points)
    if (video1.category === video2.category) score += 30;

    // Same channel (25 points)
    if (video1.channelName === video2.channelName) score += 25;

    // Similar view count (25 points)
    const viewRatio = Math.min(
        parseInt(video1.views) / parseInt(video2.views),
        parseInt(video2.views) / parseInt(video1.views)
    );
    if (viewRatio > 0.5) score += 25;

    // Recent upload (20 points)
    const daysOld = Math.abs(
        new Date(video1.uploadedAt) - new Date(video2.uploadedAt)
    ) / (1000 * 60 * 60 * 24);
    if (daysOld < 30) score += 20;

    return Math.round(score);
}

/**
 * Analyze user viewing patterns
 * @param {Array} watchHistory - User's watch history
 * @returns {Object} - Viewing pattern analysis
 */
export function analyzeViewingPatterns(watchHistory) {
    if (watchHistory.length === 0) {
        return {
            averageSessionLength: 0,
            mostActiveHour: null,
            categoryDistribution: {},
            bingingTendency: 'low',
            preferredChannels: []
        };
    }

    // Category distribution
    const categoryDistribution = {};
    watchHistory.forEach(video => {
        const cat = video.category || 'Other';
        categoryDistribution[cat] = (categoryDistribution[cat] || 0) + 1;
    });

    // Channel preferences
    const channelCount = {};
    watchHistory.forEach(video => {
        channelCount[video.channelName] = (channelCount[video.channelName] || 0) + 1;
    });
    
    const preferredChannels = Object.entries(channelCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, count]) => ({ name, videoCount: count }));

    // Binging tendency
    let consecutiveWatches = 1;
    let maxConsecutive = 1;
    for (let i = 1; i < watchHistory.length; i++) {
        const timeDiff = Math.abs(
            new Date(watchHistory[i - 1].uploadedAt) - new Date(watchHistory[i].uploadedAt)
        ) / (1000 * 60); // in minutes
        
        if (timeDiff < 60) {
            consecutiveWatches++;
            maxConsecutive = Math.max(maxConsecutive, consecutiveWatches);
        } else {
            consecutiveWatches = 1;
        }
    }

    let bingingTendency = 'low';
    if (maxConsecutive > 5) bingingTendency = 'high';
    else if (maxConsecutive > 3) bingingTendency = 'medium';

    const averageSessionLength = (watchHistory.length * 5) / Math.max(1, Math.ceil(watchHistory.length / 3));

    return {
        averageSessionLength: Math.round(averageSessionLength),
        mostActiveHour: null, // Would need timestamp data
        categoryDistribution,
        bingingTendency,
        preferredChannels,
        totalVideosWatched: watchHistory.length
    };
}

/**
 * Get trending categories
 * @param {Array} videos - All available videos
 * @param {number} limit - Number of categories to return
 * @returns {Array} - Trending categories with counts
 */
export function getTrendingCategories(videos, limit = 5) {
    const categoryScores = {};
    
    videos.forEach(video => {
        const category = video.category || 'Other';
        const score = calculateVideoScore(video);
        
        if (!categoryScores[category]) {
            categoryScores[category] = { totalScore: 0, count: 0 };
        }
        
        categoryScores[category].totalScore += score;
        categoryScores[category].count += 1;
    });

    return Object.entries(categoryScores)
        .map(([category, data]) => ({
            category,
            averageScore: Math.round(data.totalScore / data.count),
            videoCount: data.count
        }))
        .sort((a, b) => b.averageScore - a.averageScore)
        .slice(0, limit);
}

/**
 * Find breakthrough videos (high quality, low views)
 * Great for recommendations
 * @param {Array} videos - All available videos
 * @param {number} limit - Number of videos
 * @returns {Array} - Breakthrough videos
 */
export function findBreakthroughVideos(videos, limit = 5) {
    const avgViews = videos.reduce((sum, v) => sum + (parseInt(v.views) || 0), 0) / videos.length;
    
    return videos
        .filter(v => {
            const views = parseInt(v.views) || 0;
            const score = calculateVideoScore(v);
            return views < avgViews * 0.5 && score > 50; // Low views, high quality
        })
        .sort((a, b) => calculateVideoScore(b) - calculateVideoScore(a))
        .slice(0, limit);
}

/**
 * Get video feed for homepage
 * Combines trending, personalized, and category-based videos
 * @param {Array} allVideos - All available videos
 * @param {Array} watchHistory - User's watch history
 * @param {Array} likedVideos - User's liked videos
 * @param {number} limit - Total videos to return
 * @returns {Array} - Mixed feed of videos
 */
export function getHomeFeed(allVideos, watchHistory, likedVideos, limit = 20) {
    const feed = new Map();
    const addToFeed = (videos, weight = 1) => {
        videos.forEach((video, idx) => {
            const key = video.id;
            if (!feed.has(key)) {
                feed.set(key, { video, score: (limit - idx) * weight });
            } else {
                feed.get(key).score += (limit - idx) * weight;
            }
        });
    };

    // Add personalized recommendations (highest weight)
    addToFeed(getPersonalizedRecommendations(allVideos, watchHistory, likedVideos, Math.floor(limit * 0.4)), 3);
    
    // Add trending videos (medium weight)
    addToFeed(getTrendingVideos(allVideos, Math.floor(limit * 0.3)), 2);
    
    // Add similar to liked videos (medium weight)
    if (likedVideos.length > 0) {
        const similarVideos = [];
        likedVideos.slice(0, 3).forEach(video => {
            similarVideos.push(...getSimilarVideos(video, allVideos, 3));
        });
        addToFeed(similarVideos, 1.5);
    }

    return Array.from(feed.values())
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(item => item.video);
}

export default {
    calculateVideoScore,
    getTrendingVideos,
    getPersonalizedRecommendations,
    getSimilarVideos,
    analyzeViewingPatterns,
    getTrendingCategories,
    findBreakthroughVideos,
    getHomeFeed
};
