import Link from 'next/link';
import { useState } from 'react';
import LikeButton from './LikeButton';
import CommentSection from './CommentSection';

export default function ArticleCard({ article, toggleLike, addComment }) {
    const [showComments, setShowComments] = useState(false);

    // Generate a random editorial image based on the article ID
    // Use the database image, or fallback to a default if it's empty
    const imageUrl = article.image_url || `https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=800&sig=${article.id}`;

    return (
        <article className="group bg-white border border-stone-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col">
            {/* Article Image */}
            <Link href={`/article/${article.id}`} className="block h-52 w-full overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                <img
                    src={imageUrl}
                    alt="Article cover"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <span className="absolute bottom-4 left-4 z-20 bg-amber-500/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                    {article.category || 'Editorial'}
                </span>
            </Link>

            <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                    <div className="flex items-center justify-between text-xs text-stone-400 mb-3 font-medium">
                        <span>{article.date}</span>
                    </div>

                    <Link href={`/article/${article.id}`}>
                        <h3 className="text-2xl font-serif font-bold mb-3 text-stone-900 group-hover:text-amber-700 transition-colors leading-snug">
                            {article.title}
                        </h3>
                    </Link>

                    <p className="text-stone-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                        {article.excerpt}
                    </p>
                </div>

                <div>
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-8 h-8 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center font-bold text-stone-500 text-xs">
                            {article.author ? article.author.charAt(0) : '?'}
                        </div>
                        <div className="text-xs text-stone-500">By <span className="font-semibold text-stone-900">{article.author || 'Anonymous'}</span></div>
                    </div>

                    <div className="border-t border-stone-100 pt-4 flex items-center justify-between text-sm">
                        <LikeButton
                            likes={article.likes}
                            isLiked={article.isLiked}
                            onToggle={() => toggleLike(article.id)}
                        />
                        <button
                            onClick={() => setShowComments(!showComments)}
                            className="text-stone-500 hover:text-stone-900 font-medium transition-colors"
                        >
                            💬 {article.comments?.length || 0} Comments
                        </button>
                    </div>

                    {showComments && (
                        <div className="mt-4">
                            <CommentSection
                                comments={article.comments || []}
                                onAddComment={(text) => addComment(article.id, text)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}