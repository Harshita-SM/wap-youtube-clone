import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockVideos } from '../data/videos';

function RelatedVideos() {
    // Get the current video ID from the URL using useParams
    const { id } = useParams();

    // Filter out the video that is currently playing from the list of related videos
    const relatedVideos = mockVideos.filter(video => video.id !== id);

    return (
        <div className='related-videos-container'>
            {relatedVideos.map((video) => (
                <Link key={video.id} to={`/watch/${video.id}`} className='related-video-link'>
                    <div className='related-video-item'>
                        {/* Thumbnail on the left */}
                        <div className='related-thumbnail-box'>
                            <img 
                                src={video.thumbnail} 
                                alt={video.title} 
                                className='related-video-thumbnail' 
                            />
                        </div>
                        
                        {/* Video Info on the right */}
                        <div className='related-video-info'>
                            <h4 className='related-video-title'>{video.title}</h4>
                            <p className='related-video-channel'>{video.channelName}</p>
                            <div className='related-video-metadata'>
                                <span>{video.views}</span>
                                <span className='metadata-dot'> • </span>
                                <span>{video.uploadDate}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default RelatedVideos;
