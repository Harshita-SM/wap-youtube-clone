import React, { useState } from 'react';

const categories = [
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

    return (
        <div className='category-bar'>
            {categories.map((category, index) => (
                <button 
                    key={index} 
                    className={`category-button ${active === category ? 'active' : ''}`}
                    onClick={() => setActive(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}

export default CategoryBar;
