import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiShield } from 'react-icons/fi';

const Section = ({ title, children }) => (
    <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 pb-3 border-b border-white/10">{title}</h2>
        <div className="text-gray-400 leading-relaxed space-y-4 text-[15px]">{children}</div>
    </div>
);

const TermsAndConditions = () => {
    return (
        <div className="min-h-screen bg-[#050a07] pt-32 pb-20 px-6 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/8 via-transparent to-transparent pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="w-16 h-16 rounded-2xl bg-brand-primary/15 flex items-center justify-center text-3xl text-brand-primary mx-auto mb-6">
                        <FiShield />
                    </div>
                    <span className="text-brand-highlight tracking-widest uppercase text-sm font-bold mb-4 block">Legal</span>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Terms & Conditions</h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        These terms govern your engagement with Paccha Universal Shipping Line Pvt. Ltd. Please read them carefully before using our services.
                    </p>
                    <p className="text-gray-500 text-sm mt-4">Last updated: March 2026 | Effective Date: January 1, 2024</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="glass-panel-dark rounded-[2rem] p-10 md:p-14 border border-white/5"
                >
                    <Section title="1. Definitions">
                        <p><strong className="text-white">"Company"</strong> refers to Paccha Universal Shipping Line Private Limited, registered in India, with offices at No.16, Dhanalakshmi Nagar, Kadappa Road, Puthagaram, Kolathur, Chennai – 600 099.</p>
                        <p><strong className="text-white">"Client"</strong> refers to any individual, company, or entity that engages the Company for freight forwarding, customs clearance, warehousing, or any logistics services.</p>
                        <p><strong className="text-white">"Services"</strong> includes but is not limited to: Ocean Freight (FCL/LCL), Air Freight, Customs Clearance, Warehousing, Road Transport, Export-Import Documentation, Cargo Insurance, and Supply Chain Consulting.</p>
                        <p><strong className="text-white">"Shipment"</strong> refers to any cargo goods entrusted to the Company for handling, forwarding, storage, or transportation.</p>
                    </Section>

                    <Section title="2. Scope of Services">
                        <p>The Company acts as a freight forwarder and logistics service provider. Our role may include, but is not limited to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Booking cargo space with ocean carriers and airlines</li>
                            <li>Preparing and filing export-import documentation (Shipping Bill, Bill of Lading, Air Waybill, etc.)</li>
                            <li>Customs clearance on behalf of the Client as a licensed Custom House Agent (CHA)</li>
                            <li>Arranging cargo transportation by road (port haulage, container trucking)</li>
                            <li>Warehousing, cargo consolidation (LCL), and distribution</li>
                            <li>Arranging cargo insurance through authorised insurers</li>
                        </ul>
                        <p>All services are subject to availability, applicable laws of India, and INCOTERMS agreed upon with the Client.</p>
                    </Section>

                    <Section title="3. Client Responsibilities">
                        <p>The Client agrees to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Provide accurate and complete shipping information, including commodity description, HS code, value, weight, and dimensions</li>
                            <li>Ensure all export-import documents are authentic and comply with applicable Indian customs and trade laws</li>
                            <li>Hold a valid Importer Exporter Code (IEC) and all licenses required for restricted or controlled goods</li>
                            <li>Declare hazardous, dangerous, or restricted goods truthfully prior to shipment</li>
                            <li>Pay all freight charges, customs duties, taxes, and ancillary charges within agreed payment terms</li>
                        </ul>
                    </Section>

                    <Section title="4. Freight Charges & Payment Terms">
                        <p>All quotations are subject to change based on prevailing freight market rates, fuel surcharges, port congestion, currency fluctuations, and carrier surcharges.</p>
                        <p>Unless otherwise agreed in writing:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Freight charges are due prior to cargo release or delivery</li>
                            <li>Customs duties, port charges, and demurrage are the sole responsibility of the Client</li>
                            <li>Outstanding invoices attract interest at 2% per month after the due date</li>
                            <li>The Company reserves the right to withhold the release of cargo or documents in case of outstanding dues</li>
                        </ul>
                    </Section>

                    <Section title="5. Liability & Limitations">
                        <p>The Company's liability is limited to the extent of its role as a freight forwarder. The Company is NOT liable for:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Loss or damage caused by acts of God, war, strikes, government action, or customs seizure</li>
                            <li>Delays, loss, or damage caused by ocean carriers, airlines, or road transporters (governed by their individual carrier's tariff)</li>
                            <li>Inaccurate information provided by the Client</li>
                            <li>Consequential, indirect, or special damages of any kind</li>
                            <li>Fluctuations in exchange rates affecting freight costs</li>
                        </ul>
                        <p>Where the Company is found liable, its maximum liability shall not exceed the freight charge paid for the specific shipment in question. For cargo insurance claims, the Client must have arranged marine insurance, and claims must be filed with the insurer directly.</p>
                    </Section>

                    <Section title="6. Cargo Insurance">
                        <p>The Company can arrange cargo insurance on behalf of the Client upon written request. Insurance will be arranged under the Institute Cargo Clauses or as specifically agreed. The Company shall not be responsible for any claim rejected by the insurer due to insufficient packing, inherent vice, or undeclared cargo value.</p>
                        <p>Clients are strongly encouraged to insure all shipments. The Company will not be held liable for uninsured cargo loss or damage beyond the freight value.</p>
                    </Section>

                    <Section title="7. Dangerous & Restricted Goods">
                        <p>Shipments containing Dangerous Goods (DG) must be declared to the Company in advance, properly classified, packed, marked, and labelled in compliance with IMDG (sea) or IATA DGR (air) regulations. The Client shall bear all costs, fines, and penalties arising from non-compliance or mis-declaration of DG cargo.</p>
                        <p>The Company reserves the right to refuse, suspend, or terminate services for any shipment that violates customs laws, export controls, trade sanctions, or import prohibitions under Indian law or international regulations.</p>
                    </Section>

                    <Section title="8. Customs Clearance">
                        <p>The Company acts as a CHA (Custom House Agent) on behalf of the Client. The Client is responsible for ensuring all information provided for customs filing is accurate, truthful, and complete. Any penalties, fines, or demurrage arising from incorrect declarations, incorrect HS codes, or document deficiencies shall be borne by the Client.</p>
                        <p>Customs decisions and duty assessments are made by the Indian Customs / CBIC. The Company cannot be held responsible for any duty demands, show-cause notices, or seizures by customs authorities.</p>
                    </Section>

                    <Section title="9. Warehousing Terms">
                        <p>All goods stored in the Company's warehouses are subject to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Storage charges accruing from the date of receipt</li>
                            <li>The Client's obligation to collect goods within agreed timelines</li>
                            <li>The Company's lien on goods until all charges are paid</li>
                            <li>Insurance of stored goods being the sole responsibility of the Client unless insurance is expressly arranged through the Company</li>
                        </ul>
                    </Section>

                    <Section title="10. Intellectual Property">
                        <p>All content, trademarks, logos, and branding materials on this website and in Company communications (including "PACCHA" and "Paccha Universal Shipping Line") are the exclusive property of Paccha Universal Shipping Line Private Limited. Unauthorized reproduction or use is prohibited.</p>
                    </Section>

                    <Section title="11. Confidentiality">
                        <p>Both parties agree to maintain the confidentiality of any commercially sensitive, pricing, or trade information shared during the course of the business relationship. This obligation survives the termination of any service agreement.</p>
                    </Section>

                    <Section title="12. Force Majeure">
                        <p>The Company shall not be held liable for delays or failure to perform services arising from circumstances beyond its reasonable control, including: port closures, strikes, natural disasters, government embargoes, pandemic restrictions, fuel shortages, or any other force majeure events. The Company will make reasonable efforts to mitigate the impact and communicate any delays to the Client promptly.</p>
                    </Section>

                    <Section title="13. Governing Law & Dispute Resolution">
                        <p>These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or relating to these Terms shall first be attempted to be resolved through mutual negotiation. If unresolved within 30 days, disputes shall be subject to the jurisdiction of the courts of Chennai, Tamil Nadu, India.</p>
                    </Section>

                    <Section title="14. Amendments">
                        <p>The Company reserves the right to modify these Terms and Conditions at any time. Updated terms will be published on this website with a revised effective date. Continued use of our services after any update constitutes acceptance of the revised terms.</p>
                    </Section>

                    <Section title="15. Contact for Legal Queries">
                        <p>For any questions related to these Terms, please contact:</p>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mt-4">
                            <p className="text-white font-bold text-lg">Paccha Universal Shipping Line Private Limited</p>
                            <p>No.16, Dhanalakshmi Nagar, Kadappa Road, Puthagaram, Kolathur, Chennai – 600 099</p>
                            <p>📞 +91 98413 93916 | +91 9345021647</p>
                            <p>✉️ <a href="mailto:admin@pacchashipping.in" className="text-brand-highlight hover:text-white transition-colors">admin@pacchashipping.in</a></p>
                        </div>
                    </Section>
                </motion.div>

                <div className="mt-12 text-center">
                    <p className="text-gray-500 text-sm mb-6">By engaging our services, you confirm you have read, understood, and agreed to these Terms and Conditions.</p>
                    <Link to="/contact" className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-highlight text-white font-bold px-10 py-4 rounded-full transition-all hover:-translate-y-1">
                        Contact Our Team <FiArrowRight />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
