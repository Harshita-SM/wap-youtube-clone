
/**
 * YouTube Clone - Video Utilities Module
 * This module provides comprehensive utility functions for video handling,
 * formatting, and data transformation across the application.
 */

/**
 * Format view count to human-readable format
 * @param {number} views - The view count
 * @returns {string} - Formatted view count (e.g., "1.5M", "50K")
 */
export function formatViews(views) {
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + 'M';
  } else if (views >= 1000) {
    return (views / 1000).toFixed(1) + 'K';
  }
  return views.toString();
}

/**
 * Format time duration to readable format
 * @param {number} seconds - Duration in seconds
 * @returns {string} - Formatted duration (e.g., "12:34:56")
 */
export function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Format upload time to relative time format
 * @param {Date|string} uploadDate - The upload date
 * @returns {string} - Relative time (e.g., "2 days ago", "3 hours ago")
 */
export function formatUploadedAt(uploadDate) {
  const date = new Date(uploadDate);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));
  const diffMonths = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30));
  const diffYears = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365));

  if (diffMins < 60) {
    return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  } else if (diffWeeks < 4) {
    return `${diffWeeks} week${diffWeeks !== 1 ? 's' : ''} ago`;
  } else if (diffMonths < 12) {
    return `${diffMonths} month${diffMonths !== 1 ? 's' : ''} ago`;
  } else {
    return `${diffYears} year${diffYears !== 1 ? 's' : ''} ago`;
  }
}

/**
 * Filter videos by category
 * @param {Array} videos - Array of video objects
 * @param {string} category - Category to filter by
 * @returns {Array} - Filtered videos
 */
export function filterVideosByCategory(videos, category) {
  if (category === 'All') return videos;
  return videos.filter(video => video.category === category);
}

/**
 * Search videos by query string
 * @param {Array} videos - Array of video objects
 * @param {string} query - Search query
 * @returns {Array} - Filtered videos matching the query
 */
export function searchVideos(videos, query) {
  const lowerQuery = query.toLowerCase();
  return videos.filter(video =>
    video.title.toLowerCase().includes(lowerQuery) ||
    video.channelName.toLowerCase().includes(lowerQuery) ||
    (video.description && video.description.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Sort videos by different criteria
 * @param {Array} videos - Array of video objects
 * @param {string} sortBy - Sort criteria: 'views', 'date', 'title'
 * @param {string} order - Sort order: 'asc' or 'desc'
 * @returns {Array} - Sorted videos
 */
export function sortVideos(videos, sortBy = 'date', order = 'desc') {
  const sorted = [...videos].sort((a, b) => {
    let compareA, compareB;

    switch (sortBy) {
      case 'views':
        compareA = parseInt(a.views) || 0;
        compareB = parseInt(b.views) || 0;
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
 * Get recommended videos based on current video
 * @param {Object} currentVideo - The current video object
 * @param {Array} allVideos - All available videos
 * @param {number} limit - Number of recommendations to return
 * @returns {Array} - Recommended videos
 */
export function getRecommendedVideos(currentVideo, allVideos, limit = 5) {
  if (!currentVideo) return allVideos.slice(0, limit);

  return allVideos
    .filter(video => video.id !== currentVideo.id)
    .filter(video => video.category === currentVideo.category)
    .slice(0, limit);
}

/**
 * Group videos by category
 * @param {Array} videos - Array of video objects
 * @returns {Object} - Videos grouped by category
 */
export function groupVideosByCategory(videos) {
  return videos.reduce((acc, video) => {
    const category = video.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(video);
    return acc;
  }, {});
}

/**
 * Validate video object structure
 * @param {Object} video - Video object to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export function isValidVideo(video) {
  return (
    video &&
    typeof video === 'object' &&
    video.id &&
    video.title &&
    video.thumbnail &&
    video.channelName &&
    video.views !== undefined &&
    video.uploadedAt
  );
}

/**
 * Get video statistics
 * @param {Array} videos - Array of video objects
 * @returns {Object} - Statistics object with total videos, total views, etc.
 */
export function getVideoStatistics(videos) {
  const validVideos = videos.filter(isValidVideo);
  const totalViews = validVideos.reduce((sum, video) => {
    const views = parseInt(video.views) || 0;
    return sum + views;
  }, 0);

  return {
    totalVideos: validVideos.length,
    totalViews,
    averageViews: validVideos.length > 0 ? Math.floor(totalViews / validVideos.length) : 0,
    categories: new Set(validVideos.map(v => v.category)).size,
  };
}

/**
 * Paginate videos
 * @param {Array} videos - Array of video objects
 * @param {number} page - Page number (1-indexed)
 * @param {number} pageSize - Number of items per page
 * @returns {Object} - Pagination result with videos and metadata
 */
export function paginateVideos(videos, page = 1, pageSize = 12) {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedVideos = videos.slice(startIndex, endIndex);
  const totalPages = Math.ceil(videos.length / pageSize);

  return {
    videos: paginatedVideos,
    currentPage: page,
    totalPages,
    totalItems: videos.length,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}

/**
 * Clone and deep copy video object
 * @param {Object} video - Video object to clone
 * @returns {Object} - Cloned video object
 */
export function cloneVideo(video) {
  return {
    ...video,
    uploadedAt: new Date(video.uploadedAt),
  };
}

export default {
  formatViews,
  formatDuration,
  formatUploadedAt,
  filterVideosByCategory,
  searchVideos,
  sortVideos,
  getRecommendedVideos,
  groupVideosByCategory,
  isValidVideo,
  getVideoStatistics,
  paginateVideos,
  cloneVideo,
};