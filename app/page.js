'use client';

import { useState, useEffect } from 'react';
// IMPORT THE DATABASE INSTEAD OF THE FAKE DATA
import { supabase } from '../lib/supabase';
import Masthead from '../components/Masthead';
import SearchBar from '../components/SearchBar';
import ArticleCard from '../components/ArticleCard';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // USE-EFFECT FIRES WHEN THE PAGE LOADS TO FETCH THE DATA
  useEffect(() => {
    async function fetchArticles() {
      // The (*, comments(*)) tells Supabase to grab the article AND all attached comments
      const { data, error } = await supabase
        .from('articles')
        .select('*, comments(*)')
        .order('date', { ascending: false });

      if (data) {
        // Map over the data to ensure the comments array exists and is formatted for our UI
        const formattedData = data.map(article => ({
          ...article,
          isLiked: false,
          comments: article.comments ? article.comments.map(c => c.text) : []
        }));
        setArticles(formattedData);
      }
    }

    fetchArticles();
  }, []);

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleLike = async (id) => {
    // 1. Optimistic UI: Update the screen instantly so it feels blazing fast
    setArticles(prev =>
      prev.map(item => {
        if (item.id === id && !item.isLiked) {
          return { ...item, likes: item.likes + 1, isLiked: true };
        }
        return item;
      })
    );

    // 2. Tell Supabase to run that +1 function we made in SQL
    await supabase.rpc('increment_like', { row_id: id });
  };

  const addComment = async (id, text) => {
    // 1. Optimistic UI: Show the comment on the screen immediately
    setArticles(prev =>
      prev.map(item => {
        if (item.id === id) {
          return { ...item, comments: [...item.comments, text] };
        }
        return item;
      })
    );

    // 2. Save it to the Supabase database
    const { error } = await supabase
      .from('comments')
      .insert([{ article_id: id, text: text }]);

    if (error) {
      console.error("Error saving comment:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-stone-100 to-amber-50/30 text-stone-900 font-sans">
      <Masthead />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <div className="grid gap-6 md:grid-cols-2">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                toggleLike={toggleLike}
                addComment={addComment}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-neutral-500">
              No articles found matching "{searchQuery}"
            </div>
          )}
        </div>
      </main>
    </div>
  );
}