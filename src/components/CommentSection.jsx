import React from 'react';

// Some mock comments for display
const mockComments = [
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
    return (
        <div className="comment-section">
            <h3 className="comment-count">{mockComments.length} Comments</h3>
            
            {/* Input area to add a new comment */}
            <div className="add-comment-container">
                <img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=50&q=80" 
                    alt="User" 
                    className="user-avatar" 
                />
                <input type="text" placeholder="Add a comment..." className="comment-input" />
            </div>

            {/* List of comments */}
            <div className="comments-list">
                {mockComments.map(comment => (
                    <div key={comment.id} className="comment-item">
                        <img src={comment.avatar} alt={comment.user} className="comment-avatar" />
                        <div className="comment-content">
                            <div className="comment-header">
                                <span className="comment-user">{comment.user}</span>
                                <span className="comment-date">{comment.date}</span>
                            </div>
                            <p className="comment-text">{comment.text}</p>
                            <div className="comment-actions">
                                <span>👍 {comment.likes}</span>
                                <span>👎</span>
                                <span className="reply-btn">REPLY</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CommentSection;
