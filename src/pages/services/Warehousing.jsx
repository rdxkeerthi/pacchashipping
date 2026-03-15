import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight, FiCheckCircle, FiBox, FiPackage, FiShield, FiTrendingUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const features = [
    "Bonded & Non-Bonded Warehousing",
    "CFS (Container Freight Station)",
    "Cargo Stuffing & Destuffing",
    "Palletizing & Shrink Wrapping",
    "Inventory Management System",
    "24/7 CCTV Surveillance",
    "Cargo Consolidation (LCL)",
    "Last-Mile Distribution",
    "Pre-Shipping Inspection Facility",
    "Repackaging & Relabelling",
    "Temperature-Controlled Storage",
    "Cross-Docking Facility",
];

const Warehousing = () => {
    const warehouseRef = useRef(null);

    useEffect(() => {
        gsap.to(warehouseRef.current, {
            scale: 1.1,
            y: -20,
            scrollTrigger: {
                trigger: ".warehouse-hero",
                start: "top top",
                end: "bottom top",
                scrub: 1
            }
        });
    }, []);

    return (
        <div className="min-h-screen bg-[#050a07] pt-32 pb-20 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/10 via-transparent to-transparent pointer-events-none"></div>

            {/* Hero */}
            <section className="warehouse-hero relative max-w-7xl mx-auto px-6 mb-32 z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                        <span className="text-brand-highlight tracking-widest uppercase text-sm font-bold mb-4 block">Warehousing & Distribution</span>
                        <h1 className="text-5xl md:text-7xl font-heading font-extrabold pb-4 text-white drop-shadow-lg">
                            Secure Storage.<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-highlight to-brand-primary">Smooth Distribution.</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-lg mb-8 font-light leading-relaxed">
                            Modern warehousing and distribution facilities near Chennai seaport and airport. We store, handle, consolidate, and distribute your cargo with accuracy and care.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/contact" className="px-8 py-4 rounded-full bg-brand-primary text-white hover:bg-brand-highlight transition-all font-bold text-lg inline-flex items-center gap-2 hover:-translate-y-1">
                                Enquire About Storage <FiArrowRight />
                            </Link>
                            <a href="tel:+919841393916" className="px-8 py-4 rounded-full border border-white/20 text-white hover:border-brand-primary/60 transition-all font-bold text-lg inline-flex items-center gap-2 hover:-translate-y-1">
                                Call: +91 98413 93916
                            </a>
                        </div>
                    </motion.div>

                    <div className="relative h-[400px] md:h-[500px] w-full mt-12 lg:mt-0">
                        <div className="absolute inset-0 overflow-hidden rounded-3xl glass-panel-dark border border-brand-highlight/30 shadow-[0_0_40px_rgba(99,102,241,0.2)]">
                            <div
                                ref={warehouseRef}
                                className="w-full h-full bg-cover bg-center origin-center"
                                style={{ backgroundImage: "url('/paccha_warehouse.png')" }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050a07] via-transparent to-transparent opacity-80"></div>
                            <div className="absolute bottom-6 left-6 flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-brand-highlight animate-pulse shadow-neon-brand"></div>
                                <span className="text-white font-bold text-sm tracking-widest uppercase">Chennai Storage Facility</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="max-w-7xl mx-auto px-6 relative z-10 mb-24">
                <h2 className="text-3xl font-bold text-white mb-8">Warehousing & Value-Added Services</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-gray-300 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-brand-primary/30 transition-all">
                            <FiCheckCircle className="text-brand-primary text-xl shrink-0" />
                            <span className="text-sm font-medium">{feature}</span>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-panel p-6 rounded-2xl text-center">
                        <FiBox className="text-brand-highlight text-4xl mx-auto mb-3" />
                        <span className="text-3xl font-bold text-brand-highlight block mb-1">50,000+</span>
                        <span className="text-gray-400 text-sm uppercase tracking-wider">Sq. Ft. Storage Capacity</span>
                    </div>
                    <div className="glass-panel p-6 rounded-2xl text-center">
                        <FiShield className="text-brand-primary text-4xl mx-auto mb-3" />
                        <span className="text-3xl font-bold text-brand-primary block mb-1">Bonded</span>
                        <span className="text-gray-400 text-sm uppercase tracking-wider">Customs Warehouse</span>
                    </div>
                    <div className="glass-panel p-6 rounded-2xl text-center">
                        <FiTrendingUp className="text-brand-highlight text-4xl mx-auto mb-3" />
                        <span className="text-3xl font-bold text-brand-highlight block mb-1">Real-Time</span>
                        <span className="text-gray-400 text-sm uppercase tracking-wider">Inventory Tracking</span>
                    </div>
                </div>
            </section>

            {/* Warehousing Types */}
            <section className="max-w-7xl mx-auto px-6 relative z-10 mb-24">
                <h2 className="text-3xl font-bold text-white mb-8">Types of Warehousing We Offer</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        {
                            icon: FiShield,
                            title: 'Bonded Warehouse',
                            desc: 'Government-licensed bonded storage where imported goods can be held pending customs clearance or re-export, without paying duty immediately. Ideal for traders and importers managing duty payment timelines.'
                        },
                        {
                            icon: FiBox,
                            title: 'Open & Covered Warehousing',
                            desc: 'Flexible covered and open-yard storage for all cargo types. Suitable for bulk cargo, containers, machinery, raw materials, and finished goods awaiting dispatch.'
                        },
                        {
                            icon: FiPackage,
                            title: 'CFS (Container Freight Station)',
                            desc: 'Centralized facility for LCL cargo consolidation and de-consolidation. We handle CFS operations including customs examination, stuffing, and delivery.'
                        },
                        {
                            icon: FiTrendingUp,
                            title: 'Reefer / Cold Storage',
                            desc: 'Temperature-controlled storage for perishables, pharmaceuticals, food products, and any cold-chain sensitive cargo requiring specific temperature ranges.'
                        },
                    ].map(({ icon: Icon, title, desc }) => (
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="glass-panel-dark rounded-2xl p-8 border border-white/5 hover:border-brand-primary/30 transition-all"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-brand-primary/15 flex items-center justify-center text-2xl text-brand-primary mb-5">
                                <Icon />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                            <p className="text-gray-400 leading-relaxed">{desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="bg-gradient-to-br from-brand-primary/20 to-black/40 border border-brand-primary/30 rounded-[2rem] p-12 text-center">
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-4">Need Warehousing in Chennai?</h3>
                    <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">Get flexible, secure storage solutions at competitive prices. Contact us to discuss your warehousing, packing, and distribution needs.</p>
                    <Link to="/contact" className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-highlight text-white font-bold px-10 py-4 rounded-full transition-all hover:-translate-y-1">
                        Enquire Now <FiArrowRight />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Warehousing;
