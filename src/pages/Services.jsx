import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiBox, FiGlobe, FiTrendingUp, FiSettings, FiArrowRight, FiTruck, FiShield, FiAnchor, FiFileText, FiPackage, FiAlertTriangle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ServiceCard = ({ icon: Icon, title, desc, delay, imgSrc, to, badge }) => (
    <Link to={to || '/contact'} className="block h-full group">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
            className="glass-panel-dark p-8 h-full flex flex-col items-start min-h-[320px] relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-neon-brand border border-white/5 hover:border-brand-primary/40 transition-all duration-500 rounded-[1.5rem]"
        >
            {imgSrc && (
                <div className="absolute top-0 right-0 w-48 h-48 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                    <img src={imgSrc} alt="" className="w-full h-full object-cover rounded-bl-full" />
                </div>
            )}
            {badge && (
                <span className="absolute top-6 right-6 text-xs font-bold uppercase tracking-widest text-brand-primary bg-brand-primary/10 border border-brand-primary/30 px-3 py-1 rounded-full">{badge}</span>
            )}

            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-2xl mb-8 shadow-sm text-white group-hover:bg-brand-primary transition-all duration-300">
                <Icon />
            </div>

            <h3 className="text-2xl font-bold mb-3 text-white tracking-tight">{title}</h3>
            <p className="text-gray-400 leading-relaxed text-[15px] flex-grow font-medium">{desc}</p>

            <div className="mt-8 flex items-center gap-2 text-brand-highlight text-sm font-semibold opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                Learn More <FiArrowRight />
            </div>
        </motion.div>
    </Link>
);

const Services = () => {
    return (
        <div className="w-full min-h-screen pt-32 pb-24 px-6 max-w-[1400px] mx-auto relative overflow-hidden bg-transparent">
            <Helmet>
                <title>Export Import & Logistics Services | Paccha Shipping India</title>
                <meta name="description" content="Explore our full suite of logistics services: Ocean Freight, Air Freight, Road Transport, Customs Clearance, Warehousing, and Documentation. Licensed and global solutions." />
                <meta name="keywords" content="logistics services India, freight forwarding solutions, export import services Chennai, global trade logistics, Paccha Shipping services" />
                <link rel="canonical" href="https://pacchashipping.in/services" />
            </Helmet>
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-brand-primary/10 to-transparent blur-3xl pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center mb-24 relative z-10"
            >
                <span className="text-brand-highlight tracking-widest uppercase text-sm font-bold mb-4 block">Export & Import Solutions</span>
                <h1 className="text-5xl md:text-[5.5rem] font-bold text-white mb-6 tracking-tight leading-tight">
                    Complete Logistics Services<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">for Global Trade.</span>
                </h1>
                <p className="max-w-3xl mx-auto text-gray-400 text-xl font-medium leading-relaxed">
                    From customs clearance and freight forwarding to door-to-door delivery and warehousing — Paccha Universal Shipping Line manages every stage of your international supply chain. Licensed. Reliable. Global.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">

                {/* Primary Large Tile */}
                <div className="lg:col-span-2">
                    <ServiceCard
                        icon={FiAnchor}
                        title="Ocean & Sea Freight (FCL / LCL)"
                        desc="Complete ocean freight solutions for all cargo types. We offer Full Container Load (FCL) and Less than Container Load (LCL) services, handling export documentation, shipping bill, Bill of Lading, and customs clearance at origin and destination ports. Competitive rates across 50+ trade lanes."
                        delay={0.1}
                        imgSrc="/paccha_ocean_freight.png"
                        to="/services/ocean"
                        badge="Most Popular"
                    />
                </div>

                <ServiceCard
                    icon={FiSettings}
                    title="Customs Clearance & Brokerage"
                    desc="End-to-end customs clearance for both imports and exports. Our licensed customs brokers manage IEC verification, duty assessment, HS code classification, document filing at customs, and duty drawback claims — ensuring zero delays and full compliance."
                    delay={0.2}
                    to="/contact"
                />

                <ServiceCard
                    icon={FiGlobe}
                    title="Air Freight Export & Import"
                    desc="Time-critical shipments handled with speed and precision. We arrange cargo space with leading airlines, manage air waybill documentation, compliance certificates, and customs clearance at airport customs — connecting India to 100+ global destinations."
                    delay={0.3}
                    to="/services/air"
                />

                {/* Second Large Tile */}
                <div className="lg:col-span-2">
                    <ServiceCard
                        icon={FiBox}
                        title="Warehousing, Packing & Distribution"
                        desc="Secure bonded and open warehousing near Chennai seaport and airport. Services include cargo consolidation, CFS handling, palletizing, shrink-wrapping, repacking, inventory management, and last-mile distribution to any destination across India."
                        delay={0.4}
                        imgSrc="/paccha_road_freight.png"
                        to="/services/warehousing"
                    />
                </div>

                <ServiceCard
                    icon={FiTruck}
                    title="Road & Inland Transport"
                    desc="Reliable container truck movement, port haulage, factory stuffing, and over-dimensional cargo transportation across India. Dedicated fleet for movement between factories, ICDs, CFSs, and ports with real-time tracking."
                    delay={0.5}
                    to="/services/road"
                />

                <ServiceCard
                    icon={FiFileText}
                    title="Export-Import Documentation"
                    desc="Complete trade documentation services including Shipping Bills, Bill of Lading, Invoice & Packing Lists, Certificate of Origin, Phytosanitary Certificates, Pre-shipment Inspection, LC Negotiation, and more for smooth clearance."
                    delay={0.6}
                    to="/contact"
                />

                <ServiceCard
                    icon={FiPackage}
                    title="Cargo Consolidation (LCL)"
                    desc="We consolidate smaller shipments from multiple exporters into a single FCL container, reducing freight costs significantly for businesses that cannot fill a complete container. Weekly consolidation services to major global destinations."
                    delay={0.7}
                    to="/services/ocean"
                />

                <ServiceCard
                    icon={FiShield}
                    title="Cargo Insurance"
                    desc="Comprehensive marine insurance for all types of cargo — sea, air, and inland. We arrange Institute Cargo Clauses (A, B, C) coverage, project cargo insurance, and open policy arrangements through leading insurers."
                    delay={0.8}
                    to="/contact"
                />

                <ServiceCard
                    icon={FiAlertTriangle}
                    title="Hazardous & Special Cargo"
                    desc="Specialized handling for dangerous goods, chemicals, pharmaceuticals, temperature-sensitive cargo, and oversized project cargo. IATA and IMDG compliant. Our team ensures all regulatory requirements are met for safe transit."
                    delay={0.9}
                    to="/contact"
                />

                <ServiceCard
                    icon={FiTrendingUp}
                    title="Supply Chain Consulting"
                    desc="We help businesses optimize their international trade operations — recommending the most cost-effective shipping modes, trade lanes, incoterms, and customs strategies. Ideal for companies starting or scaling global exports and imports."
                    delay={1}
                    to="/contact"
                />
            </div>

            {/* CTA Banner */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mt-24 p-12 rounded-[2rem] bg-gradient-to-br from-brand-primary/20 to-black/50 border border-brand-primary/30 text-center"
            >
                <h3 className="text-3xl md:text-4xl font-black text-white mb-4">Not Sure Which Service You Need?</h3>
                <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">Talk to our logistics experts. We'll assess your shipment and recommend the best, most cost-effective solution for your trade requirements.</p>
                <Link to="/contact" className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-highlight text-white font-bold px-10 py-4 rounded-full transition-all hover:-translate-y-1 shadow-[0_4px_20px_rgba(45,106,79,0.4)]">
                    Get Free Consultation <FiArrowRight />
                </Link>
            </motion.div>
        </div>
    );
};

export default Services;
