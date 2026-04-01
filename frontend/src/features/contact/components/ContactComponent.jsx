function ContactComponent() {
    return (
        <main className="pt-24">
            {/* Hero Section */}
            <section className="relative px-8 py-24 md:py-32 flex flex-col items-center text-center overflow-hidden">
                <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary-container rounded-full blur-3xl -translate-y-1/2 translate-x-1/2">
                    </div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-container rounded-full blur-3xl translate-y-1/2 -translate-x-1/2">
                    </div>
                </div>
                <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-on-surface max-w-4xl">
                    Get in <span className="italic font-light">Touch</span>
                </h1>
                <p className="mt-6 text-on-surface-variant text-lg md:text-xl max-w-2xl font-body leading-relaxed">
                    Connect with the Academic Vanguard. Whether you're an aspiring member, a potential partner, or a curious
                    student, our gates are always open.
                </p>
            </section>
            {/* Contact Info & Form */}
            <section className="max-w-screen-2xl mx-auto px-8 pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* Left: Contact Details */}
                    <div className="lg:col-span-5 space-y-12">
                        <div className="space-y-4">
                            <span className="font-label text-xs uppercase tracking-[0.2em] text-primary font-bold">Inquiries</span>
                            <h2 className="font-headline text-4xl font-bold">Office of Engagement</h2>
                        </div>
                        <div className="space-y-8">
                            <div className="flex gap-6 group">
                                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary-container transition-colors">
                                    <span className="material-symbols-outlined">mail</span>
                                </div>
                                <div>
                                    <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-semibold">
                                        Email us</p>
                                    <p className="text-lg font-headline mt-1">hello@vibehub.club</p>
                                </div>
                            </div>
                            <div className="flex gap-6 group">
                                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary-container transition-colors">
                                    <span className="material-symbols-outlined">call</span>
                                </div>
                                <div>
                                    <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-semibold">
                                        Call us</p>
                                    <p className="text-lg font-headline mt-1">+212 5XX-XXXXXX</p>
                                </div>
                            </div>
                            <div className="flex gap-6 group">
                                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary-container transition-colors">
                                    <span className="material-symbols-outlined">location_on</span>
                                </div>
                                <div>
                                    <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-semibold">
                                        Visit our campus</p>
                                    <p className="text-lg font-headline mt-1 leading-snug">CMC OFPPT, Academic
                                        District<br />Tamesna, Morocco</p>
                                </div>
                            </div>
                        </div>
                        <div className="pt-8 space-y-4">
                            <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-semibold">
                                Follow the Movement</p>
                            <div className="flex gap-4">
                                <a className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary-container hover:border-primary-container transition-all"
                                    href="#">
                                    <span className="material-symbols-outlined text-sm">public</span>
                                </a>
                                <a className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary-container hover:border-primary-container transition-all"
                                    href="#">
                                    <span className="material-symbols-outlined text-sm">share</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* Right: Form */}
                    <div className="lg:col-span-7">
                        <div className="bg-surface-container-lowest p-8 md:p-12 rounded-2xl shadow-xl border border-surface-container-high relative">
                            {/* Decorative element */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-container rounded-2xl -z-10 rotate-12">
                            </div>
                            <form className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="font-label text-[10px] uppercase tracking-[0.15em] font-bold text-on-surface-variant">Full
                                            Name</label>
                                        <input className="w-full bg-surface-container-high border-none rounded-lg p-4 focus:ring-2 focus:ring-primary-container placeholder:text-on-surface-variant/40"
                                            placeholder="e.g. Adam Smith" type="text" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="font-label text-[10px] uppercase tracking-[0.15em] font-bold text-on-surface-variant">Email
                                            Address</label>
                                        <input className="w-full bg-surface-container-high border-none rounded-lg p-4 focus:ring-2 focus:ring-primary-container placeholder:text-on-surface-variant/40"
                                            placeholder="student@example.com" type="email" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="font-label text-[10px] uppercase tracking-[0.15em] font-bold text-on-surface-variant">Category
                                        of Inquiry</label>
                                    <select className="w-full bg-surface-container-high border-none rounded-lg p-4 focus:ring-2 focus:ring-primary-container text-on-surface-variant">
                                        <option>Sports &amp; Athletics</option>
                                        <option>Arts &amp; Culture</option>
                                        <option>Entrepreneurship Lab</option>
                                        <option>General Membership</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="font-label text-[10px] uppercase tracking-[0.15em] font-bold text-on-surface-variant">Message</label>
                                    <textarea className="w-full bg-surface-container-high border-none rounded-lg p-4 focus:ring-2 focus:ring-primary-container placeholder:text-on-surface-variant/40"
                                        placeholder="Tell us how we can help..." rows="5"></textarea>
                                </div>
                                <button className="w-full bg-on-surface text-surface py-5 rounded-full font-label text-xs uppercase tracking-[0.2em] font-bold hover:bg-primary transition-colors shadow-lg shadow-on-surface/10"
                                    type="submit">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            {/* Map Section */}
            <section className="px-8 pb-32">
                <div className="max-w-screen-2xl mx-auto">
                    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 bg-surface-container-high">
                        <img alt="Campus Map Location" className="w-full h-full object-cover"
                            data-alt="Abstract minimalist topographic map of a university campus district"
                            data-location="Tamesna, Morocco"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4TudFjd-7PiGnQM_XfjTn6GTmW-Vb37vDePmRqLfe7TlZ1_EZZDLCcN8XQs9XY6YOMzdjfA3yhnVSO95JeiKC_PXpi9zwd_wFt7qwwNlBBrHE-9cvFPk1r3Oii1LBqC2wC8bwabCVzc50gSIfQow_u30muZrLkET5dG45BtJ3MBELk8TdTERpvS4O0Ek2dxq00BgkJXSJ2woJkA_O4yvFnpRpZEs3umj3-OjJdKuxAk50Q46O1hNzv8_6dRBgeCkStPwTxECmxb-M" />
                        <div className="absolute inset-0 bg-primary/10 pointer-events-none"></div>
                        <div className="absolute bottom-8 left-8 bg-surface p-6 rounded-xl shadow-2xl max-w-xs">
                            <h4 className="font-headline font-bold text-lg">Main Campus HQ</h4>
                            <p className="text-xs text-on-surface-variant font-body mt-2">Find us at the heart of the Academic
                                Hub in CMC Casablanca .</p>
                            <a className="inline-flex items-center mt-4 text-xs font-bold uppercase tracking-widest text-primary gap-2 hover:gap-4 transition-all"
                                href="#">
                                Open in Maps <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            {/* FAQ Section */}
            <section className="bg-surface-container py-32 px-8">
                <div className="max-w-4xl mx-auto space-y-16">
                    <div className="text-center space-y-4">
                        <span className="font-label text-xs uppercase tracking-[0.2em] text-primary font-bold">Inquiries</span>
                        <h2 className="font-headline text-4xl md:text-5xl font-bold italic">Curated Questions</h2>
                    </div>
                    <div className="grid gap-6">
                        {/* FAQ 1 */}
                        <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm group cursor-pointer hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-center">
                                <h3 className="font-headline text-xl font-bold">How to join VibeHub Club?</h3>
                                <span className="material-symbols-outlined text-primary group-hover:rotate-45 transition-transform">add</span>
                            </div>
                            <div className="mt-4 text-on-surface-variant text-sm leading-relaxed max-w-2xl">
                                Membership is open to all students at CMC OFPPT. Simply fill out the registration form
                                during our induction weeks or visit the club office to begin your journey.
                            </div>
                        </div>
                        {/* FAQ 2 */}
                        <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm group cursor-pointer hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-center">
                                <h3 className="font-headline text-xl font-bold">When are the next events?</h3>
                                <span className="material-symbols-outlined text-primary group-hover:rotate-45 transition-transform">add</span>
                            </div>
                            <div className="mt-4 text-on-surface-variant text-sm leading-relaxed max-w-2xl">
                                Our seasonal calendar is released every month. You can find the latest schedule in the
                                'Events' section of this portal or via our official campus announcement boards.
                            </div>
                        </div>
                        {/* FAQ 3 */}
                        <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm group cursor-pointer hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-center">
                                <h3 className="font-headline text-xl font-bold">Who to contact for partnerships?</h3>
                                <span className="material-symbols-outlined text-primary group-hover:rotate-45 transition-transform">add</span>
                            </div>
                            <div className="mt-4 text-on-surface-variant text-sm leading-relaxed max-w-2xl">
                                Strategic alliances are managed by our External Relations team. Please address your inquiry
                                to partners@vibehub.club or use the contact form under the 'Entrepreneurship' category.
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ContactComponent;
