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

    const [watchLater, setWatchLater] = useState(() => {
        const saved = localStorage.getItem('yt_watch_later');
        return saved ? JSON.parse(saved) : [];
    });

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('yt_theme') || 'light';
    });

    const [toast, setToast] = useState(null);

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

    useEffect(() => {
        localStorage.setItem('yt_watch_later', JSON.stringify(watchLater));
    }, [watchLater]);

    useEffect(() => {
        localStorage.setItem('yt_theme', theme);
        document.body.className = theme === 'dark' ? 'dark-theme' : '';
    }, [theme]);

    /**
     * Logic for Toasts
     */
    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    /**
     * Logic for Liked Videos
     */
    const toggleLike = (video) => {
        setLikedVideos(prev => {
            const isLiked = prev.find(v => v.id === video.id);
            if (isLiked) {
                showToast("Removed from liked videos");
                return prev.filter(v => v.id !== video.id);
            } else {
                showToast("Added to liked videos");
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
                showToast(`Unsubscribed from ${channelName}`);
                return prev.filter(name => name !== channelName);
            } else {
                showToast(`Subscribed to ${channelName}`);
                return [...prev, channelName];
            }
        });
    };

    /**
     * Logic for Watch Later
     */
    const toggleWatchLater = (video) => {
        setWatchLater(prev => {
            const exists = prev.find(v => v.id === video.id);
            if (exists) {
                showToast("Removed from Watch later");
                return prev.filter(v => v.id !== video.id);
            } else {
                showToast("Added to Watch later");
                return [video, ...prev];
            }
        });
    };

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const value = {
        likedVideos,
        history,
        subscriptions,
        watchLater,
        theme,
        toast,
        toggleLike,
        addToHistory,
        toggleSubscription,
        toggleWatchLater,
        toggleTheme,
        isLiked: (videoId) => likedVideos.some(v => v.id === videoId),
        isSubscribed: (channelName) => subscriptions.includes(channelName),
        isWatchLater: (videoId) => watchLater.some(v => v.id === videoId)
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
