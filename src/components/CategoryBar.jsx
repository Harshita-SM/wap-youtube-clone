import React from 'react';

// List of categories to display in the bar
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

function CategoryBar({ activeCategory, setActiveCategory }) {

    return (
        <nav className='category-bar'>
            {categories.map((category) => (
                <button 
                    key={category} 
                    // Add 'active' class if this category is the currently selected one
                    className={`category-button ${activeCategory === category ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category)}
                >
                    {category}
                </button>
            ))}
        </nav>
    );
}

export default CategoryBar;
