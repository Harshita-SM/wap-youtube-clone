import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * AppContext - The Central Brain of our YouTube Clone
 * 
 * This file is highly significant because it moves the app from a static UI 
 * to a functional, stateful application. It manages:
 * 1. User History (Automatic tracking of watched videos)
 * 2. Liked Videos (Persistence across pages)
 * 3. Subscriptions (Global channel tracking)
 * 4. LocalStorage Persistence (Data survives page refreshes)
 */

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    // Initialize state from localStorage if available
    const [likedVideos, setLikedVideos] = useState(() => {
        const saved = localStorage.getItem('yt_liked_videos');
        return saved ? JSON.parse(saved) : [];
    });

    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem('yt_history');
        return saved ? JSON.parse(saved) : [];
    });

    const [subscriptions, setSubscriptions] = useState(() => {
        const saved = localStorage.getItem('yt_subscriptions');
        return saved ? JSON.parse(saved) : [];
    });

    // Persistence logic: Save to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('yt_liked_videos', JSON.stringify(likedVideos));
    }, [likedVideos]);

    useEffect(() => {
        localStorage.setItem('yt_history', JSON.stringify(history));
    }, [history]);

    useEffect(() => {
        localStorage.setItem('yt_subscriptions', JSON.stringify(subscriptions));
    }, [subscriptions]);

    /**
     * Logic for Liked Videos
     */
    const toggleLike = (video) => {
        setLikedVideos(prev => {
            const isLiked = prev.find(v => v.id === video.id);
            if (isLiked) {
                return prev.filter(v => v.id !== video.id);
            } else {
                return [video, ...prev];
            }
        });
    };

    /**
     * Logic for Watch History
     * Automatically adds video to history and prevents duplicates
     */
    const addToHistory = (video) => {
        setHistory(prev => {
            const filtered = prev.filter(v => v.id !== video.id);
            return [video, ...filtered].slice(0, 50); // Keep last 50 videos
        });
    };

    /**
     * Logic for Subscriptions
     */
    const toggleSubscription = (channelName) => {
        setSubscriptions(prev => {
            if (prev.includes(channelName)) {
                return prev.filter(name => name !== channelName);
            } else {
                return [...prev, channelName];
            }
        });
    };

    const value = {
        likedVideos,
        history,
        subscriptions,
        toggleLike,
        addToHistory,
        toggleSubscription,
        isLiked: (videoId) => likedVideos.some(v => v.id === videoId),
        isSubscribed: (channelName) => subscriptions.includes(channelName)
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook for easy access to the global state
export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
