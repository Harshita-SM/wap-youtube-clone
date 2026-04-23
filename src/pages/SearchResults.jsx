import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { mockVideos } from '../data/videos';
import { FilterIcon } from '../components/YouTubeIcons';

/**
 * Search Results Page - Now with Advanced Filtering & Sorting!
 */
function SearchResults() {
    const { query } = useParams();
    const decodedQuery = decodeURIComponent(query || '').toLowerCase();

    // Filtering State
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState('relevance'); // relevance, date, views
    const [filterCategory, setFilterCategory] = useState('All');

    // Get unique categories for the filter dropdown
    const categories = ['All', ...new Set(mockVideos.map(v => v.category))];

    // Helper to parse views for sorting (e.g., "1.2M views" -> 1200000)
    const parseViews = (viewStr) => {
        if (!viewStr) return 0;
        const num = parseFloat(viewStr);
        if (viewStr.includes('M')) return num * 1000000;
        if (viewStr.includes('K')) return num * 1000;
        return num;
    };

    // Helper to parse dates for sorting (simulated for mock strings)
    const parseDate = (dateStr) => {
        if (!dateStr || dateStr === 'Streaming Now') return Date.now();
        const num = parseInt(dateStr);
        if (dateStr.includes('hour')) return Date.now() - (num * 3600000);
        if (dateStr.includes('day')) return Date.now() - (num * 86400000);
        if (dateStr.includes('week')) return Date.now() - (num * 604800000);
        if (dateStr.includes('month')) return Date.now() - (num * 2592000000);
        if (dateStr.includes('year')) return Date.now() - (num * 31536000000);
        return 0;
    };

    // Processed Results (Memoized for performance)
    const processedResults = useMemo(() => {
        let results = mockVideos.filter(video => 
            video.title.toLowerCase().includes(decodedQuery) || 
            video.description.toLowerCase().includes(decodedQuery)
        );

        // Apply Category Filter
        if (filterCategory !== 'All') {
            results = results.filter(v => v.category === filterCategory);
        }

        // Apply Sorting
        if (sortBy === 'views') {
            results.sort((a, b) => parseViews(b.views) - parseViews(a.views));
        } else if (sortBy === 'date') {
            results.sort((a, b) => parseDate(b.uploadDate) - parseDate(a.uploadDate));
        }

        return results;
    }, [decodedQuery, filterCategory, sortBy]);

    return (
        <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    Results for: "{decodedQuery}"
                </h2>
                
                <button 
                    onClick={() => setShowFilters(!showFilters)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        border: 'none',
                        backgroundColor: showFilters ? '#f2f2f2' : 'transparent',
                        cursor: 'pointer',
                        fontWeight: '500'
                    }}
                >
                    <FilterIcon size={20} />
                    <span>Filters</span>
                </button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
                <div style={{ 
                    display: 'flex', 
                    gap: '48px', 
                    padding: '24px 0', 
                    borderBottom: '1px solid var(--border)',
                    marginBottom: '24px'
                }}>
                    {/* Sort By Column */}
                    <div>
                        <h4 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: '#606060', marginBottom: '16px' }}>
                            Sort By
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {['relevance', 'date', 'views'].map(option => (
                                <span 
                                    key={option}
                                    onClick={() => setSortBy(option)}
                                    style={{ 
                                        fontSize: '14px', 
                                        color: sortBy === option ? 'var(--text)' : '#606060',
                                        fontWeight: sortBy === option ? '600' : 'normal',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Category Column */}
                    <div>
                        <h4 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: '#606060', marginBottom: '16px' }}>
                            Category
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {categories.map(cat => (
                                <span 
                                    key={cat}
                                    onClick={() => setFilterCategory(cat)}
                                    style={{ 
                                        fontSize: '14px', 
                                        color: filterCategory === cat ? 'var(--text)' : '#606060',
                                        fontWeight: filterCategory === cat ? '600' : 'normal',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {processedResults.length > 0 ? (
                <div className="video-grid" style={{ marginTop: '24px' }}>
                    {processedResults.map(video => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '80px 0' }}>
                    <p style={{ color: 'var(--text-secondary)' }}>No results found matching your criteria.</p>
                </div>
            )}
        </div>
    );
}

export default SearchResults;
