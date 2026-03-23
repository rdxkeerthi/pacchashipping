import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiGlobe } from 'react-icons/fi';
import QuickQuoteDrawer from './QuickQuoteDrawer';

const NavLinks = [
    { name: 'Home', path: '/' },
    {
        name: 'Services',
        path: '/services',
        dropdown: [
            { name: 'Ocean Freight', path: '/services/ocean' },
            { name: 'Air Freight', path: '/services/air' },
            { name: 'Road Transport', path: '/services/road' },
            { name: 'Warehousing', path: '/services/warehousing' }
        ]
    },
    { name: 'Trade News', path: '/updates' },
    { name: 'Our Clients', path: '/customers' },
    { name: 'Contact Us', path: '/contact' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-black/40 backdrop-blur-xl py-3 shadow-[0_4px_20px_rgba(0,0,0,0.4)] border-b border-white/5' : 'bg-transparent py-5'
                    }`}
            >
                <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 z-50 group">
                        <div className="w-4 h-4 rounded-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)] group-hover:scale-125 transition-transform" />
                        <span className="font-bold text-2xl tracking-tighter text-white">
                            PACCHA
                        </span>
                    </Link>

                    {/* Desktop Search / Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex gap-8 border-r border-white/10 pr-8">
                            {NavLinks.map((link) => (
                                <div key={link.name} className="relative group">
                                    <Link
                                        to={link.path}
                                        className={`text-[15px] font-semibold transition-colors hover:text-white py-6 ${location.pathname.startsWith(link.path) && link.path !== '/' || location.pathname === link.path
                                            ? 'text-white'
                                            : 'text-gray-400'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>

                                    {/* Dropdown Menu */}
                                    {link.dropdown && (
                                        <div className="absolute top-full left-0 mt-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 pt-2 z-50">
                                            <div className="bg-[#050a07]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col py-2">
                                                {link.dropdown.map(sublink => (
                                                    <Link
                                                        key={sublink.name}
                                                        to={sublink.path}
                                                        className={`px-5 py-3 text-sm font-medium hover:bg-brand-primary/20 hover:text-white transition-colors block ${location.pathname === sublink.path ? 'text-brand-highlight bg-white/5' : 'text-gray-300'}`}
                                                    >
                                                        {sublink.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setIsQuoteOpen(true)}
                            className="px-6 py-2.5 rounded-full bg-brand-primary text-white hover:bg-brand-highlight hover:shadow-neon-brand hover:-translate-y-0.5 transition-all font-semibold text-sm flex items-center gap-2"
                        >
                            Free Quote
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-2xl z-50 text-white hover:text-brand-highlight transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
                        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        className="fixed inset-0 z-30 bg-black/90 md:hidden flex flex-col items-center justify-center gap-8"
                    >
                        {NavLinks.map((link, i) => (
                            <motion.div
                                key={link.name}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col items-center w-full"
                            >
                                <Link
                                    to={link.path}
                                    onClick={() => !link.dropdown && setIsOpen(false)}
                                    className="text-4xl font-bold text-white hover:text-brand-highlight transition-colors mb-2"
                                >
                                    {link.name}
                                </Link>

                                {link.dropdown && (
                                    <div className="flex flex-col items-center gap-3 mt-4 mb-6 w-full">
                                        {link.dropdown.map(sublink => (
                                            <Link
                                                key={sublink.name}
                                                to={sublink.path}
                                                onClick={() => setIsOpen(false)}
                                                className="text-xl font-medium text-brand-primary hover:text-white transition-colors"
                                            >
                                                {sublink.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                        <motion.button
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: NavLinks.length * 0.1 }}
                            onClick={() => {
                                setIsOpen(false);
                                setIsQuoteOpen(true);
                            }}
                            className="mt-6 px-10 py-4 rounded-full bg-brand-primary text-white font-bold text-xl shadow-lg hover:shadow-neon-brand transition-all"
                        >
                            Get Free Quote
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            <QuickQuoteDrawer isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
        </>
    );
};

export default Navbar;
