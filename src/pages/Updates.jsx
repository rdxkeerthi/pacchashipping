import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiFileText, FiChevronDown, FiTag } from 'react-icons/fi';
import { db } from '../firebase/config';
import { ref, onValue } from 'firebase/database';

const Updates = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        const newsRef = ref(db, 'news');
        const unsubscribe = onValue(newsRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const newsData = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key],
                    date: data[key].createdAt ? new Date(data[key].createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'
                }));
                newsData.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
                setNews(newsData);
            } else {
                setNews([]);
            }
            setLoading(false);
        }, (error) => {
            console.error("Error fetching news from RTDB:", error);
            setNews([]);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const revealVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <div className="w-full min-h-screen pt-24 pb-12 px-4 md:pt-32 md:pb-20 md:px-6 max-w-5xl mx-auto relative bg-background overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-brand-primary/10 blur-[100px] opacity-60"></div>
                <div className="absolute bottom-[20%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-brand-secondary/10 blur-[80px] opacity-40"></div>
            </div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={revealVariants}
                className="mb-16 text-center"
            >
                <span className="text-brand-highlight tracking-widest uppercase text-xs md:text-sm font-bold mb-3 md:mb-4 block">News & Announcements</span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground mb-4 md:mb-6 tracking-tight leading-tight">
                    Trade & Shipping Updates.
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                    Stay informed with the latest news on international shipping, customs regulations, freight rate trends, and important announcements from Paccha Universal Shipping Line.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10 w-full max-w-6xl mx-auto">
                {loading ? (
                    <div className="flex justify-center py-20 col-span-2">
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-10 h-10 border-4 border-muted border-t-brand-primary rounded-full" />
                    </div>
                ) : news.length === 0 ? (
                    <div className="col-span-2 text-center py-20">
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-4xl text-gray-500 mx-auto mb-6">
                            <FiFileText />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">No Updates Yet</h3>
                        <p className="text-gray-500 text-lg">Check back soon for the latest trade news, shipping advisories, and company announcements.</p>
                    </div>
                ) : (
                    news.map((item, idx) => {
                        const isExpanded = expandedId === item.id;
                        return (
                            <motion.div
                                key={item.id}
                                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 } }
                                }}
                                whileHover={{ scale: 1.02, y: -4, transition: { duration: 0.4, ease: "easeOut" } }}
                                className="glass-panel flex flex-col h-full rounded-3xl p-6 md:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:shadow-neon-brand border border-white/5 transition-all cursor-pointer group"
                            >
                                {item.imageUrl && (
                                    <div className="w-full h-40 md:h-56 mb-5 md:mb-6 rounded-2xl overflow-hidden shrink-0 border border-white/5">
                                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                )}
                                <div className="flex flex-wrap items-center gap-4 mb-6 text-[11px] font-bold uppercase tracking-widest shrink-0">
                                    <span className="text-brand-secondary bg-brand-primary/10 px-4 py-2 rounded-full border border-brand-primary/20 flex items-center gap-1"><FiTag className="shrink-0" /> {item.type || 'Announcement'}</span>
                                    <span className="text-muted-foreground flex items-center gap-1"><FiClock className="text-muted-foreground" /> {item.date}</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-brand-secondary transition-colors tracking-tight shrink-0">{item.title}</h3>

                                <motion.div
                                    initial={false}
                                    animate={{ height: isExpanded ? 'auto' : '80px' }}
                                    className="overflow-hidden relative flex-grow"
                                >
                                    <p className="text-muted-foreground text-base font-medium leading-relaxed">{item.summary}</p>
                                    {!isExpanded && (
                                        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[var(--color-background)] to-transparent"></div>
                                    )}
                                </motion.div>

                                <div className={`mt-8 flex items-center gap-2 text-brand-secondary text-sm font-semibold transition-all duration-300 shrink-0 ${isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-2'}`}>
                                    <FiFileText /> {isExpanded ? 'Collapse' : 'Read Full Update'}
                                    <FiChevronDown className={`ml-1 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                                </div>
                            </motion.div>
                        )
                    })
                )}
            </div>
        </div>
    );
};

export default Updates;
