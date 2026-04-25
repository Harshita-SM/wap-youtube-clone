import React, { useState, useEffect } from 'react';
import CategoryBar from '../components/CategoryBar';
import ThumbnailVideo from '../components/ThumbnailVideo';
import SkeletonCard from '../components/SkeletonCard';
import { mockVideos } from '../data/videos';

function Home() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 600);
        return () => clearTimeout(timer);
    }, [activeCategory]);

    const filteredVideos = activeCategory === "All" 
        ? mockVideos 
        : mockVideos.filter(video => video.category === activeCategory);

    return (
        <div className="home-page">
            <CategoryBar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            <div className="video-grid">
                {loading ? (
                    Array(12).fill(0).map((_, i) => <SkeletonCard key={i} />)
                ) : (
                    filteredVideos.map(video => (
                        <ThumbnailVideo key={video.id} video={video} />
                    ))
                )}
            </div>
        </div>
    );
}

export default Home;
