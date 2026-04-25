import React, { useState } from 'react';
import { ThumbsUpIcon, ThumbsDownIcon } from './YouTubeIcons';
import { mockComments as initialComments } from '../data/comments';
import { useApp } from '../AppContext';

/**
 * Comment Section Component
 * Manages display of comments and allows users to add new ones.
 */
function CommentSection() {
    const { showToast } = useApp();
    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState('');
    const [isInputFocused, setIsInputFocused] = useState(false);

    // 1. Handle adding a new comment
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const commentObj = {
            id: Date.now(),
            user: "Guest User", // In a real app, this would be the logged-in user
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=50&q=80",
            text: newComment,
            likes: 0,
            date: "Just now"
        };

        setComments([commentObj, ...comments]);
        setNewComment('');
        setIsInputFocused(false);
        showToast("Comment posted!");
    };

    // 2. Handle cancelling
    const handleCancel = () => {
        setNewComment('');
        setIsInputFocused(false);
    };

    return (
        <div className="comment-section">
            <h3 className="comment-count" style={{ fontSize: '20px', margin: '24px 0' }}>
                {comments.length} Comments
            </h3>
            
            {/* Interactive Comment Input */}
            <div className="add-comment-container" style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                <img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=50&q=80" 
                    alt="User" 
                    className="user-avatar" 
                    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                />
                <div style={{ flex: 1 }}>
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            placeholder="Add a comment..." 
                            className="comment-input" 
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onFocus={() => setIsInputFocused(true)}
                            style={{
                                width: '100%',
                                border: 'none',
                                borderBottom: '1px solid var(--border)',
                                padding: '8px 0',
                                outline: 'none',
                                fontSize: '14px',
                                backgroundColor: 'transparent',
                                color: 'inherit'
                            }}
                        />
                        {isInputFocused && (
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                                <button 
                                    type="button" 
                                    onClick={handleCancel}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '500', color: 'inherit' }}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={!newComment.trim()}
                                    style={{ 
                                        backgroundColor: newComment.trim() ? '#065fd4' : 'var(--border)', 
                                        color: newComment.trim() ? 'white' : 'var(--text-secondary)', 
                                        border: 'none', 
                                        padding: '8px 16px', 
                                        borderRadius: '18px', 
                                        cursor: newComment.trim() ? 'pointer' : 'default',
                                        fontSize: '14px',
                                        fontWeight: '500'
                                    }}
                                >
                                    Comment
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>

            {/* List of comments */}
            <div className="comments-list">
                {comments.map(comment => (
                    <div key={comment.id} className="comment-item" style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                        <img src={comment.avatar} alt={comment.user} className="comment-avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                        <div className="comment-content">
                            <div className="comment-header" style={{ marginBottom: '4px' }}>
                                <span className="comment-user" style={{ fontSize: '13px', fontWeight: '500', marginRight: '8px' }}>{comment.user}</span>
                                <span className="comment-date" style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{comment.date}</span>
                            </div>
                            <p className="comment-text" style={{ margin: 0, fontSize: '14px', lineHeight: '1.4' }}>{comment.text}</p>
                            <div className="comment-actions" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }} onClick={() => showToast("Liked comment")}>
                                    <ThumbsUpIcon size={16} />
                                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{comment.likes}</span>
                                </div>
                                <div style={{ cursor: 'pointer' }} onClick={() => showToast("Disliked comment")}>
                                    <ThumbsDownIcon size={16} />
                                </div>
                                <span className="reply-btn" style={{ fontSize: '12px', fontWeight: '500', cursor: 'pointer', marginLeft: '8px' }} onClick={() => showToast("Reply feature coming soon!")}>REPLY</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CommentSection;
