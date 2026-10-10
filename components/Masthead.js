'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Masthead() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/70 backdrop-blur-md shadow-sm">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* LEFT SIDE: Logo and About Link */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="group flex items-center gap-3">
                        <div className="w-12 h-12 md:w-16 md:h-16 relative flex-shrink-0 rounded-md overflow-hidden shadow-sm">
                            <img
                                src="/logo.jpg"
                                alt="Pratyaksh Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <h1 className="text-xl font-extrabold tracking-tight text-stone-900 group-hover:text-amber-800 transition-colors m-0 p-0">
                            Pratyaksh
                        </h1>
                    </Link>

                    <Link href="/about" className="hidden sm:block text-sm font-medium text-stone-500 hover:text-black transition-colors">
                        About the Board
                    </Link>
                </div>

                {/* RIGHT SIDE: Auth Buttons */}
                <div className="flex items-center gap-4">
                    {!user && (
                        <Link href="/login" className="text-xs text-stone-300 hover:text-stone-500 transition">
                            Admin
                        </Link>
                    )}

                    {user && (
                        <>
                            <button
                                onClick={handleLogout}
                                className="text-sm font-medium text-stone-500 hover:text-red-600 transition"
                            >
                                Sign Out
                            </button>
                            <Link href="/submit" className="bg-gradient-to-r from-stone-900 to-black text-white px-5 py-2 rounded-full text-sm font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                                + Submit
                            </Link>
                        </>
                    )}
                </div>

            </div>
        </header>
    );
}