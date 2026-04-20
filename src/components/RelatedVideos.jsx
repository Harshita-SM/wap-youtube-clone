import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockVideos } from '../data/mockData';

function RelatedVideos() {
    const { id } = useParams();
    const relatedVideos = mockVideos.filter(video => video.id !== id);

    return (
        <div className='related-videos'>
            {relatedVideos.map((video) => (
                <Link key={video.id} to={`/watch/${video.id}`} className='related-video-link'>
                    <div className='related-video-item'>
                        <div className='related-video-thumbnail-container'>
                            <img 
                                src={video.thumbnail} 
                                alt={video.title} 
                                className='related-video-thumbnail' 
                            />
                        </div>
                        
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
