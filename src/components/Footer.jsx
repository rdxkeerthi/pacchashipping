import React from 'react';
import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin, FiLinkedin, FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';

const Footer = () => {
    return (
        <footer className="relative mt-20 pt-20 pb-10 bg-[#050a07] border-t border-brand-primary/30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-20">
            <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                {/* Brand Info */}
                <div className="col-span-1 md:col-span-1">
                    <Link to="/" className="flex items-center gap-3 mb-6 group">
                        <img src="/paccha_logo.png" alt="Paccha Logo" className="w-14 h-14 object-contain group-hover:scale-110 transition-transform" />
                        <div>
                            <span className="font-bold text-2xl tracking-tighter text-white block">PACCHA</span>
                            <span className="text-xs text-gray-500 tracking-wider">Universal Shipping Line</span>
                        </div>
                    </Link>
                    <p className="text-gray-400 text-[15px] mb-4 max-w-xs leading-relaxed font-medium">
                        Paccha Universal Shipping Line Pvt. Ltd. — Your trusted export-import and freight forwarding partner since 2009. Chennai, India.
                    </p>
                    <p className="text-gray-500 text-xs mb-6">IEC Holder · Custom License Holder · DGFT Registered</p>
                    <div className="flex gap-4">
                        <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-primary transition-colors duration-300">
                            <FiFacebook />
                        </a>
                        <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-primary transition-colors duration-300">
                            <FiInstagram />
                        </a>
                        <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-primary transition-colors duration-300">
                            <FiLinkedin />
                        </a>
                        <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-primary transition-colors duration-300">
                            <FiTwitter />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="font-bold text-lg mb-6 text-white">Quick Links</h4>
                    <ul className="flex flex-col gap-4 text-[15px] text-gray-400 font-medium">
                        <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                        <li><Link to="/services" className="hover:text-white transition-colors">Our Services</Link></li>
                        <li><Link to="/updates" className="hover:text-white transition-colors">Trade News</Link></li>
                        <li><Link to="/customers" className="hover:text-white transition-colors">Our Clients</Link></li>
                        <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                        <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                    </ul>
                </div>

                {/* Services */}
                <div>
                    <h4 className="font-bold text-lg mb-6 text-white">Our Services</h4>
                    <ul className="flex flex-col gap-4 text-[15px] text-gray-400 font-medium">
                        <li><Link to="/services/ocean" className="hover:text-white transition-colors">Ocean & Sea Freight (FCL/LCL)</Link></li>
                        <li><Link to="/services/air" className="hover:text-white transition-colors">Air Freight Export & Import</Link></li>
                        <li><Link to="/services/road" className="hover:text-white transition-colors">Road & Inland Transport</Link></li>
                        <li><Link to="/services/warehousing" className="hover:text-white transition-colors">Warehousing & Distribution</Link></li>
                        <li><Link to="/services" className="hover:text-white transition-colors">Customs Clearance</Link></li>
                        <li><Link to="/services" className="hover:text-white transition-colors">Cargo Insurance</Link></li>
                    </ul>
                </div>

                {/* Contact info */}
                <div>
                    <h4 className="font-bold text-lg mb-6 text-white">Contact</h4>
                    <ul className="flex flex-col gap-6 text-[15px] text-gray-400 font-medium">
                        <li className="flex gap-4 items-start">
                            <div className="mt-1 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-brand-highlight shrink-0">
                                <FiMapPin />
                            </div>
                            <span>No.16, Dhanalakshmi Nagar, Kadappa Road, Puthagaram, Kolathur, Chennai - 600 099.</span>
                        </li>
                        <li className="flex gap-4 items-center">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-brand-highlight shrink-0">
                                <FiPhone />
                            </div>
                            <div>
                                <a href="tel:+919841393916" className="block hover:text-white transition-colors">+91 98413 93916</a>
                                <a href="tel:+919345021647" className="block hover:text-white transition-colors">+91 9345021647</a>
                            </div>
                        </li>
                        <li className="flex gap-4 items-center">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-brand-highlight shrink-0">
                                <FiMail />
                            </div>
                            <a href="mailto:admin@pacchashipping.in" className="hover:text-white transition-colors">admin@pacchashipping.in</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm font-medium text-gray-500 gap-4">
                <p>© {new Date().getFullYear()} Paccha Universal Shipping Line Pvt Ltd. All rights reserved.</p>
                <div className="flex gap-8">
                    <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    <Link to="#" className="hover:text-white transition-colors">Sitemap</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
