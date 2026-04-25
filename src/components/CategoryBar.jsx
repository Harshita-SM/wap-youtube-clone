import React from 'react';
import { useApp } from '../AppContext';

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
    const { showToast } = useApp();

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        if (category !== "All") {
            showToast(`Filtered by ${category}`);
        }
    };

    return (
        <nav className='category-bar'>
            {categories.map((category) => (
                <button 
                    key={category} 
                    // Add 'active' class if this category is the currently selected one
                    className={`category-button ${activeCategory === category ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(category)}
                >
                    {category}
                </button>
            ))}
        </nav>
    );
}

export default CategoryBar;
