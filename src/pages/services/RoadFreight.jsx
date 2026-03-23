import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight, FiCheckCircle, FiTruck, FiMapPin, FiClock, FiShield } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

gsap.registerPlugin(ScrollTrigger);

const features = [
    "Port Haulage & Container Trucking",
    "Factory Stuffing & De-stuffing",
    "Over-Dimensional Cargo Transport",
    "CFS / ICD Movement",
    "Multimodal Transport Solutions",
    "Cross-Border Road Freight",
    "Door-to-Door Inland Delivery",
    "GPS-Tracked Fleet",
];

const vehicleTypes = [
    { type: '20ft Container Truck', desc: 'For standard containers from port or ICD to factory/warehouse.' },
    { type: '40ft Container Trailer', desc: 'High-capacity trailer for larger FCL containers.' },
    { type: 'Flat Bed / Low Bed', desc: 'For oversized and over-dimensional cargo, machinery, and project equipment.' },
    { type: 'Mini Truck / LCV', desc: 'For last-mile delivery of smaller consignments within city limits.' },
    { type: 'Refrigerated Van', desc: 'Cold chain transport for perishables, pharmaceuticals, and temperature-sensitive cargo.' },
    { type: 'Tanker', desc: 'For bulk liquid cargo, chemicals, and food-grade liquids.' },
];

const RoadFreight = () => {
    const truckRef = useRef(null);

    useEffect(() => {
        gsap.to(truckRef.current, {
            scale: 1.1,
            x: 20,
            scrollTrigger: {
                trigger: ".road-hero",
                start: "top top",
                end: "bottom top",
                scrub: 1
            }
        });
    }, []);

    return (
        <div className="min-h-screen bg-[#050a07] pt-32 pb-20 overflow-hidden relative">
            <Helmet>
                <title>Road Freight &amp; Inland Transport | PAN India Logistics Chennai</title>
                <meta name="description" content="Reliable container trucking and inland road transport across India. Port haulage, factory stuffing, and GPS-tracked fleet for safe cargo delivery." />
                <meta name="keywords" content="road freight India, container trucking Chennai, inland transport Chennai, port haulage India, logistics trucking Chennai" />
                <link rel="canonical" href="https://pacchashipping.in/services/road" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://pacchashipping.in/services/road" />
                <meta property="og:title" content="Road Freight &amp; Inland Transport | Paccha Shipping" />
                <meta property="og:description" content="Reliable PAN India road transport, container trucking, and port haulage. GPS-tracked fleet for secure cargo movement." />
                <meta property="og:image" content="https://pacchashipping.in/paccha_road_freight.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Road Freight &amp; Inland Transport | Paccha Shipping" />
                <meta name="twitter:description" content="PAN India road transport, container trucking, and port haulage. Secure, GPS-tracked fleet." />
                <meta name="twitter:image" content="https://pacchashipping.in/paccha_road_freight.png" />
                <script type="application/ld+json">{`{"@context":"https://schema.org","@type":"Service","name":"Road Freight and Inland Transport","serviceType":"Transportation Service","provider":{"@type":"LocalBusiness","name":"Paccha Universal Shipping Line Pvt Ltd","url":"https://pacchashipping.in","telephone":"+91-98413-93916","address":{"@type":"PostalAddress","addressLocality":"Chennai","addressRegion":"Tamil Nadu","postalCode":"600099","addressCountry":"IN"}},"areaServed":["India"],"description":"Reliable PAN India road transport, container trucking, port haulage, and ODC cargo movement."}`}</script>
                <script type="application/ld+json">{`{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Does Paccha Shipping provide PAN India transport?","acceptedAnswer":{"@type":"Answer","text":"Yes, we provide road transport and container hauling services across all major cities and states in India."}},{"@type":"Question","name":"Do you handle Over Dimensional Cargo (ODC)?","acceptedAnswer":{"@type":"Answer","text":"Yes, we have flat bed and low bed trailers for handling heavy machinery and over dimensional cargo."}},{"@type":"Question","name":"Can you arrange trucks for factory stuffing?","acceptedAnswer":{"@type":"Answer","text":"Absolutely. We provide timely placement of empty containers at your factory for stuffing and transport them to the port."}}]}`}</script>
            </Helmet>
            <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/10 via-transparent to-transparent pointer-events-none"></div>

            {/* Hero */}
            <section className="road-hero relative max-w-7xl mx-auto px-6 mb-32 z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                        <span className="text-brand-highlight tracking-widest uppercase text-sm font-bold mb-4 block">Road & Inland Transport</span>
                        <h1 className="text-5xl md:text-7xl font-heading font-extrabold pb-4 text-white drop-shadow-lg">
                            Reliable Road<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-highlight to-brand-primary">Logistics.</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-lg mb-8 font-light leading-relaxed">
                            From port to factory, city to city, and cross-border — our road freight services ensure your cargo moves safely and on schedule across India and beyond.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/contact" className="px-8 py-4 rounded-full bg-brand-primary text-white hover:bg-brand-highlight transition-all font-bold text-lg inline-flex items-center gap-2 hover:-translate-y-1">
                                Request Road Transport Quote <FiArrowRight />
                            </Link>
                            <a href="tel:+919841393916" className="px-8 py-4 rounded-full border border-white/20 text-white hover:border-brand-primary/60 transition-all font-bold text-lg inline-flex items-center gap-2 hover:-translate-y-1">
                                Call: +91 98413 93916
                            </a>
                        </div>
                    </motion.div>

                    <div className="relative h-[400px] md:h-[500px] w-full mt-12 lg:mt-0">
                        <div className="absolute inset-0 overflow-hidden rounded-3xl glass-panel-dark border border-brand-highlight/30 shadow-[0_0_40px_rgba(99,102,241,0.2)]">
                            <div
                                ref={truckRef}
                                className="w-full h-full bg-cover bg-center origin-center"
                                style={{ backgroundImage: "url('/paccha_road_freight.png')" }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050a07] via-transparent to-transparent opacity-80"></div>
                            <div className="absolute bottom-6 left-6 flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                                <span className="text-white font-bold text-sm tracking-widest uppercase">GPS Tracked Fleet · On Route</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="max-w-7xl mx-auto px-6 relative z-10 mb-24">
                <h2 className="text-3xl font-bold text-white mb-8">Our Road Logistics Capabilities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-gray-300 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-brand-primary/30 transition-all">
                            <FiCheckCircle className="text-brand-primary text-xl shrink-0" />
                            <span className="text-sm font-medium">{feature}</span>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-panel p-6 rounded-2xl text-center">
                        <FiClock className="text-brand-highlight text-4xl mx-auto mb-3" />
                        <span className="text-3xl font-bold text-brand-highlight block mb-1">24/7</span>
                        <span className="text-gray-400 text-sm uppercase tracking-wider">Fleet Availability</span>
                    </div>
                    <div className="glass-panel p-6 rounded-2xl text-center">
                        <FiMapPin className="text-brand-primary text-4xl mx-auto mb-3" />
                        <span className="text-3xl font-bold text-brand-primary block mb-1">PAN India</span>
                        <span className="text-gray-400 text-sm uppercase tracking-wider">Delivery Coverage</span>
                    </div>
                    <div className="glass-panel p-6 rounded-2xl text-center">
                        <FiShield className="text-brand-highlight text-4xl mx-auto mb-3" />
                        <span className="text-3xl font-bold text-brand-highlight block mb-1">Insured</span>
                        <span className="text-gray-400 text-sm uppercase tracking-wider">Transit Coverage</span>
                    </div>
                </div>
            </section>

            {/* Vehicle Types */}
            <section className="max-w-7xl mx-auto px-6 relative z-10 mb-24">
                <h2 className="text-3xl font-bold text-white mb-8">Our Fleet & Vehicle Types</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vehicleTypes.map(({ type, desc }) => (
                        <motion.div
                            key={type}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="glass-panel-dark rounded-2xl p-6 border border-white/5 hover:border-brand-primary/30 transition-all"
                        >
                            <div className="w-12 h-12 rounded-xl bg-brand-primary/15 flex items-center justify-center text-brand-primary text-xl mb-4">
                                <FiTruck />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{type}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="bg-gradient-to-br from-brand-primary/20 to-black/40 border border-brand-primary/30 rounded-[2rem] p-12 text-center">
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-4">Need Inland Transport?</h3>
                    <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">Our road freight team will arrange the right vehicle for your cargo — from a single container movement to a full fleet deployment.</p>
                    <Link to="/contact" className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-highlight text-white font-bold px-10 py-4 rounded-full transition-all hover:-translate-y-1">
                        Get a Transport Quote <FiArrowRight />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default RoadFreight;
