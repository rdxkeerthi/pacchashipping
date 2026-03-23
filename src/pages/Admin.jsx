import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLock, FiLogOut, FiMessageSquare, FiFileText, FiPlus, FiX, FiShield, FiCheckCircle, FiActivity, FiTrendingUp, FiUsers, FiLayers, FiCalendar, FiClock, FiStar } from 'react-icons/fi';
import { auth, db } from '../firebase/config';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { ref, onValue, push, set, remove } from 'firebase/database';

// Renders gold half/full stars for a given 0-5 rating
const GoldStars = ({ rating = 5, size = 18 }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        const fill = Math.min(Math.max(rating - (i - 1), 0), 1); // 0..1
        stars.push(
            <span key={i} style={{ position: 'relative', display: 'inline-block', width: size + 2, height: size + 2, flexShrink: 0 }}>
                <FiStar size={size} style={{ color: '#92400e' }} />
                <span style={{ position: 'absolute', top: 0, left: 0, width: fill === 0 ? 0 : fill >= 1 ? '100%' : '50%', overflow: 'hidden', display: 'block', height: '100%' }}>
                    <FiStar size={size} style={{ color: '#FBBF24', fill: '#FBBF24', flexShrink: 0 }} />
                </span>
            </span>
        );
    }
    return <span style={{ display: 'inline-flex', gap: 2, alignItems: 'center', lineHeight: 1 }}>{stars}</span>;
};

// Interactive star picker supporting half-stars
const StarPicker = ({ value, onChange }) => {
    const [hover, setHover] = React.useState(null);
    const displayed = hover ?? value;
    return (
        <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black uppercase text-amber-400 tracking-widest">Customer Rating</span>
            <div className="flex items-center gap-1" onMouseLeave={() => setHover(null)}>
                {[1, 2, 3, 4, 5].map(star => (
                    <span key={star} className="relative cursor-pointer" style={{ width: 32, height: 32 }}
                        onMouseMove={e => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const half = e.clientX - rect.left < rect.width / 2;
                            setHover(half ? star - 0.5 : star);
                        }}
                        onClick={e => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const half = e.clientX - rect.left < rect.width / 2;
                            onChange(half ? star - 0.5 : star);
                        }}
                    >
                        <FiStar size={28} style={{ color: '#a16207', position: 'absolute', top: 2, left: 2 }} />
                        {displayed >= star - 0.5 && (
                            <span style={{ position: 'absolute', top: 2, left: 2, width: displayed >= star ? '100%' : '50%', overflow: 'hidden', display: 'inline-block' }}>
                                <FiStar size={28} style={{ color: '#FBBF24', fill: '#FBBF24' }} />
                            </span>
                        )}
                    </span>
                ))}
                <span className="ml-2 text-amber-400 font-black text-sm">{displayed ?? value} / 5</span>
            </div>
        </div>
    );
};

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('overview'); // overview, queries, news, ecosystem, validation

    const [queriesList, setQueriesList] = useState([]);
    const [newsItems, setNewsItems] = useState([]);
    const [partners, setPartners] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(false);

    const [isAddingNews, setIsAddingNews] = useState(false);
    const [newNews, setNewNews] = useState({ title: '', summary: '', type: 'Company News', imageUrl: '' });
    const [newPartner, setNewPartner] = useState({ name: '', logoUrl: '' });
    const [newTestimonial, setNewTestimonial] = useState({ text: '', author: '', role: '', rating: 5 });
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [selectedInquiry, setSelectedInquiry] = useState(null);

    // Reset filters when changing tabs
    useEffect(() => {
        setSearchQuery('');
        setFilterType('All');
    }, [activeTab]);

    const stats = [
        { label: 'Total Requests', value: queriesList.length, icon: <FiMessageSquare />, color: 'text-blue-400' },
        { label: 'Pending Intel', value: newsItems.length, icon: <FiFileText />, color: 'text-brand-secondary' },
        { label: 'Active Partners', value: partners.length, icon: <FiUsers />, color: 'text-purple-400' },
        { label: 'Completion Rate', value: `${queriesList.length > 0 ? Math.round((queriesList.filter(q => q.status === 'Completed').length / queriesList.length) * 100) : 0}%`, icon: <FiCheckCircle />, color: 'text-green-400' },
    ];

    useEffect(() => {
        if (!isAuthenticated) return;
        setLoading(true);

        let loaded = 0;
        const totalSubs = 4;
        const checkDone = () => { loaded++; if (loaded >= totalSubs) setLoading(false); };

        const unsubQueries = onValue(ref(db, 'queries'), (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                let arr = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key],
                    date: data[key].createdAt ? new Date(data[key].createdAt).toLocaleDateString() : 'Recent'
                }));
                arr.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
                setQueriesList(arr);
            } else {
                setQueriesList([]);
            }
            checkDone();
        });

        const unsubNews = onValue(ref(db, 'news'), (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                let arr = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key],
                    date: data[key].createdAt ? new Date(data[key].createdAt).toLocaleDateString() : 'Recent'
                }));
                arr.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
                setNewsItems(arr);
            } else {
                setNewsItems([]);
            }
            checkDone();
        });

        const unsubPartners = onValue(ref(db, 'partners'), (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                let arr = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                arr.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
                setPartners(arr);
            } else {
                setPartners([]);
            }
            checkDone();
        });

        const unsubTestimonials = onValue(ref(db, 'testimonials'), (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                // Normalize: ensure every testimonial has a numeric rating (backwards compat)
                let arr = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key],
                    rating: typeof data[key].rating === 'number' ? data[key].rating : 5
                }));
                arr.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
                setTestimonials(arr);
            } else {
                setTestimonials([]);
            }
            checkDone();
        });

        return () => {
            unsubQueries();
            unsubNews();
            unsubPartners();
            unsubTestimonials();
        };
    }, [isAuthenticated]); // Subscribe once after login — not on every tab switch


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setIsAuthenticated(true);
        } catch (error) {
            console.error(error);
            alert("Login failed: Check credentials or Firebase Config.");
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
        }
        setIsAuthenticated(false);
    };

    const handleAddNews = async (e) => {
        e.preventDefault();
        if (!auth.currentUser) {
            alert("\u26A0\uFE0F Cannot add data to Firebase while using the dummy demo login. Please create a real user in Firebase Authentication and log in, OR update your Firebase Security Rules.");
            return;
        }
        const newsData = { ...newNews };
        setIsAddingNews(false);
        setNewNews({ title: '', summary: '', type: 'Company News', imageUrl: '' });
        try {
            const newRef = push(ref(db, 'news'));
            await set(newRef, {
                ...newsData,
                createdAt: Date.now()
            });
        } catch (error) {
            alert("Error adding news: " + error.message + "\n\n(Check your Firebase Security Rules)");
        }
    };

    const handleAddPartner = async (e) => {
        e.preventDefault();
        if (!newPartner.name.trim()) return;
        if (!auth.currentUser) {
            alert("\u26A0\uFE0F Cannot add data: You are logged in with the demo fallback account.");
            return;
        }
        const partnerData = { ...newPartner };
        setNewPartner({ name: '', logoUrl: '' });
        try {
            const newRef = push(ref(db, 'partners'));
            await set(newRef, { name: partnerData.name, logoUrl: partnerData.logoUrl || '', createdAt: Date.now() });
        } catch (error) {
            alert("Error adding partner: " + error.message + "\n\n(Check your Firebase Security Rules)");
        }
    };

    const handleAddTestimonial = async (e) => {
        e.preventDefault();
        if (!newTestimonial.text || !newTestimonial.author) return;
        if (!auth.currentUser) {
            alert("\u26A0\uFE0F Cannot add data: You are logged in with the demo fallback account.");
            return;
        }
        const testimonialData = { ...newTestimonial };
        setNewTestimonial({ text: '', author: '', role: '', rating: 5 });
        try {
            const newRef = push(ref(db, 'testimonials'));
            await set(newRef, { ...testimonialData, createdAt: Date.now() });
        } catch (error) {
            alert("Error adding testimonial: " + error.message + "\n\n(Check your Firebase Security Rules)");
        }
    };

    const handleDelete = async (collectionName, id) => {
        if (!window.confirm("Delete this item from " + collectionName + "?")) return;
        if (!auth.currentUser) {
            alert("\u26A0\uFE0F Cannot delete data: You are logged in with the demo fallback account.");
            return;
        }
        try {
            await remove(ref(db, collectionName + "/" + id));
        } catch (error) {
            alert("Error deleting item: " + error.message + "\n\n(Check your Firebase Security Rules)");
        }
    };

    const handleUpdateStatus = async (collectionName, id, newStatus) => {
        if (!auth.currentUser) {
            alert("\u26A0\uFE0F Cannot update data: You are logged in with the demo fallback account.");
            return;
        }
        try {
            await set(ref(db, collectionName + "/" + id + "/status"), newStatus);
        } catch (error) {
            alert("Error updating status: " + error.message);
        }
    };

    const revealVariants = {
        hidden: { opacity: 0, scale: 0.98, y: 30 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
    };

    if (!isAuthenticated) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center relative bg-background overflow-hidden px-6">
                {/* Background ambient light */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-brand-primary/10 to-transparent rounded-full blur-[120px] pointer-events-none"></div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={revealVariants}
                    className="glass-panel p-12 w-full max-w-md relative z-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/5 text-center"
                >
                    <div className="flex justify-center mb-10 relative mx-auto w-fit">
                        <div className="w-20 h-20 rounded-full bg-red-600 shadow-[0_0_30px_rgba(220,38,38,0.6)] flex items-center justify-center animate-pulse border-4 border-white/5">
                            <div className="w-6 h-6 rounded-full bg-white/20 blur-[2px]" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-extrabold text-center mb-2 tracking-tight text-foreground">Enterprise Login</h2>
                    <p className="text-center text-muted-foreground text-xs font-bold uppercase tracking-[0.2em] mb-10">Command Center Authorization</p>

                    <form onSubmit={handleLogin} className="flex flex-col gap-6 text-left">
                        <div className="relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Admin ID / Email"
                                className="w-full px-6 py-5 rounded-2xl glass-input focus:bg-white/5 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/20 transition-all text-foreground outline-none font-medium placeholder-muted-foreground/50"
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Security Key"
                                className="w-full px-6 py-5 rounded-2xl glass-input focus:bg-white/5 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/20 transition-all text-foreground outline-none font-medium placeholder-muted-foreground/50"
                            />
                        </div>
                        <button
                            type="submit"
                            className="mt-6 w-full py-5 rounded-full bg-brand-primary text-background font-bold text-lg hover:bg-brand-secondary hover:text-foreground hover:shadow-neon-brand hover:-translate-y-1 transition-all duration-300"
                        >
                            Establish Connection
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    const filteredQueries = (queriesList || []).filter(q => {
        const matchesSearch = q.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.message?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterType === 'All' || (q.status || 'New') === filterType;
        return matchesSearch && matchesFilter;
    });

    const filteredNews = (newsItems || []).filter(item => {
        const matchesSearch = item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.summary?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterType === 'All' || item.type === filterType;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="w-full min-h-screen pt-32 pb-20 px-6 max-w-[1500px] mx-auto flex flex-col md:flex-row gap-10 bg-background">
            {/* Sidebar */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full md:w-80 glass-panel p-8 flex flex-col h-fit shrink-0 gap-10 shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-white/5 relative z-20"
            >
                <div>
                    <h2 className="text-3xl font-extrabold text-foreground tracking-tight">Operations</h2>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-brand-secondary mt-2">Paccha Command Center</p>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-semibold text-[15px] ${activeTab === 'overview' ? 'glass-panel text-brand-secondary shadow-neon-brand scale-100 border border-brand-primary/20 bg-brand-secondary/20' : 'text-muted-foreground hover:bg-white/5 hover:text-foreground scale-95 origin-left'}`}
                    >
                        <FiActivity className="text-xl" /> Dashboard Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('queries')}
                        className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-semibold text-[15px] ${activeTab === 'queries' ? 'glass-panel text-brand-secondary shadow-neon-brand scale-100 border border-brand-primary/20 bg-brand-secondary/20' : 'text-muted-foreground hover:bg-white/5 hover:text-foreground scale-95 origin-left'}`}
                    >
                        <FiMessageSquare className="text-xl" /> Logistics Requests
                    </button>
                    <button
                        onClick={() => setActiveTab('news')}
                        className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-semibold text-[15px] ${activeTab === 'news' ? 'glass-panel text-brand-secondary shadow-neon-brand scale-100 border border-brand-primary/20 bg-brand-secondary/20' : 'text-muted-foreground hover:bg-white/5 hover:text-foreground scale-95 origin-left'}`}
                    >
                        <FiFileText className="text-xl" /> Global Intelligence
                    </button>
                    <button
                        onClick={() => setActiveTab('ecosystem')}
                        className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-semibold text-[15px] ${activeTab === 'ecosystem' ? 'glass-panel text-brand-secondary shadow-neon-brand scale-100 border border-brand-primary/20 bg-brand-secondary/20' : 'text-muted-foreground hover:bg-white/5 hover:text-foreground scale-95 origin-left'}`}
                    >
                        <FiShield className="text-xl" /> Ecosystem Control
                    </button>
                    <button
                        onClick={() => setActiveTab('validation')}
                        className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-semibold text-[15px] ${activeTab === 'validation' ? 'glass-panel text-brand-secondary shadow-neon-brand scale-100 border border-brand-primary/20 bg-brand-secondary/20' : 'text-muted-foreground hover:bg-white/5 hover:text-foreground scale-95 origin-left'}`}
                    >
                        <FiStar className="text-xl" /> Market Validation
                    </button>
                </div>

                <div className="mt-auto pt-8 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-3 px-5 py-4 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:shadow-sm transition-all font-bold group"
                    >
                        <FiLogOut className="text-xl group-hover:-translate-x-1 transition-transform" /> Terminate Session
                    </button>
                </div>
            </motion.div>

            {/* Main Content Pane */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="flex-1 glass-panel p-10 md:p-14 relative shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-white/5 z-10"
            >
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-12 pb-8 border-b border-white/5">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-primary mb-1">Sector Analysis</span>
                        <h3 className="text-4xl font-extrabold text-white tracking-tight">
                            {activeTab === 'overview' ? 'Performance Overview' : activeTab === 'queries' ? 'Enterprise Inquiries' : activeTab === 'news' ? 'Intelligence Broadcast' : activeTab === 'ecosystem' ? 'Ecosystem Management' : 'Market Validation'}
                        </h3>
                    </div>

                    {(activeTab === 'queries' || activeTab === 'news') && (
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="px-6 py-3 rounded-full glass-input focus:border-brand-primary outline-none text-white text-sm w-full md:w-48"
                            />
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="px-6 py-3 rounded-full glass-input focus:border-brand-primary outline-none text-white text-sm cursor-pointer appearance-none pr-10"
                                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%238c929d' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.2em 1.2em' }}
                            >
                                {activeTab === 'queries' ? (
                                    <>
                                        <option value="All">All Inquiries</option>
                                        <option value="New">New Only</option>
                                        <option value="Completed">Completed</option>
                                    </>
                                ) : (
                                    <>
                                        <option value="All">All Categories</option>
                                        <option value="Global Directive">Global Directive</option>
                                        <option value="Regulatory Intel">Regulatory Intel</option>
                                        <option value="Network Status">Network Status</option>
                                        <option value="Company News">Company News</option>
                                    </>
                                )}
                            </select>
                        </div>
                    )}

                    {activeTab === 'news' && !isAddingNews && (
                        <button
                            onClick={() => setIsAddingNews(true)}
                            className="px-8 py-3.5 rounded-full bg-brand-primary text-background font-bold hover:bg-brand-secondary hover:text-foreground hover:shadow-neon-brand hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                        >
                            <FiPlus className="text-xl" /> Issue New Advisory
                        </button>
                    )}
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-[50vh]">
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-12 h-12 border-[3px] border-white/10 border-t-brand-primary rounded-full" />
                    </div>
                ) : (
                    <div className="flex flex-col gap-10">
                        {activeTab === 'overview' && (
                            <div className="space-y-12">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {stats.map((stat, idx) => (
                                        <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="glass-panel p-8 border border-white/5 hover:border-brand-primary/20 transition-all group">
                                            <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl ${stat.color} mb-6 group-hover:scale-110 transition-transform`}>
                                                {stat.icon}
                                            </div>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1">{stat.label}</p>
                                            <h4 className="text-3xl font-black text-white">{stat.value}</h4>
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    <div className="lg:col-span-2 glass-panel p-8 border border-white/5">
                                        <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3"><FiActivity className="text-brand-primary" /> Recent System Activity</h4>
                                        <div className="space-y-4">
                                            {queriesList.slice(0, 5).map(q => (
                                                <div key={q.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-white">{q.name}</span>
                                                        <span className="text-[10px] text-muted-foreground uppercase">{q.status || 'New Inquiry'}</span>
                                                    </div>
                                                    <span className="text-[10px] text-brand-secondary font-black">{q.date}</span>
                                                </div>
                                            ))}
                                            {queriesList.length === 0 && <p className="text-center text-muted-foreground py-10 italic">No recent activity detected.</p>}
                                        </div>
                                    </div>
                                    <div className="glass-panel p-8 border border-white/5">
                                        <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3"><FiShield className="text-brand-primary" /> Integrity Status</h4>
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center"><span className="text-sm text-gray-400">Database Engine</span><span className="text-[10px] px-2 py-1 rounded-full bg-green-500/20 text-green-400 font-bold uppercase">Optimal</span></div>
                                            <div className="flex justify-between items-center"><span className="text-sm text-gray-400">Auth Services</span><span className="text-[10px] px-2 py-1 rounded-full bg-green-500/20 text-green-400 font-bold uppercase">Active</span></div>
                                            <div className="flex justify-between items-center"><span className="text-sm text-gray-400">Response Latency</span><span className="text-[10px] px-2 py-1 rounded-full bg-brand-primary/20 text-brand-secondary font-bold uppercase">12ms</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'queries' && (
                            <div className="flex flex-col gap-6">
                                {filteredQueries.length === 0 ? (
                                    <div className="h-64 flex flex-col items-center justify-center text-muted-foreground font-medium border-2 border-dashed border-white/5 rounded-[2rem] bg-white/5 gap-4">
                                        <FiMessageSquare className="text-4xl opacity-50" />
                                        No matching logistics requests found.
                                    </div>
                                ) : (
                                    <AnimatePresence>
                                        {filteredQueries.map(q => (
                                            <motion.div
                                                key={q.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="glass-panel rounded-[2rem] border border-white/5 p-8 flex flex-col md:flex-row justify-between gap-8 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] hover:shadow-brand-primary/10 transition-all group relative overflow-hidden"
                                                onClick={() => setSelectedInquiry(q)}
                                            >
                                                <div className="flex-1 relative z-10 cursor-pointer">
                                                    <div className="flex items-center justify-between mb-6">
                                                        <div className="flex items-center gap-4">
                                                            <span className={`text-[10px] px-4 py-2 rounded-full font-black uppercase tracking-widest ${q.status === 'Completed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-brand-primary/20 text-brand-secondary border border-brand-primary/30'}`}>
                                                                {q.status || 'New Inquiry'}
                                                            </span>
                                                            <span className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2"><FiCalendar /> {q.date}</span>
                                                        </div>
                                                        <div className="flex gap-3" onClick={e => e.stopPropagation()}>
                                                            <button onClick={() => handleUpdateStatus('queries', q.id, 'Completed')} className="w-10 h-10 flex items-center justify-center bg-green-500/10 text-green-400 hover:bg-green-500 rounded-full hover:text-white transition-all" title="Mark Completed"><FiCheckCircle size={20} /></button>
                                                            <button onClick={() => handleDelete('queries', q.id)} className="w-10 h-10 flex items-center justify-center bg-red-500/10 text-red-400 hover:bg-red-500 rounded-full hover:text-white transition-all" title="Delete Inquiry"><FiX size={20} /></button>
                                                        </div>
                                                    </div>
                                                    <div className="mb-8">
                                                        <h4 className="font-black text-3xl text-white mb-2 tracking-tight uppercase">{q.name}</h4>
                                                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold text-brand-primary/80 uppercase tracking-widest">
                                                            <span className="flex items-center gap-2">EMAIL: <span className="text-white">{q.email}</span></span>
                                                            <span className="hidden md:inline opacity-30">|</span>
                                                            <span className="flex items-center gap-2">PHONE: <span className="text-white">{q.phone}</span></span>
                                                        </div>
                                                    </div>
                                                    <div className="p-8 bg-black/60 rounded-[1.5rem] text-sm md:text-[15px] text-gray-300 font-medium leading-[1.8] border border-white/5 shadow-inner line-clamp-3">
                                                        {q.message}
                                                    </div>
                                                </div>
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                )}
                            </div>
                        )}

                        {activeTab === 'news' && (
                            <div className="flex flex-col gap-8">
                                {isAddingNews && (
                                    <motion.form
                                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                                        onSubmit={handleAddNews}
                                        className="glass-panel p-10 border border-brand-primary/20 rounded-[2rem] flex flex-col gap-8 shadow-2xl"
                                    >
                                        <div className="flex justify-between items-center pb-6 border-b border-white/5">
                                            <h4 className="font-black text-2xl text-white uppercase">Compose Intelligence</h4>
                                            <button type="button" onClick={() => setIsAddingNews(false)} className="text-muted-foreground hover:text-red-500 p-2 transition-all"><FiX size={24} /></button>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase text-brand-primary">Headline</label>
                                            <input className="w-full px-6 py-4 rounded-xl glass-input text-white font-bold" value={newNews.title} onChange={(e) => setNewNews({ ...newNews, title: e.target.value })} required />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <select className="px-6 py-4 rounded-xl glass-input text-white font-bold bg-[#050a07]" value={newNews.type} onChange={(e) => setNewNews({ ...newNews, type: e.target.value })}>
                                                <option value="Global Directive">Global Directive</option>
                                                <option value="Regulatory Intel">Regulatory Intel</option>
                                                <option value="Network Status">Network Status</option>
                                                <option value="Company News">Company News</option>
                                            </select>
                                            <input className="px-6 py-4 rounded-xl glass-input text-white" placeholder="Image URL" value={newNews.imageUrl} onChange={(e) => setNewNews({ ...newNews, imageUrl: e.target.value })} />
                                        </div>
                                        <textarea className="w-full px-6 py-4 rounded-xl glass-input text-white h-32" placeholder="Brief summary..." value={newNews.summary} onChange={(e) => setNewNews({ ...newNews, summary: e.target.value })} required />
                                        <button type="submit" className="py-5 bg-brand-primary text-background font-black rounded-full hover:bg-white hover:shadow-neon-brand transition-all">BROADCAST ADVISORY</button>
                                    </motion.form>
                                )}

                                <div className="grid grid-cols-1 gap-6">
                                    {filteredNews.length === 0 ? (
                                        <div className="h-64 flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed border-white/5 rounded-[2rem] bg-white/5 gap-4">
                                            <FiFileText className="text-4xl opacity-50" />
                                            No matching intelligence found.
                                        </div>
                                    ) : (
                                        <AnimatePresence>
                                            {filteredNews.map(item => (
                                                <motion.div key={item.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-[2rem] border border-white/5 p-8 flex gap-8 hover:border-brand-primary/20 transition-all group overflow-hidden">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-4 mb-4">
                                                            <span className="text-[10px] px-4 py-1.5 rounded-full font-black uppercase bg-brand-primary/20 text-brand-secondary border border-brand-primary/30">{item.type}</span>
                                                            <span className="text-muted-foreground text-[10px] font-black uppercase flex items-center gap-2"><FiClock /> {item.date}</span>
                                                        </div>
                                                        <h4 className="font-extrabold text-2xl text-white mb-4 group-hover:text-brand-highlight transition-colors">{item.title}</h4>
                                                        <p className="text-[15px] text-gray-400 line-clamp-2 mb-6">{item.summary}</p>
                                                        <button onClick={() => handleDelete('news', item.id)} className="px-6 py-2 rounded-full bg-red-500/10 text-red-400 text-[10px] font-black uppercase hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100">Delete</button>
                                                    </div>
                                                    {item.imageUrl && <div className="hidden md:block w-40 h-28 rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all"><img src={item.imageUrl} className="w-full h-full object-cover" /></div>}
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'ecosystem' && (
                            <div className="flex flex-col gap-8">
                                <h4 className="text-2xl font-black text-white uppercase border-b border-white/5 pb-4">Enterprise Alliances</h4>
                                <form onSubmit={handleAddPartner} className="glass-panel p-8 rounded-[2rem] border border-white/5 flex flex-col md:flex-row gap-6 items-end">
                                    <input className="flex-1 px-6 py-4 rounded-xl glass-input text-white font-bold" placeholder="Partner Name" value={newPartner.name} onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })} required />
                                    <input className="flex-1 px-6 py-4 rounded-xl glass-input text-white" placeholder="Logo URL" value={newPartner.logoUrl} onChange={(e) => setNewPartner({ ...newPartner, logoUrl: e.target.value })} />
                                    <button type="submit" className="px-10 py-4 bg-brand-primary text-background font-black rounded-xl hover:bg-white transition-all uppercase text-xs">Integrate</button>
                                </form>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                    {partners.map(p => (
                                        <div key={p.id} className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col items-center gap-4 group relative">
                                            <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center p-3 border border-white/5 group-hover:border-brand-primary/30 transition-all">{p.logoUrl ? <img src={p.logoUrl} className="max-h-full max-w-full object-contain" /> : <FiUsers className="text-2xl text-gray-500" />}</div>
                                            <span className="font-bold text-white text-xs uppercase truncate w-full text-center">{p.name}</span>
                                            <button onClick={() => handleDelete('partners', p.id)} className="absolute top-2 right-2 text-red-500 hover:text-white bg-red-500/10 hover:bg-red-500 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all"><FiX size={14} /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'validation' && (
                            <div className="flex flex-col gap-8">
                                <h4 className="text-2xl font-black text-white uppercase border-b border-white/5 pb-4">Market Validation</h4>
                                <form onSubmit={handleAddTestimonial} className="glass-panel p-10 border border-white/5 rounded-[2.5rem] flex flex-col gap-8">
                                    <textarea className="w-full px-6 py-4 rounded-2xl glass-input text-white h-24" placeholder="Endorsement text..." value={newTestimonial.text} onChange={(e) => setNewTestimonial({ ...newTestimonial, text: e.target.value })} required />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <input className="px-6 py-4 rounded-xl glass-input text-white font-bold" placeholder="Full Name" value={newTestimonial.author} onChange={(e) => setNewTestimonial({ ...newTestimonial, author: e.target.value })} required />
                                        <input className="px-6 py-4 rounded-xl glass-input text-white" placeholder="Title & Organization" value={newTestimonial.role} onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })} required />
                                    </div>
                                    <StarPicker value={newTestimonial.rating} onChange={val => setNewTestimonial({ ...newTestimonial, rating: val })} />
                                    <button type="submit" className="self-end px-12 py-4 bg-brand-primary text-background font-black rounded-full hover:bg-white transition-all uppercase text-xs">Publish</button>
                                </form>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {testimonials.map(t => (
                                        <div key={t.id} className="glass-panel p-8 rounded-[2rem] border border-white/5 group relative">
                                            <div className="mb-4"><GoldStars rating={t.rating ?? 5} size={20} /></div>
                                            <p className="text-white italic mb-6">"{t.text}"</p>
                                            <p className="text-amber-400 font-black uppercase text-xs">{t.author}</p>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">{t.role}</p>
                                            <button onClick={() => handleDelete('testimonials', t.id)} className="absolute top-4 right-4 text-red-500 hover:text-white opacity-0 group-hover:opacity-100 transition-all"><FiX /></button>
                                        </div>
                                    ))}
                                    {testimonials.length === 0 && (
                                        <div className="col-span-2 h-48 flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed border-white/5 rounded-[2rem] bg-white/5 gap-3">
                                            <FiStar className="text-4xl opacity-40" />
                                            No testimonials yet. Add the first one above.
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <AnimatePresence>
                            {selectedInquiry && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md" onClick={() => setSelectedInquiry(null)}>
                                    <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="glass-panel max-w-2xl w-full p-10 border border-white/10 relative" onClick={e => e.stopPropagation()}>
                                        <button onClick={() => setSelectedInquiry(null)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-all"><FiX size={24} /></button>
                                        <div className="mb-10">
                                            <span className="text-[10px] font-bold uppercase text-brand-primary tracking-widest mb-2 block">Inquiry Detail</span>
                                            <h3 className="text-3xl font-black text-white uppercase">{selectedInquiry.name}</h3>
                                            <div className="flex gap-4 mt-2">
                                                <span className="text-[10px] px-3 py-1 rounded-full bg-brand-primary/20 text-brand-secondary border border-brand-primary/30">{selectedInquiry.status || 'New'}</span>
                                                <span className="text-muted-foreground text-[10px] flex items-center gap-2"><FiCalendar /> {selectedInquiry.date}</span>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                            <div className="glass-panel p-4 border border-white/5">
                                                <span className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Email</span>
                                                <p className="text-white font-bold">{selectedInquiry.email}</p>
                                            </div>
                                            <div className="glass-panel p-4 border border-white/5">
                                                <span className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Phone</span>
                                                <p className="text-white font-bold">{selectedInquiry.phone}</p>
                                            </div>
                                        </div>
                                        <div className="bg-black/40 p-6 rounded-2xl border border-white/5 mb-8"><p className="text-gray-300 whitespace-pre-wrap">{selectedInquiry.message}</p></div>
                                        <div className="flex gap-4 justify-end">
                                            <button onClick={() => { handleUpdateStatus('queries', selectedInquiry.id, 'Completed'); setSelectedInquiry(null); }} className="px-6 py-3 rounded-full bg-green-500 text-white font-bold text-xs uppercase transition-all">Mark Completed</button>
                                            <button onClick={() => { handleDelete('queries', selectedInquiry.id); setSelectedInquiry(null); }} className="px-6 py-3 rounded-full bg-red-500/10 text-red-500 border border-red-500/30 font-bold text-xs uppercase transition-all">Delete</button>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default Admin;
