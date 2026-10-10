export default function SearchBar({ searchQuery, setSearchQuery }) {
    return (
        <div className="relative mb-10 max-w-2xl mx-auto">
            <input
                type="text"
                placeholder="Search articles by title, author, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-11 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-black shadow-sm text-black"
            />
            <svg
                className="w-5 h-5 absolute left-3.5 top-3.5 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>
    );
}