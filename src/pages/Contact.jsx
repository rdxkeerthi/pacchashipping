import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiSend, FiClock, FiGlobe } from 'react-icons/fi';
import { db } from '../firebase/config';
import { ref, push, set } from 'firebase/database';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const newQueryRef = push(ref(db, 'queries'));
            await set(newQueryRef, {
                ...formData,
                status: 'New',
                createdAt: Date.now()
            });

            setStatus('success');
            setFormData({ name: '', email: '', phone: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error("Error submitting form:", error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    const revealVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <div className="w-full min-h-screen pt-24 pb-12 px-4 md:pt-32 md:pb-20 md:px-6 max-w-[1400px] mx-auto relative bg-transparent">
            <Helmet>
                <title>Contact Paccha Shipping | Get a Freight Rate Quote Chennai India</title>
                <meta name="description" content="Contact our logistics experts in Chennai for freight rates, customs assistance, and export-import documentation. Get a free quote for ocean, air, or road transport." />
                <meta name="keywords" content="contact logistics company Chennai, freight quote India, shipping inquiry Chennai, Paccha Shipping contact, export import assistance" />
                <link rel="canonical" href="https://pacchashipping.in/contact" />
            </Helmet>

            {/* Page Header */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={revealVariants}
                className="text-center mb-16"
            >
                <span className="text-brand-highlight tracking-widest uppercase text-sm font-bold mb-4 block">We're Here to Help</span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight leading-tight">
                    Contact Our Logistics Team
                </h1>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                    Whether you need a freight quote, customs assistance, or a complete logistics solution — our team is ready to help. Reach us by phone, email, or the form below.
                </p>
            </motion.div>

            {/* Quick Info Banner */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
            >
                {[
                    { icon: FiPhone, title: 'Call Us', value: '+91 98413 93916', sub: '+91 9345021647', href: 'tel:+919841393916' },
                    { icon: FiMail, title: 'Email Us', value: 'admin@pacchashipping.in', sub: 'We reply within 24 hours', href: 'mailto:admin@pacchashipping.in' },
                    { icon: FiClock, title: 'Office Hours', value: 'Mon–Sat: 9:00 AM – 6:30 PM', sub: 'Emergency: 24/7', href: null },
                ].map(({ icon: Icon, title, value, sub, href }) => (
                    <div key={title} className="glass-panel-dark rounded-[1.5rem] p-6 flex items-center gap-5 border border-white/5 hover:border-brand-primary/30 transition-all duration-300">
                        <div className="w-14 h-14 rounded-full bg-brand-primary/15 flex items-center justify-center text-brand-primary text-2xl shrink-0">
                            <Icon />
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
                            {href ? (
                                <a href={href} className="text-white font-bold text-base hover:text-brand-highlight transition-colors">{value}</a>
                            ) : (
                                <p className="text-white font-bold text-base">{value}</p>
                            )}
                            <p className="text-gray-500 text-sm mt-0.5">{sub}</p>
                        </div>
                    </div>
                ))}
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

                {/* Contact Info & Map */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={revealVariants}
                    className="flex-[1.2] flex flex-col gap-6 lg:gap-10 relative z-10"
                >
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                            Visit Our Office
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            We are conveniently located in Chennai — close to the Chennai seaport and airport, making coordination fast and efficient for all your cargo movements.
                        </p>
                    </div>

                    <div className="glass-panel-dark rounded-[2rem] p-6 md:p-10 flex flex-col gap-6 md:gap-8 border border-white/5 shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
                        <div className="flex gap-6 items-start group">
                            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-brand-highlight text-2xl shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                                <FiMapPin />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-lg text-white mb-1">Office Address</h4>
                                <p className="text-gray-400 text-[15px] leading-relaxed font-medium">No.16, Dhanalakshmi Nagar, Kadappa Road, Puthagaram, Kolathur, Chennai - 600 099.</p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-center group">
                            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-brand-highlight text-2xl shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                                <FiPhone />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-lg text-white mb-1">Phone Numbers</h4>
                                <a href="tel:+919841393916" className="text-gray-400 text-[15px] font-medium hover:text-white transition-colors">+91 98413 93916</a><br />
                                <a href="tel:+919345021647" className="text-gray-400 text-[15px] font-medium hover:text-white transition-colors">+91 9345021647</a>
                            </div>
                        </div>
                        <div className="flex gap-6 items-center group">
                            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-brand-highlight text-2xl shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                                <FiMail />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-lg text-white mb-1">Email</h4>
                                <a href="mailto:admin@pacchashipping.in" className="text-brand-primary text-[15px] font-semibold hover:text-brand-highlight transition-colors">admin@pacchashipping.in</a>
                            </div>
                        </div>
                        <div className="flex gap-6 items-center group">
                            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-brand-highlight text-2xl shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                                <FiGlobe />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-lg text-white mb-1">Trade Registrations</h4>
                                <p className="text-gray-400 text-[15px] font-medium">IEC Holder · Customs License · DGFT Registered</p>
                            </div>
                        </div>
                    </div>

                    {/* Map */}
                    <a href="https://www.google.com/maps/dir/?api=1&destination=No.16,+Dhanalakshmi+Nagar,+Kadappa+Road,+Puthagaram,+Kolathur,+Chennai+-+600+099" target="_blank" rel="noopener noreferrer" className="hidden md:block w-full h-80 rounded-[2rem] overflow-hidden glass-panel-dark border border-white/5 p-2 relative group hover:shadow-neon-brand transition-all cursor-pointer">
                        <div className="absolute inset-0 z-10 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
                            <span className="px-6 py-2 rounded-full bg-brand-primary text-white font-bold tracking-widest text-[11px] shadow-lg flex items-center gap-2">Get Directions <FiMapPin /></span>
                        </div>
                        <iframe
                            src="https://maps.google.com/maps?q=No.16,+Dhanalakshmi+Nagar,+Kadappa+Road,+Puthagaram,+Kolathur,+Chennai+-+600+099&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            className="rounded-[1.5rem] pointer-events-none"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Paccha Shipping HQ location"
                            style={{ filter: "invert(90%) hue-rotate(180deg) contrast(1.2)" }}
                        ></iframe>
                    </a>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={{
                        hidden: { opacity: 0, x: 50, scale: 0.98 },
                        visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 } }
                    }}
                    className="flex-[1.4] relative z-10"
                >
                    <div className="glass-panel-dark rounded-[2.5rem] p-6 md:p-14 h-full flex flex-col justify-center shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/5">
                        <h3 className="text-3xl md:text-4xl font-bold mb-3 text-white tracking-tight">Get a Free Quote</h3>
                        <p className="text-gray-400 mb-8 text-base">Fill in the form and our logistics team will respond within 24 hours with a competitive quotation.</p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:gap-8">
                            <div className="flex flex-col gap-3 relative">
                                <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Your Full Name *</label>
                                <input
                                    id="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="e.g. Ramesh Kumar"
                                    className="w-full px-6 py-5 rounded-2xl glass-input border border-transparent focus:bg-white/10 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/20 transition-all text-white outline-none font-medium text-lg placeholder-gray-500"
                                />
                            </div>

                            <div className="flex flex-col gap-5 md:flex-row md:gap-8">
                                <div className="flex flex-col gap-3 flex-1 relative">
                                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Email Address *</label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="you@yourcompany.com"
                                        className="w-full px-6 py-5 rounded-2xl glass-input border border-transparent focus:bg-white/10 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/20 transition-all text-white outline-none font-medium text-lg placeholder-gray-500"
                                    />
                                </div>
                                <div className="flex flex-col gap-3 flex-1 relative">
                                    <label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Phone / WhatsApp *</label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="+91 99999 99999"
                                        className="w-full px-6 py-5 rounded-2xl glass-input border border-transparent focus:bg-white/10 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/20 transition-all text-white outline-none font-medium text-lg placeholder-gray-500"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 relative">
                                <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Shipment Details / Query *</label>
                                <textarea
                                    id="message"
                                    rows="6"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Please describe your shipment: type of cargo, origin, destination, approximate weight/volume, and expected date..."
                                    className="w-full px-6 py-5 rounded-2xl glass-input border border-transparent focus:bg-white/10 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/20 transition-all text-white outline-none font-medium text-lg placeholder-gray-500 resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="mt-6 w-[240px] px-8 py-5 rounded-full bg-brand-primary text-white font-bold text-lg flex justify-center items-center gap-3 hover:bg-brand-highlight hover:shadow-[0_12px_30px_rgba(45,106,79,0.4)] hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group"
                            >
                                {status === 'loading' ? (
                                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full" />
                                ) : status === 'success' ? (
                                    <>Request Sent! ✓</>
                                ) : (
                                    <>Send Request <FiSend className="group-hover:translate-x-1 transition-transform" /></>
                                )}
                            </button>
                            {status === 'success' && (
                                <p className="text-[#34C759] font-bold text-[15px] mt-4 tracking-wide animate-pulse">Your request has been received! Our team will contact you within 24 hours with a quote.</p>
                            )}
                            {status === 'error' && (
                                <p className="text-[#FF3B30] font-bold text-[15px] mt-4 tracking-wide animate-pulse">Error submitting form. Please try again or call us directly.</p>
                            )}
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
