import React, { useState, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { mockVideos } from '../data/videos';
import { TrendingIcon, PlaylistsIcon } from '../components/YouTubeIcons';

/**
 * SearchResults Page Component
 * Enhanced with filtering, sorting, and better UX
 */
function SearchResults() {
    const { query } = useParams();
    const decodedQuery = decodeURIComponent(query || '').toLowerCase();
    
    // State for sorting and filtering
    const [sortBy, setSortBy] = useState('relevance');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Get unique categories from results
    const availableCategories = useMemo(() => {
        const categories = new Set(mockVideos.map(v => v.category || 'Other'));
        return ['All', ...Array.from(categories)];
    }, []);

    // Enhanced search and filter logic
    const searchResults = useMemo(() => {
        let filtered = mockVideos.filter(video => 
            video.title.toLowerCase().includes(decodedQuery) || 
            video.description?.toLowerCase().includes(decodedQuery) ||
            video.channelName?.toLowerCase().includes(decodedQuery)
        );

        // Apply category filter
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(video => (video.category || 'Other') === selectedCategory);
        }

        // Apply sorting
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'views':
                    return parseInt(b.views || 0) - parseInt(a.views || 0);
                case 'recent':
                    return new Date(b.uploadedAt) - new Date(a.uploadedAt);
                case 'title':
                    return a.title.localeCompare(b.title);
                case 'relevance':
                default:
                    // Simple relevance: prioritize title matches over description
                    const aTitleMatch = a.title.toLowerCase().includes(decodedQuery) ? 1 : 0;
                    const bTitleMatch = b.title.toLowerCase().includes(decodedQuery) ? 1 : 0;
                    return bTitleMatch - aTitleMatch;
            }
        });

        return filtered;
    }, [decodedQuery, sortBy, selectedCategory]);

    const handleSortChange = useCallback((newSort) => {
        setSortBy(newSort);
    }, []);

    const handleCategoryChange = useCallback((category) => {
        setSelectedCategory(category);
    }, []);

    return (
        <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Header with search query */}
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>
                    Search Results for: <span style={{ color: 'var(--accent)' }}>"{decodedQuery}"</span>
                </h1>
                <p style={{ color: 'var(--text)', fontSize: '14px' }}>
                    Found {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'}
                </p>
            </div>

            {/* Filter and Sort Controls */}
            {searchResults.length > 0 && (
                <div style={{ marginBottom: '24px' }}>
                    {/* Sort Options */}
                    <div style={{ marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <TrendingIcon size={18} />
                            <span style={{ fontSize: '14px', fontWeight: '500' }}>Sort by:</span>
                        </div>
                        {['relevance', 'views', 'recent', 'title'].map(option => (
                            <button
                                key={option}
                                onClick={() => handleSortChange(option)}
                                style={{
                                    padding: '6px 12px',
                                    borderRadius: '20px',
                                    border: sortBy === option ? '1px solid var(--accent)' : '1px solid var(--border)',
                                    backgroundColor: sortBy === option ? 'var(--accent-bg)' : 'transparent',
                                    color: sortBy === option ? 'var(--accent)' : 'var(--text)',
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    textTransform: 'capitalize'
                                }}
                            >
                                {option}
                            </button>
                        ))}
                    </div>

                    {/* Category Filter */}
                    {availableCategories.length > 1 && (
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <PlaylistsIcon size={18} />
                                <span style={{ fontSize: '14px', fontWeight: '500' }}>Category:</span>
                            </div>
                            {availableCategories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => handleCategoryChange(category)}
                                    style={{
                                        padding: '6px 12px',
                                        borderRadius: '20px',
                                        border: selectedCategory === category ? '1px solid var(--accent)' : '1px solid var(--border)',
                                        backgroundColor: selectedCategory === category ? 'var(--accent-bg)' : 'transparent',
                                        color: selectedCategory === category ? 'var(--accent)' : 'var(--text)',
                                        fontSize: '13px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Results Grid or Empty State */}
            {searchResults.length > 0 ? (
                <div className="video-grid">
                    {searchResults.map(video => (
                        <VideoCard 
                            key={video.id} 
                            video={video}
                            onClick={(id) => window.location.href = `/watch/${id}`}
                        />
                    ))}
                </div>
            ) : (
                <div style={{ 
                    textAlign: 'center', 
                    padding: '60px 24px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--code-bg)'
                }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
                    <h2 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>No results found</h2>
                    <p style={{ color: 'var(--text)', margin: 0 }}>
                        Try searching with different keywords or filters
                    </p>
                </div>
            )}
        </div>
    );
}

export default SearchResults;
