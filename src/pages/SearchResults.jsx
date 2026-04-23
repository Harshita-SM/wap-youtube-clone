import React from 'react';
import { useParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { mockVideos } from '../data/videos';

function SearchResults() {
    const { query } = useParams();
    const decodedQuery = decodeURIComponent(query || '').toLowerCase();

    // Filter videos where title or description matches query
    const results = mockVideos.filter(video => 
        video.title.toLowerCase().includes(decodedQuery) || 
        video.description.toLowerCase().includes(decodedQuery)
    );

    return (
        <div style={{ padding: '24px' }}>
            <h2 style={{ marginBottom: '24px' }}>Search Results for: "{decodedQuery}"</h2>
            {results.length > 0 ? (
                <div className="video-grid">
                    {results.map(video => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
}

export default SearchResults;
