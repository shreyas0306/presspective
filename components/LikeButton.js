export default function LikeButton({ likes, isLiked, onToggle }) {
    return (
        <button
            onClick={onToggle}
            className={`flex items-center gap-1.5 font-medium transition ${isLiked ? 'text-red-500' : 'text-neutral-500 hover:text-neutral-800'
                }`}
        >
            ❤️ {likes} {likes === 1 ? 'Like' : 'Likes'}
        </button>
    );
}