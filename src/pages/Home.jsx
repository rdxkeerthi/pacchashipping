import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiGlobe, FiTruck, FiAnchor, FiPackage, FiCheckCircle, FiShield, FiClock, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StatItem = ({ end, label, suffix = '+', prefix = '' }) => {
    const nodeRef = useRef();

    useEffect(() => {
        let obj = { val: 0 };
        const tl = gsap.to(obj, {
            val: end,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: nodeRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            onUpdate: () => {
                if (nodeRef.current) {
                    nodeRef.current.innerHTML = prefix + Math.floor(obj.val) + suffix;
                }
            }
        });
        return () => tl.kill();
    }, [end, suffix, prefix]);

    return (
        <div className="flex flex-col items-center p-8 bg-black/40 backdrop-blur-2xl rounded-[2rem] border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_40px_rgba(45,106,79,0.3)] hover:border-brand-primary/40 transition-all duration-500">
            <h3 ref={nodeRef} className="text-5xl md:text-7xl font-extrabold text-white mb-3 tracking-tighter">{prefix}0{suffix}</h3>
            <p className="text-gray-400 font-bold tracking-widest uppercase text-xs md:text-sm text-center">{label}</p>
        </div>
    );
};

const SERVICE_ROUTES = {
    'Air Freight Export & Import': '/services/air',
    'Ocean & Sea Freight': '/services/ocean',
    'Road & Ground Transport': '/services/road',
    'Warehousing & Distribution': '/services/warehousing',
};

const ServiceCard = ({ title, description, image, Icon }) => {
    const route = SERVICE_ROUTES[title] || '/services';
    return (
        <motion.div
            initial={{ opacity: 0, y: 150 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-7xl mx-auto my-32 relative overflow-hidden rounded-[2.5rem] glass-panel-dark border border-white/10 flex flex-col md:flex-row group shadow-[0_10px_50px_rgba(0,0,0,0.8)]"
        >
            <div className="md:w-[45%] p-12 md:p-16 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/5 relative z-10 bg-[#050a07]/80 backdrop-blur-2xl">
                <div className="w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-brand-primary/30 to-black/50 flex items-center justify-center text-4xl text-brand-primary mb-10 border border-brand-primary/40 shadow-inner">
                    <Icon />
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white tracking-tight leading-[1.1]">{title}</h2>
                <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-12 font-medium">{description}</p>
                <Link to={route} className="inline-flex w-fit items-center gap-3 text-background font-bold bg-brand-primary hover:bg-brand-secondary px-8 py-4 rounded-full transition-all shadow-[0_4px_20px_rgba(45,106,79,0.4)] hover:shadow-neon-brand hover:-translate-y-1">
                    Learn More <FiArrowRight className="text-xl" />
                </Link>
            </div>
            <div className="md:w-[55%] h-[400px] md:h-auto relative overflow-hidden bg-[#050a07]">
                <img src={image} alt={title} loading="lazy" decoding="async" className="w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-100 transition-all duration-[2s] ease-out mix-blend-luminosity group-hover:mix-blend-normal" />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-[#050a07]/90 via-[#050a07]/20 to-transparent"></div>
            </div>
        </motion.div>
    );
};

const WhyUsCard = ({ icon: Icon, title, description }) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-5 p-8 bg-black/30 backdrop-blur-xl rounded-[1.5rem] border border-white/8 hover:border-brand-primary/40 hover:bg-brand-primary/5 transition-all duration-500 group"
    >
        <div className="w-14 h-14 rounded-2xl bg-brand-primary/15 flex items-center justify-center text-2xl text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
            <Icon />
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-gray-400 leading-relaxed text-[15px]">{description}</p>
    </motion.div>
);

const Home = () => {
    const { scrollYProgress } = useScroll();
    const yHeroText = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

    return (
        <div className="w-full relative bg-transparent min-h-screen">
            <Helmet>
                <title>Paccha Shipping | Best Export Import & Logistics Company in Chennai India</title>
                <meta name="description" content="Paccha Universal Shipping Line — India's leading export import company in Chennai. Specialists in Ocean Freight, Air Freight, Customs Clearance, and Global Logistics. Partner with us for seamless international trade since 2009." />
                <meta name="keywords" content="export import company Chennai, logistics solutions India, freight forwarding Chennai, international shipping India, customs clearance agent, sea freight Chennai, air cargo India, Paccha Shipping" />
                <link rel="canonical" href="https://pacchashipping.in/" />

                {/* FAQ Structured Data for Rich Snippets */}
                <script type="application/ld+json">
                    {`
                {
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": [
                        {
                            "@type": "Question",
                            "name": "What services does Paccha Shipping provide?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Paccha Shipping provides comprehensive logistics solutions including Ocean Freight (FCL/LCL), Air Freight, Road Transport, Customs Clearance, Warehousing, and Export-Import documentation."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "Where is Paccha Shipping located?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Our headquarters is located in Chennai, Tamil Nadu, India, serving global trade routes across 50+ countries."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "Does Paccha Shipping handle customs clearance?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Yes, we are a licensed Custom House Agent (CHA) providing expert import and export clearance services at all major ports and airports."
                            }
                        }
                    ]
                }
                `}
                </script>
            </Helmet>

            {/* FULL SCREEN VIDEO BACKGROUND */}
            <div className="fixed inset-0 w-full h-[100vh] z-[-1] pointer-events-none">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-[0.75]">
                    <source src="/introvideo.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#050a07]/80"></div>
            </div>

            {/* HERO SECTION */}
            <div className="h-screen w-full flex flex-col items-center justify-center pt-20 relative z-10 px-6">
                <motion.div style={{ y: yHeroText, opacity: opacityHero }} className="text-center w-full max-w-7xl mx-auto flex flex-col items-center">
                    <motion.span
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.05 }}
                        className="text-brand-highlight tracking-widest uppercase text-sm font-bold mb-6 block px-4 py-2 bg-brand-primary/10 rounded-full border border-brand-primary/30"
                    >
                        Trusted Export & Import Partner Since 2009
                    </motion.span>
                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
                        className="text-6xl md:text-[9rem] lg:text-[11rem] font-black pb-6 leading-[0.85] tracking-tighter text-white drop-shadow-2xl"
                    >
                        Logistics,<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-highlight to-brand-primary">Simplified.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                        className="mt-8 text-lg md:text-2xl text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed"
                    >
                        Paccha Universal Shipping Line — India's premier export-import & logistics company. We move your goods across air, sea & road with precision, speed, and care.
                    </motion.p>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                        className="mt-10 flex flex-col sm:flex-row gap-4"
                    >
                        <Link to="/services" className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-highlight text-white font-bold px-8 py-4 rounded-full transition-all shadow-[0_4px_20px_rgba(45,106,79,0.5)] hover:-translate-y-1">
                            Our Services <FiArrowRight />
                        </Link>
                        <Link to="/contact" className="inline-flex items-center gap-2 border border-white/20 hover:border-brand-primary/60 text-white font-bold px-8 py-4 rounded-full transition-all hover:bg-white/5 hover:-translate-y-1">
                            Get a Free Quote
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* STATS SECTION */}
            <section className="py-20 relative z-10 bg-transparent scroll-mt-32">
                <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                    <StatItem end={15} label="Years of Excellence" />
                    <StatItem end={5000} suffix="+" label="Shipments Delivered" />
                    <StatItem end={50} suffix="+" label="Countries Served" />
                    <StatItem end={98} suffix="%" label="On-Time Delivery Rate" />
                </div>
            </section>

            {/* INTRO SECTION */}
            <section className="py-20 px-6 relative z-10">
                <div className="max-w-[1400px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
                    >
                        <div>
                            <span className="text-brand-highlight tracking-widest uppercase text-sm font-bold mb-6 block">About Paccha Shipping</span>
                            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1] mb-8">
                                Moving Trade.<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-highlight to-brand-primary">Connecting Worldwide.</span>
                            </h2>
                            <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                Paccha Universal Shipping Line Private Limited is a full-service export-import and logistics company headquartered in Chennai, India. Since 2009, we have been facilitating seamless international trade for businesses of all sizes — from SMEs to large corporations.
                            </p>
                            <p className="text-gray-400 text-lg leading-relaxed mb-10">
                                We specialize in customs clearance, freight forwarding, cargo consolidation, door-to-door delivery, and complete supply chain management across 50+ countries worldwide.
                            </p>
                            <Link to="/contact" className="inline-flex items-center gap-3 bg-brand-primary hover:bg-brand-highlight text-white font-bold px-8 py-4 rounded-full transition-all hover:-translate-y-1 shadow-[0_4px_20px_rgba(45,106,79,0.4)]">
                                Partner With Us <FiArrowRight />
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: FiCheckCircle, text: 'Licensed Customs Broker' },
                                { icon: FiShield, text: 'Cargo Insurance Support' },
                                { icon: FiClock, text: '24/7 Shipment Tracking' },
                                { icon: FiStar, text: 'ISO Certified Operations' },
                                { icon: FiGlobe, text: '50+ Country Network' },
                                { icon: FiPackage, text: 'All Commodity Types' },
                            ].map(({ icon: Icon, text }) => (
                                <div key={text} className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl">
                                    <Icon className="text-brand-primary text-xl shrink-0" />
                                    <span className="text-white text-sm font-semibold">{text}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SERVICES SECTION */}
            <section className="py-32 px-6 relative z-10 bg-transparent">
                <div className="text-center md:text-left md:ml-[5%] mb-24 max-w-4xl">
                    <span className="text-brand-highlight tracking-widest uppercase text-sm font-bold mb-6 block">What We Offer</span>
                    <h2 className="text-5xl md:text-8xl font-black text-white tracking-tight drop-shadow-2xl leading-[1]">Complete<br />Logistics Solutions.</h2>
                </div>

                <ServiceCard
                    title="Ocean & Sea Freight"
                    description="Cost-effective FCL and LCL ocean freight solutions connecting India to global markets. We manage all aspects of sea cargo — from port-to-port to door-to-door — with full customs documentation, Bill of Lading, and cargo tracking support."
                    image="/paccha_ocean_freight.png"
                    Icon={FiAnchor}
                />

                <ServiceCard
                    title="Air Freight Export & Import"
                    description="Fast, secure air cargo services for time-sensitive shipments. We handle export documentation, customs clearance, and door-to-door delivery for all air freight — from small parcels to oversized cargo across 100+ destinations worldwide."
                    image="/paccha_air_freight.png"
                    Icon={FiGlobe}
                />

                <ServiceCard
                    title="Road & Ground Transport"
                    description="Reliable inland transportation across India and neighbouring countries. Our fleet and partner network ensures safe, timely delivery for all cargo types — from regular consignments to heavy and over-dimensional freight."
                    image="/paccha_road_freight.png"
                    Icon={FiTruck}
                />

                <ServiceCard
                    title="Warehousing & Distribution"
                    description="Secure bonded and non-bonded warehousing facilities at Chennai with modern inventory management. We offer flexible storage, cargo consolidation, palletizing, repacking, and last-mile distribution services."
                    image="/paccha_warehouse.png"
                    Icon={FiPackage}
                />
            </section>

            {/* WHY CHOOSE US */}
            <section className="py-24 px-6 relative z-10">
                <div className="max-w-[1400px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <span className="text-brand-highlight tracking-widest uppercase text-sm font-bold mb-4 block">Why Businesses Choose Us</span>
                        <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">
                            The Paccha Advantage
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <WhyUsCard
                            icon={FiShield}
                            title="Licensed & Compliant"
                            description="We are registered with DGFT, customs, IATA, and all relevant trade authorities. Your exports and imports are always 100% compliant with Indian and international trade regulations."
                        />
                        <WhyUsCard
                            icon={FiClock}
                            title="End-to-End Visibility"
                            description="Real-time shipment tracking from pickup to final delivery. Our team provides proactive updates and instant communication so you always know where your cargo is."
                        />
                        <WhyUsCard
                            icon={FiGlobe}
                            title="Global Agent Network"
                            description="Established partnerships with freight agents, shipping lines, and airlines across 50+ countries. We negotiate the best rates and ensure your cargo moves through trusted channels."
                        />
                        <WhyUsCard
                            icon={FiPackage}
                            title="Customs & Documentation"
                            description="Our expert customs brokers handle all export-import documentation — shipping bills, BoL, LC, certificates of origin, duty drawback filings, and more — ensuring zero delays at customs."
                        />
                        <WhyUsCard
                            icon={FiStar}
                            title="Competitive Pricing"
                            description="We offer transparent, competitive freight rates with no hidden charges. Our consolidation services make international shipping affordable even for small and medium businesses."
                        />
                        <WhyUsCard
                            icon={FiCheckCircle}
                            title="Dedicated Account Manager"
                            description="Every client gets a dedicated relationship manager who understands your business, your commodity, and your trade lanes — providing personalized service and priority attention."
                        />
                    </div>
                </div>
            </section>

            {/* COMMODITIES / INDUSTRIES */}
            <section className="py-24 px-6 relative z-10">
                <div className="max-w-[1400px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <span className="text-brand-highlight tracking-widest uppercase text-sm font-bold mb-4 block">Industries We Serve</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                            We Ship Across All Industries
                        </h2>
                        <p className="text-gray-400 text-xl mt-4 max-w-2xl mx-auto">From textiles to electronics, pharma to machinery — we have the expertise to handle your specific commodity with care and compliance.</p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            'Textiles & Garments', 'Electronics & Machinery', 'Pharmaceuticals', 'Chemicals & Hazmat',
                            'Automobile Parts', 'Agricultural Products', 'Food & Perishables', 'Industrial Equipment',
                            'Consumer Goods', 'Project Cargo', 'Raw Materials', 'E-Commerce Shipments'
                        ].map((industry) => (
                            <motion.div
                                key={industry}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center hover:border-brand-primary/40 hover:bg-brand-primary/10 transition-all duration-300 cursor-default"
                            >
                                <span className="text-gray-300 font-semibold text-sm">{industry}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="py-24 px-6 relative z-10">
                <div className="max-w-[1400px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9 }}
                        className="bg-gradient-to-br from-brand-primary/20 to-black/40 backdrop-blur-2xl border border-brand-primary/30 rounded-[2.5rem] p-16 text-center shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
                            Ready to Ship Globally?
                        </h2>
                        <p className="text-gray-300 text-xl max-w-2xl mx-auto mb-10">
                            Contact our logistics experts today for a free consultation and competitive freight quote. We handle everything from documentation to delivery.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-highlight text-white font-bold px-10 py-5 rounded-full transition-all shadow-[0_4px_20px_rgba(45,106,79,0.5)] hover:-translate-y-1 text-lg">
                                Request a Free Quote <FiArrowRight />
                            </Link>
                            <a href="tel:+919841393916" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-brand-primary/60 text-white font-bold px-10 py-5 rounded-full transition-all hover:bg-white/5 hover:-translate-y-1 text-lg">
                                Call Us: +91 98413 93916
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <div className="h-20"></div>
        </div>
    );
};

export default Home;
