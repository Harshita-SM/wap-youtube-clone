import React, { useState } from 'react';
import CategoryBar from '../components/CategoryBar';
import VideoCard from '../components/VideoCard';
import { mockVideos } from '../data/videos';

function Home() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredVideos = activeCategory === "All" 
        ? mockVideos 
        : mockVideos.filter(video => video.category === activeCategory);

    return (
        <div className="home-page">
            <CategoryBar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            <div className="video-grid">
                {filteredVideos.map(video => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
        </div>
    );
}

export default Home;
