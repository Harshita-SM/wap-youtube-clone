import React, { useState } from 'react';
import { ThumbsUpIcon, ThumbsDownIcon } from './YouTubeIcons';

// Some mock comments for display
const initialComments = [
    {
        id: 1,
        user: "Shubham Beta",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=50&q=80",
        text: "Great tutorial! This helped me understand React much better.",
        likes: 124,
        date: "2 days ago"
    },
    {
        id: 2,
        user: "Manoj Ahire",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=50&q=80",
        text: "Could you please make a video on Redux Toolkit?",
        likes: 45,
        date: "1 day ago"
    },
    {
        id: 3,
        user: "Harshita",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=50&q=80",
        text: "The quality of these videos is amazing. Subscribed!",
        likes: 89,
        date: "5 hours ago"
    }
];

function CommentSection() {
    const [comments, setComments] = useState(initialComments);
    const [inputText, setInputText] = useState('');

    const handleAddComment = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const newComment = {
            id: Date.now(),
            user: "You",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=50&q=80",
            text: inputText,
            likes: 0,
            date: "Just now"
        };

        // Add the new comment to the top of the feed
        setComments([newComment, ...comments]);
        setInputText(''); // Clear input box
    };

    return (
        <div className="comment-section">
            <h3 className="comment-count">{comments.length} Comments</h3>
            
            {/* Input area to add a new comment */}
            <form className="add-comment-container" onSubmit={handleAddComment} style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                <img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=50&q=80" 
                    alt="User" 
                    className="user-avatar" 
                    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                />
                <input 
                    type="text" 
                    placeholder="Add a comment... (Press Enter to post)" 
                    className="comment-input" 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    style={{ flex: 1, border: 'none', borderBottom: '1px solid var(--border)', background: 'transparent', color: 'var(--text)', outline: 'none' }}
                />
            </form>

            {/* List of comments */}
            <div className="comments-list">
                {comments.map(comment => (
                    <div key={comment.id} className="comment-item" style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                        <img src={comment.avatar} alt={comment.user} className="comment-avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                        <div className="comment-content">
                            <div className="comment-header" style={{ marginBottom: '4px' }}>
                                <span className="comment-user" style={{ fontWeight: '500', marginRight: '8px', fontSize: '13px' }}>{comment.user}</span>
                                <span className="comment-date" style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{comment.date}</span>
                            </div>
                            <p className="comment-text" style={{ margin: 0, fontSize: '14px' }}>{comment.text}</p>
                            <div className="comment-actions" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <ThumbsUpIcon size={16} />
                                    <span style={{ fontSize: '12px', color: '#606060' }}>{comment.likes}</span>
                                </div>
                                <ThumbsDownIcon size={16} />
                                <span className="reply-btn" style={{ fontSize: '12px', fontWeight: '500', cursor: 'pointer', marginLeft: '8px' }}>REPLY</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CommentSection;
