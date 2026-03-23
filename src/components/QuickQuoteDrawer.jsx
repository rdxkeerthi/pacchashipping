import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSend, FiCheckCircle } from 'react-icons/fi';
import { db } from '../firebase/config';
import { ref, push, set } from 'firebase/database';

const QuickQuoteDrawer = ({ isOpen, onClose }) => {
    const [status, setStatus] = useState('idle');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        service: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const newQueryRef = push(ref(db, 'queries'));
            await set(newQueryRef, {
                // Map the quick quote fields to fit the Admin dashboard expectation
                name: formData.name,
                email: 'N/A (Quick Quote)',
                phone: formData.phone,
                message: `[Service: ${formData.service}] ${formData.message}`,
                status: 'New',
                createdAt: Date.now()
            });

            setStatus('success');
            setTimeout(() => {
                setStatus('idle');
                setFormData({ name: '', phone: '', service: '', message: '' });
                onClose();
            }, 2000);
        } catch (error) {
            console.error("Error submitting quote:", error);
            setStatus('idle');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md z-50 p-8 bg-white border-l border-black/5 rounded-none overflow-y-auto shadow-2xl"
                    >
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h2 className="text-2xl font-bold text-[#1D1D1F]">Get a Free Quote</h2>
                                <p className="text-[#86868B] text-sm mt-1">Our team responds within a few hours.</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full bg-[#F5F5F7] text-[#1D1D1F] hover:bg-[#E5E5EA] transition-colors"
                                aria-label="Close drawer"
                            >
                                <FiX className="text-xl" />
                            </button>
                        </div>

                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center h-64 text-center gap-4"
                            >
                                <FiCheckCircle className="text-6xl text-[#34C759]" />
                                <h3 className="text-xl font-bold text-[#1D1D1F]">Request Received</h3>
                                <p className="text-[#86868B] text-sm">We'll get back to you with a quote shortly.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="qq-name" className="text-[13px] font-semibold text-[#86868B] uppercase tracking-wider">Full Name</label>
                                    <input
                                        id="qq-name"
                                        name="name"
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3.5 rounded-xl bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#0066CC] focus:ring-4 focus:ring-[#0066CC]/10 transition-all text-[#1D1D1F] outline-none font-medium"
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="qq-phone" className="text-[13px] font-semibold text-[#86868B] uppercase tracking-wider">Phone / WhatsApp</label>
                                    <input
                                        id="qq-phone"
                                        name="phone"
                                        required
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3.5 rounded-xl bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#0066CC] focus:ring-4 focus:ring-[#0066CC]/10 transition-all text-[#1D1D1F] outline-none font-medium"
                                        placeholder="+91 98413 93916"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="qq-service" className="text-[13px] font-semibold text-[#86868B] uppercase tracking-wider">Required Service</label>
                                    <select
                                        id="qq-service"
                                        name="service"
                                        required
                                        value={formData.service}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3.5 rounded-xl bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#0066CC] focus:ring-4 focus:ring-[#0066CC]/10 transition-all text-[#1D1D1F] outline-none font-medium appearance-none"
                                        style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2386868b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
                                    >
                                        <option value="" disabled>Select a service...</option>
                                        <option value="air-freight">Air Freight</option>
                                        <option value="ocean-freight">Ocean Freight</option>
                                        <option value="customs">Customs Clearance</option>
                                        <option value="road">Road Freight</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="qq-details" className="text-[13px] font-semibold text-[#86868B] uppercase tracking-wider">Cargo Details (Weight, Source, Destination)</label>
                                    <textarea
                                        id="qq-details"
                                        name="message"
                                        required
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3.5 rounded-xl bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#0066CC] focus:ring-4 focus:ring-[#0066CC]/10 transition-all text-[#1D1D1F] outline-none font-medium resize-none"
                                        placeholder="E.g., 500kg from Chennai to Dubai"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="mt-6 w-full py-4 rounded-xl bg-[#0066CC] text-white font-bold text-[15px] flex items-center justify-center gap-2 hover:bg-[#0055AA] hover:shadow-lg transition-all disabled:opacity-70 disabled:hover:shadow-none"
                                >
                                    {status === 'loading' ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
                                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                        />
                                    ) : (
                                        <>
                                            <span>Submit Request</span>
                                            <FiSend />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default QuickQuoteDrawer;
