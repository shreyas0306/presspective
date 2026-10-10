'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SubmitArticle() {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [author, setAuthor] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');

    const [loading, setLoading] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push('/login');
            } else {
                setIsAuthorized(true);
            }
        };
        checkUser();
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let finalImageUrl = '';

        // 1. If an image file was selected, upload it to Supabase Storage first
        if (imageFile) {
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('article-images')
                .upload(fileName, imageFile);

            if (uploadError) {
                console.error('Upload error:', uploadError);
                alert('Failed to upload image.');
                setLoading(false);
                return;
            }

            // 2. Get the public URL of the freshly uploaded image
            const { data } = supabase.storage
                .from('article-images')
                .getPublicUrl(fileName);

            finalImageUrl = data.publicUrl;
        }

        const today = new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        // 3. Save the article text and the new image URL to the database
        const { error } = await supabase.from('articles').insert([
            {
                title,
                category,
                author,
                date: today,
                image_url: finalImageUrl,
                excerpt,
                content,
                likes: 0
            }
        ]);

        if (error) {
            console.error('Error publishing:', error);
            alert('Failed to publish. Check console.');
            setLoading(false);
        } else {
            router.push('/');
        }
    };

    if (!isAuthorized) return null;

    return (
        <div className="min-h-screen bg-stone-50 text-stone-900 font-sans pb-20">
            <header className="bg-white border-b border-stone-200 py-4 px-6 sticky top-0 z-50">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <Link href="/" className="text-sm font-medium text-stone-500 hover:text-black transition">
                        ← Cancel & Return
                    </Link>
                    <div className="font-serif font-bold tracking-tight">New Article</div>
                    <div className="w-20"></div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 mt-10">
                <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-stone-100">

                    <div>
                        <input
                            type="text"
                            required
                            placeholder="Article Headline..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full text-4xl md:text-5xl font-extrabold text-black placeholder-stone-300 focus:outline-none bg-transparent"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-stone-100">
                        <div>
                            <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Author Name</label>
                            <input
                                type="text"
                                required
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Category</label>
                            <input
                                type="text"
                                required
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Upload Cover Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files[0])}
                            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-stone-200 file:text-stone-700 hover:file:bg-stone-300 cursor-pointer"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Short Excerpt</label>
                        <textarea
                            required
                            rows="2"
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Full Article Body</label>
                        <textarea
                            required
                            rows="15"
                            placeholder="Write your story here..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full px-4 py-4 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition font-serif text-lg leading-relaxed whitespace-pre-wrap"
                        />
                    </div>

                    <div className="pt-6 border-t border-stone-100 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-black text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-stone-800 focus:outline-none focus:ring-4 focus:ring-stone-200 transition-all shadow-lg hover:-translate-y-0.5 disabled:opacity-50"
                        >
                            {loading ? 'Publishing...' : 'Publish Article'}
                        </button>
                    </div>

                </form>
            </main>
        </div>
    );
}