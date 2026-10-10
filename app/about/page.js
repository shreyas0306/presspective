import Masthead from '../../components/Masthead';

// Mock data for the editorial board
const TEAM_MEMBERS = [
    {
        name: 'Vatshala Raj',
        role: 'Editor-in-Chief',
        email: 'vatshala@bharaticollege.du.ac.in',
        bio: 'Undergraduate journalism student leading the digital transition of the department journal and coordinating editorial strategy.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop'
    },
    {
        name: 'Ananya Sharma',
        role: 'Senior Editor',
        email: 'ananya.s@bharaticollege.du.ac.in',
        bio: 'Specializes in research-based investigative reporting and managing weekly column submissions.',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop'
    },
    {
        name: 'Rohan Verma',
        role: 'Campus Life Correspondent',
        email: 'rohan.v@bharaticollege.du.ac.in',
        bio: 'Focuses on event logistics, student spotlights, and coordinating media coverage for Journउtsav.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop'
    }
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-stone-50 text-stone-900 font-sans pb-20">
            <Masthead />

            <main className="max-w-5xl mx-auto px-6 mt-16">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold font-serif text-black mb-6 tracking-tight">
                        The Editorial Board
                    </h1>
                    <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
                        We are the student-led publication of the Bharati College Journalism Department, dedicated to bringing campus news, cultural critiques, and investigative research to the student body.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {TEAM_MEMBERS.map((member, idx) => (
                        <div key={idx} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-24 h-24 rounded-full overflow-hidden mb-6 mx-auto border-4 border-stone-50">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="text-center">
                                <h3 className="text-xl font-bold text-black mb-1 font-serif">{member.name}</h3>
                                <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-4">
                                    {member.role}
                                </p>
                                <p className="text-sm text-stone-600 leading-relaxed mb-6">
                                    {member.bio}
                                </p>
                                <a
                                    href={`mailto:${member.email}`}
                                    className="inline-block bg-stone-100 text-stone-700 px-4 py-2 rounded-lg text-xs font-medium hover:bg-stone-200 hover:text-black transition-colors"
                                >
                                    ✉️ {member.email}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}