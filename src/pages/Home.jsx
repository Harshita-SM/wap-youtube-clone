import React from 'react';
import CategoryBar from '../components/CategoryBar';
import VideoCard from '../components/VideoCard';
import { mockVideos } from '../data/mockData';

function Home() {
    return (
        <div className="home-page">
            <CategoryBar />
            <div className="video-grid">
                {mockVideos.map(video => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
        </div>
    );
}

export default Home;
