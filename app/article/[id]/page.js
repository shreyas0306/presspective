import { supabase } from '../../../lib/supabase';
import Masthead from '../../../components/Masthead';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// This tells Next.js not to cache this page statically, 
// ensuring the like count is always fresh when you click an article
export const revalidate = 0;

export default async function ArticlePage({ params }) {
    const resolvedParams = await params;

    // Fetch the single article from Supabase where the ID matches the URL
    const { data: article, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', resolvedParams.id)
        .single();

    // If Supabase throws an error or can't find the ID, show the 404 page
    if (error || !article) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white text-neutral-900 font-sans">
            <Masthead />

            {/* Full-width Edge-to-Edge Hero Image */}
            <div className="w-full h-[40vh] sm:h-[55vh] bg-neutral-200">
                <img
                    src={article.image_url || `https://images.unsplash.com/photo-1495020685536-1509e3424ff6?q=80&w=2000&auto=format&fit=crop`}
                    alt="Article Cover"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Centered Article Content */}
            <main className="max-w-3xl mx-auto px-6 py-12 md:py-16">
                <Link href="/" className="inline-block text-sm font-medium text-neutral-500 hover:text-black mb-8 transition-colors">
                    ← Back to Articles
                </Link>

                <div className="mb-10">
                    <div className="flex items-center gap-3 text-sm text-neutral-500 mb-6">
                        <span className="font-bold text-black uppercase tracking-widest text-xs">
                            {article.category || 'Editorial'}
                        </span>
                        <span>•</span>
                        <span>{article.date || 'Recent'}</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 text-black leading-tight">
                        {article.title}
                    </h1>

                    <div className="flex items-center gap-4 border-b border-neutral-200 pb-8">
                        <div className="w-12 h-12 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center font-bold text-neutral-500 text-lg">
                            {article.author ? article.author.charAt(0) : '?'}
                        </div>
                        <div>
                            <div className="font-semibold text-black">{article.author || 'Anonymous'}</div>
                            <div className="text-neutral-500 text-sm">Bharati College Editorial Board</div>
                        </div>
                    </div>
                </div>

                {/* The whitespace-pre-wrap class ensures that paragraph breaks from the database actually render */}
                <article className="prose prose-lg md:prose-xl text-neutral-800 leading-relaxed font-serif whitespace-pre-wrap">
                    {article.content}
                </article>

                <div className="mt-16 pt-8 border-t border-neutral-200 flex items-center gap-4">
                    <button className="flex items-center gap-2 bg-white border border-neutral-300 px-5 py-2.5 rounded-full font-medium text-black hover:bg-neutral-50 transition cursor-default">
                        ❤️ {article.likes || 0} Likes
                    </button>
                </div>
            </main>
        </div>
    );
}