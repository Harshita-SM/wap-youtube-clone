import React, { useState, useCallback, useMemo } from 'react';

const CATEGORIES = [
  "All",
  "Gaming",
  "Music",
  "Live",
  "Sports",
  "News",
  "Learning",
  "Fashion & Beauty",
  "Podcasts",
  "Comedy",
  "Technology"
];

function CategoryBar() {
    const [active, setActive] = useState("All");

    const handleCategoryClick = useCallback((category) => {
        setActive(category);
        // TODO: Filter videos by category
    }, []);

    const categoryButtons = useMemo(() => (
        CATEGORIES.map((category) => (
            <button 
                key={category}
                className={`category-button ${active === category ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category)}
                aria-pressed={active === category}
            >
                {category}
            </button>
        ))
    ), [active, handleCategoryClick]);

    return (
        <nav className='category-bar' role="tablist" aria-label="Video categories">
            {categoryButtons}
        </nav>
    );
}

export default CategoryBar;
