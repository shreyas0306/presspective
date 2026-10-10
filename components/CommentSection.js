import { useState } from 'react';

export default function CommentSection({ comments, onAddComment }) {
    const [newComment, setNewComment] = useState('');

    const handlePost = () => {
        if (!newComment.trim()) return;
        onAddComment(newComment);
        setNewComment('');
    };

    return (
        <div className="mt-4 pt-4 border-t bg-neutral-50 p-3 rounded-lg">
            <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Comments</h4>

            <div className="space-y-2 mb-3">
                {comments.length === 0 ? (
                    <p className="text-xs text-neutral-400 italic">No comments yet. Be the first!</p>
                ) : (
                    comments.map((comment, idx) => (
                        <p key={idx} className="text-xs bg-white p-2 rounded border border-neutral-200 text-black">
                            {comment}
                        </p>
                    ))
                )}
            </div>

            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-black text-black"
                />
                <button
                    onClick={handlePost}
                    className="bg-black text-white text-xs px-3 py-2 rounded font-medium hover:bg-neutral-800"
                >
                    Post
                </button>
            </div>
        </div>
    );
}