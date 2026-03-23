import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight, FiCheckCircle, FiClock, FiPackage, FiGlobe, FiShield } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

gsap.registerPlugin(ScrollTrigger);

const features = [
    "Express & Standard Air Cargo",
    "Door-to-Door Air Delivery",
    "Air Waybill (AWB) Processing",
    "Priority & Charter Flights",
    "Dangerous Goods (DG) by Air",
    "Temperature-Controlled Cargo",
    "Customs Clearance at Airport",
    "IATA-Compliant Packing & Labelling",
];

const procesSteps = [
    { step: '01', title: 'Booking & Rate Confirmation', desc: 'We provide competitive freight rates and confirm space with airline partners for your cargo.' },
    { step: '02', title: 'Pickup & Packing Check', desc: 'Our team picks up the cargo and ensures it meets IATA packing and labelling requirements.' },
    { step: '03', title: 'Export Documentation', desc: 'We prepare the Air Waybill, commercial invoice, packing list, and all required export declarations.' },
    { step: '04', title: 'Loading & Departure', desc: 'Cargo is loaded on the flight. We provide you the AWB number for real-time tracking.' },
    { step: '05', title: 'Import Customs Clearance', desc: 'Our destination agents handle import customs clearance at the destination airport.' },
    { step: '06', title: 'Delivery to Consignee', desc: 'Final delivery is made to the consignee\'s door with proof of delivery.' },
];

const AirFreight = () => {
    const planeRef = useRef(null);

    useEffect(() => {
        gsap.to(planeRef.current, {
            scale: 1.15,
            y: 30,
            x: 10,
            scrollTrigger: {
                trigger: ".air-hero",
                start: "top top",
                end: "bottom top",
                scrub: 1,
            }
        });
    }, []);

    return (
        <div className="min-h-screen bg-[#050a07] pt-32 pb-20 overflow-hidden relative">
            <Helmet>
                <title>Air Freight &amp; Cargo Services | Fast Global Shipping Chennai India</title>
                <meta name="description" content="Express air freight and cargo solutions from Chennai airport. Time-critical worldwide delivery to 100+ countries, IATA-compliant handling, and customs clearance. Get a free air freight quote." />
                <meta name="keywords" content="air freight Chennai, air cargo India, express air shipping Chennai, export air cargo India, air freight forwarder Tamil Nadu, international air cargo Chennai airport" />
                <link rel="canonical" href="https://pacchashipping.in/services/air" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://pacchashipping.in/services/air" />
                <meta property="og:title" content="Air Freight from Chennai | Fast Global Air Cargo | Paccha Shipping" />
                <meta property="og:description" content="Fast, IATA-compliant air cargo to 100+ global destinations from Chennai. Door-to-door, customs clearance, DG handling." />
                <meta property="og:image" content="https://pacchashipping.in/paccha_air_freight.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Air Freight from Chennai | Paccha Shipping" />
                <meta name="twitter:description" content="Fast air cargo from Chennai to 100+ destinations. IATA-compliant, customs cleared, door-to-door." />
                <meta name="twitter:image" content="https://pacchashipping.in/paccha_air_freight.png" />
                <script type="application/ld+json">{`{"@context":"https://schema.org","@type":"Service","name":"Air Freight Export and Import","serviceType":"Air Cargo","provider":{"@type":"LocalBusiness","name":"Paccha Universal Shipping Line Pvt Ltd","url":"https://pacchashipping.in","telephone":"+91-98413-93916","address":{"@type":"PostalAddress","addressLocality":"Chennai","addressRegion":"Tamil Nadu","postalCode":"600099","addressCountry":"IN"}},"areaServed":["India","United Arab Emirates","Singapore","United Kingdom","United States","Germany"],"description":"IATA-compliant air freight and express cargo services from Chennai International Airport to 100+ global destinations."}`}</script>
                <script type="application/ld+json">{`{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How long does air freight from Chennai take?","acceptedAnswer":{"@type":"Answer","text":"Chennai to Dubai is 1-2 days, Chennai to Europe is 2-3 days, Chennai to USA is 3-5 days."}},{"@type":"Question","name":"Can Paccha Shipping handle dangerous goods by air?","acceptedAnswer":{"@type":"Answer","text":"Yes, our team is trained in IATA Dangerous Goods Regulations and can handle DG cargo by air with proper documentation."}},{"@type":"Question","name":"What documents are needed for air freight export from India?","acceptedAnswer":{"@type":"Answer","text":"Key documents include the Air Waybill (AWB), Commercial Invoice, Packing List, Shipping Bill, IEC, and any commodity-specific permits."}},{"@type":"Question","name":"Does Paccha Shipping offer door-to-door air freight service?","acceptedAnswer":{"@type":"Answer","text":"Yes, we offer complete door-to-door air freight including factory pickup, export customs, airline booking, import clearance, and last-mile delivery."}}]}`}</script>
            </Helmet>
            <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/10 via-transparent to-transparent pointer-events-none"></div>

            {/* Hero */}
            <section className="air-hero relative max-w-7xl mx-auto px-6 mb-32 z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                        <span className="text-brand-highlight tracking-widest uppercase text-sm font-bold mb-4 block">Air Freight Services</span>
                        <h1 className="text-5xl md:text-7xl font-heading font-extrabold pb-4 text-white drop-shadow-lg">
                            Fast Air Cargo.<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-highlight to-brand-primary">Worldwide.</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-lg mb-8 font-light leading-relaxed">
                            Time-critical shipments demand speed and precision. Paccha Universal Shipping Line connects your cargo to 100+ global destinations via leading airlines — from small parcels to oversized freight.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/contact" className="px-8 py-4 rounded-full bg-brand-primary text-white hover:bg-brand-highlight transition-all font-bold text-lg inline-flex items-center gap-2 hover:-translate-y-1">
                                Get Air Freight Quote <FiArrowRight />
                            </Link>
                            <a href="tel:+919841393916" className="px-8 py-4 rounded-full border border-white/20 text-white hover:border-brand-primary/60 transition-all font-bold text-lg inline-flex items-center gap-2 hover:-translate-y-1">
                                Call: +91 98413 93916
                            </a>
                        </div>
                    </motion.div>

                    <div className="relative h-[400px] md:h-[500px] w-full mt-12 lg:mt-0">
                        <div className="absolute inset-0 overflow-hidden rounded-3xl glass-panel-dark border border-brand-highlight/30 shadow-[0_0_40px_rgba(99,102,241,0.2)]">
                            <div
                                ref={planeRef}
                                className="w-full h-full bg-cover bg-center origin-center"
                                style={{ backgroundImage: "url('/paccha_air_freight.png')" }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050a07] via-transparent to-transparent opacity-80"></div>
                            <div className="absolute bottom-6 left-6 flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-brand-highlight animate-pulse shadow-neon-brand"></div>
                                <span className="text-white font-bold text-sm tracking-widest uppercase">Tracking: AWB 176-55823041</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="max-w-7xl mx-auto px-6 relative z-10 mb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-3xl font-heading font-bold mb-4 text-white">What's Included in Our Air Freight Service</h2>
                        <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                            We handle every aspect of your air cargo — from pickup and packing verification at your factory to customs clearance and delivery at the destination. Our IATA-certified team ensures your shipment is always compliant, safe, and on time.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-gray-300 p-3 bg-white/5 rounded-xl border border-white/5">
                                    <FiCheckCircle className="text-brand-primary text-xl shrink-0" />
                                    <span className="text-sm font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="glass-panel p-6 flex flex-col justify-center items-center text-center rounded-2xl">
                            <FiClock className="text-brand-highlight text-4xl mb-3" />
                            <span className="text-4xl font-heading font-bold text-brand-highlight mb-2">24/7</span>
                            <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">Operations Support</span>
                        </div>
                        <div className="glass-panel p-6 flex flex-col justify-center items-center text-center rounded-2xl">
                            <FiGlobe className="text-brand-primary text-4xl mb-3" />
                            <span className="text-4xl font-heading font-bold text-brand-primary mb-2">100+</span>
                            <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">Destinations</span>
                        </div>
                        <div className="glass-panel p-6 flex flex-col justify-center items-center text-center rounded-2xl">
                            <FiShield className="text-brand-highlight text-4xl mb-3" />
                            <span className="text-3xl font-heading font-bold text-brand-highlight mb-2">IATA</span>
                            <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">Compliant Handling</span>
                        </div>
                        <div className="glass-panel p-6 flex flex-col justify-center items-center text-center rounded-2xl">
                            <FiPackage className="text-brand-primary text-4xl mb-3" />
                            <span className="text-3xl font-heading font-bold text-brand-primary mb-2">DG</span>
                            <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">Dangerous Goods Approved</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="max-w-7xl mx-auto px-6 relative z-10 mb-24">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">How Our Air Freight Process Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {procesSteps.map(({ step, title, desc }) => (
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="glass-panel-dark rounded-2xl p-6 border border-white/5 hover:border-brand-primary/30 transition-all"
                        >
                            <span className="text-4xl font-black text-brand-primary/40 block mb-3">{step}</span>
                            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="bg-gradient-to-br from-brand-primary/20 to-black/40 border border-brand-primary/30 rounded-[2rem] p-12 text-center">
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to Ship by Air?</h3>
                    <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">Get a competitive air freight quote today. Our team will respond within a few hours with rates and transit times.</p>
                    <Link to="/contact" className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-highlight text-white font-bold px-10 py-4 rounded-full transition-all hover:-translate-y-1">
                        Request a Free Quote <FiArrowRight />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default AirFreight;
