/**
 * formatters.js — Utility helpers for displaying numbers and dates
 * in a YouTube-style human-readable format.
 *
 * Why this file matters:
 * - Keeps formatting logic in ONE place. If YouTube changes "1.2M" to "1,200,000"
 *   you only fix it here, not in 10 different components.
 * - Makes components cleaner — they just call formatViews(video.views) instead
 *   of embedding complex logic inline.
 */

// ─────────────────────────────────────────────
// 1. VIEW COUNT  →  "1.2M views", "450K views"
// ─────────────────────────────────────────────
/**
 * Converts a raw number into a compact, YouTube-style string.
 * @param {number|string} count - e.g. 1200000 or "1200000"
 * @returns {string}            - e.g. "1.2M views"
 */
export function formatViews(count) {
    const num = typeof count === 'string' ? parseInt(count.replace(/,/g, ''), 10) : count;
    if (isNaN(num)) return count; // already a formatted string — pass through
    if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1).replace(/\.0$/, '')}B views`;
    if (num >= 1_000_000)     return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, '')}M views`;
    if (num >= 1_000)         return `${(num / 1_000).toFixed(0)}K views`;
    return `${num} views`;
}

// ─────────────────────────────────────────────
// 2. LIKE / COMMENT COUNT  →  "12K", "1.2M"
// ─────────────────────────────────────────────
/**
 * Compact number without the "views" suffix — used for likes, comments, subs.
 * @param {number} count
 * @returns {string}
 */
export function formatCount(count) {
    if (typeof count !== 'number' || isNaN(count)) return String(count);
    if (count >= 1_000_000_000) return `${(count / 1_000_000_000).toFixed(1).replace(/\.0$/, '')}B`;
    if (count >= 1_000_000)     return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
    if (count >= 1_000)         return `${(count / 1_000).toFixed(0)}K`;
    return String(count);
}

// ─────────────────────────────────────────────
// 3. UPLOAD DATE  →  "2 days ago", "3 weeks ago"
// ─────────────────────────────────────────────
/**
 * Converts a Date object or ISO date string into a relative time string.
 * Falls back gracefully if the input is already a human string like "2 days ago".
 * @param {Date|string} date
 * @returns {string}
 */
export function formatUploadDate(date) {
    // If it's already a relative string (from mock data), return as-is
    if (typeof date === 'string' && !/^\d{4}-\d{2}-\d{2}/.test(date)) {
        return date;
    }

    const now = new Date();
    const then = new Date(date);
    const diffMs = now - then;

    if (isNaN(diffMs)) return String(date);

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours   = Math.floor(minutes / 60);
    const days    = Math.floor(hours / 24);
    const weeks   = Math.floor(days / 7);
    const months  = Math.floor(days / 30);
    const years   = Math.floor(days / 365);

    if (years  >= 1) return `${years} year${years > 1 ? 's' : ''} ago`;
    if (months >= 1) return `${months} month${months > 1 ? 's' : ''} ago`;
    if (weeks  >= 1) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    if (days   >= 1) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours  >= 1) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes >= 1) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'just now';
}

// ─────────────────────────────────────────────
// 4. DURATION  →  "4:32", "1:02:15"
// ─────────────────────────────────────────────
/**
 * Converts total seconds into a YouTube-style MM:SS or H:MM:SS string.
 * @param {number} totalSeconds
 * @returns {string}  e.g. "4:32" or "1:02:15"
 */
export function formatDuration(totalSeconds) {
    if (typeof totalSeconds !== 'number' || isNaN(totalSeconds)) return '0:00';
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = Math.floor(totalSeconds % 60);

    const mm = String(m).padStart(h > 0 ? 2 : 1, '0');
    const ss = String(s).padStart(2, '0');

    return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}
