import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight, FiCheckCircle, FiAnchor, FiPackage, FiGlobe, FiFileText } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

gsap.registerPlugin(ScrollTrigger);

const features = [
    "FCL (Full Container Load)",
    "LCL (Less than Container Load)",
    "Break Bulk Cargo",
    "RO-RO (Roll-on Roll-off)",
    "Reefer / Temperature-Controlled",
    "Over-Dimensional Project Cargo",
    "Port-to-Port & Door-to-Door",
    "Bill of Lading (BoL) Preparation",
];

const tradelanes = [
    { from: 'Chennai', to: 'Dubai / Jebel Ali', transit: '10–14 days' },
    { from: 'Chennai', to: 'Singapore', transit: '7–10 days' },
    { from: 'Chennai', to: 'Hamburg / Rotterdam', transit: '22–28 days' },
    { from: 'Chennai', to: 'New York / Los Angeles', transit: '28–35 days' },
    { from: 'Chennai', to: 'Colombo', transit: '3–5 days' },
    { from: 'Chennai', to: 'Nhava Sheva (Mumbai)', transit: 'Coastal' },
];

const OceanFreight = () => {
    const shipRef = useRef(null);

    useEffect(() => {
        gsap.to(shipRef.current, {
            scale: 1.15,
            x: -20,
            y: -10,
            scrollTrigger: {
                trigger: ".ocean-hero",
                start: "top top",
                end: "bottom top",
                scrub: 1
            }
        });
    }, []);

    return (
        <div className="min-h-screen bg-[#050a07] pt-32 pb-20 overflow-hidden relative">
            <Helmet>
                <title>Ocean Freight FCL LCL Shipping | Global Sea Freight Services Chennai India</title>
                <meta name="description" content="Cost-effective FCL and LCL ocean freight solutions from Chennai to global ports. Expert container shipping, Bill of Lading documentation, and port-to-door delivery." />
                <meta name="keywords" content="ocean freight Chennai, sea freight India, FCL shipping, LCL shipping Chennai, container shipping India, shipping company Tamil Nadu" />
                <link rel="canonical" href="https://pacchashipping.in/services/ocean" />
            </Helmet>
            <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/10 via-transparent to-transparent pointer-events-none"></div>

            {/* Hero */}
            <section className="ocean-hero relative max-w-7xl mx-auto px-6 mb-32 z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                        <span className="text-brand-highlight tracking-widest uppercase text-sm font-bold mb-4 block">Ocean & Sea Freight</span>
                        <h1 className="text-5xl md:text-7xl font-heading font-extrabold pb-4 text-white drop-shadow-lg">
                            Ship Globally.<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-highlight to-brand-primary">Pay Less.</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-lg mb-8 font-light leading-relaxed">
                            The most economical way to move large volumes of cargo across the world. We offer FCL and LCL ocean freight from Chennai to all major global ports — with full documentation and customs support.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/contact" className="px-8 py-4 rounded-full bg-brand-primary text-white hover:bg-brand-highlight transition-all font-bold text-lg inline-flex items-center gap-2 hover:-translate-y-1">
                                Get Ocean Freight Quote <FiArrowRight />
                            </Link>
                            <a href="tel:+919841393916" className="px-8 py-4 rounded-full border border-white/20 text-white hover:border-brand-primary/60 transition-all font-bold text-lg inline-flex items-center gap-2 hover:-translate-y-1">
                                Call: +91 98413 93916
                            </a>
                        </div>
                    </motion.div>

                    <div className="relative h-[400px] md:h-[500px] w-full mt-12 lg:mt-0">
                        <div className="absolute inset-0 overflow-hidden rounded-3xl glass-panel-dark border border-brand-highlight/30 shadow-[0_0_40px_rgba(99,102,241,0.2)]">
                            <div
                                ref={shipRef}
                                className="w-full h-full bg-cover bg-center origin-center"
                                style={{ backgroundImage: "url('/paccha_ocean_freight.png')" }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050a07] via-transparent to-transparent opacity-80"></div>
                            <div className="absolute bottom-6 left-6 flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-brand-highlight animate-pulse shadow-neon-brand"></div>
                                <span className="text-white font-bold text-sm tracking-widest uppercase">Vessel: MV Paccha Fortune</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FCL vs LCL */}
            <section className="max-w-7xl mx-auto px-6 relative z-10 mb-24">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">FCL or LCL — We Handle Both</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="glass-panel-dark p-8 rounded-2xl border border-brand-primary/30">
                        <div className="w-14 h-14 rounded-2xl bg-brand-primary/15 flex items-center justify-center text-2xl text-brand-primary mb-6"><FiPackage /></div>
                        <h3 className="text-2xl font-bold text-white mb-3">FCL — Full Container Load</h3>
                        <p className="text-gray-400 leading-relaxed mb-4">
                            Ideal when your cargo fills or nearly fills a container. We offer 20ft, 40ft, 40ft HC, and specialised container types. Direct, faster transit with no sharing.
                        </p>
                        <ul className="text-gray-300 text-sm space-y-2">
                            <li className="flex items-center gap-2"><FiCheckCircle className="text-brand-primary shrink-0" /> Dedicated container — your cargo only</li>
                            <li className="flex items-center gap-2"><FiCheckCircle className="text-brand-primary shrink-0" /> Faster transit — direct port-to-port</li>
                            <li className="flex items-center gap-2"><FiCheckCircle className="text-brand-primary shrink-0" /> Lower rate per CBM at higher volumes</li>
                        </ul>
                    </div>
                    <div className="glass-panel-dark p-8 rounded-2xl border border-brand-highlight/30">
                        <div className="w-14 h-14 rounded-2xl bg-brand-highlight/15 flex items-center justify-center text-2xl text-brand-highlight mb-6"><FiGlobe /></div>
                        <h3 className="text-2xl font-bold text-white mb-3">LCL — Less than Container Load</h3>
                        <p className="text-gray-400 leading-relaxed mb-4">
                            Perfect for smaller shipments that don't fill a container. We consolidate cargo from multiple shippers, significantly reducing your freight cost.
                        </p>
                        <ul className="text-gray-300 text-sm space-y-2">
                            <li className="flex items-center gap-2"><FiCheckCircle className="text-brand-highlight shrink-0" /> Pay only for space you use</li>
                            <li className="flex items-center gap-2"><FiCheckCircle className="text-brand-highlight shrink-0" /> Weekly consolidation sailings</li>
                            <li className="flex items-center gap-2"><FiCheckCircle className="text-brand-highlight shrink-0" /> Ideal for SME exporters</li>
                        </ul>
                    </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-gray-300 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-brand-primary/30 transition-all">
                            <FiCheckCircle className="text-brand-primary text-xl shrink-0" />
                            <span className="text-sm font-medium">{feature}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Trade Lanes */}
            <section className="max-w-7xl mx-auto px-6 relative z-10 mb-24">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Popular Trade Lanes from Chennai</h2>
                <div className="overflow-x-auto rounded-2xl border border-white/10">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/5 text-gray-400 text-xs uppercase tracking-widest">
                                <th className="px-6 py-4">Origin Port</th>
                                <th className="px-6 py-4">Destination Port</th>
                                <th className="px-6 py-4">Approx. Transit Time</th>
                                <th className="px-6 py-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tradelanes.map(({ from, to, transit }, idx) => (
                                <tr key={idx} className="border-t border-white/5 hover:bg-white/3 transition-colors">
                                    <td className="px-6 py-4 text-white font-medium">{from}</td>
                                    <td className="px-6 py-4 text-gray-300">{to}</td>
                                    <td className="px-6 py-4 text-brand-highlight font-semibold">{transit}</td>
                                    <td className="px-6 py-4">
                                        <Link to="/contact" className="text-brand-primary hover:text-brand-highlight text-sm font-semibold inline-flex items-center gap-1 transition-colors">
                                            Get Rate <FiArrowRight />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Documents */}
            <section className="max-w-7xl mx-auto px-6 relative z-10 mb-24">
                <div className="glass-panel-dark rounded-2xl p-8 border border-white/5">
                    <div className="flex items-start gap-5 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-brand-primary/15 flex items-center justify-center text-2xl text-brand-primary shrink-0"><FiFileText /></div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Documentation We Handle for Ocean Freight</h3>
                            <p className="text-gray-400">Our documentation team takes care of all export-import paperwork so you focus on your business.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {['Shipping Bill', 'Bill of Lading (BoL)', 'Commercial Invoice', 'Packing List', 'Certificate of Origin', 'Letter of Credit (LC)', 'Phytosanitary Certificate', 'Pre-Shipment Inspection'].map(doc => (
                            <div key={doc} className="p-3 bg-white/5 border border-white/5 rounded-xl text-gray-300 text-sm font-medium flex items-center gap-2">
                                <FiCheckCircle className="text-brand-primary shrink-0" /> {doc}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="bg-gradient-to-br from-brand-primary/20 to-black/40 border border-brand-primary/30 rounded-[2rem] p-12 text-center">
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to Ship by Sea?</h3>
                    <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">Get competitive FCL and LCL ocean freight rates from Chennai. We'll handle everything — documentation, customs, and delivery.</p>
                    <Link to="/contact" className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-highlight text-white font-bold px-10 py-4 rounded-full transition-all hover:-translate-y-1">
                        Request an Ocean Freight Quote <FiArrowRight />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default OceanFreight;
