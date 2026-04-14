import { Link } from "react-router-dom";

function ContactComponent() {
  return (
    <main className="pt-16">
      {/* ── Hero Section ── */}
      <section className="relative py-24 overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 -z-10" />
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto px-8 text-center">
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-slate-900 mb-6">
            Contact Us
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Have a question or just want to vibe? Reach out and our team of
            dedicated curators will get back to you shortly.
          </p>
        </div>
      </section>

      {/* ── Main Interaction Area ── */}
      <section className="max-w-7xl mx-auto px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Contact Form Card */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-slate-100">
            <h2 className="text-3xl font-bold tracking-tight mb-8 text-slate-900">
              Send us a message
            </h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                    Full Name
                  </label>
                  <input
                    className="w-full bg-slate-100 border-none rounded-lg p-4 focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-slate-400 text-slate-900"
                    placeholder="Alex Rivera"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                    Email Address
                  </label>
                  <input
                    className="w-full bg-slate-100 border-none rounded-lg p-4 focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-slate-400 text-slate-900"
                    placeholder="alex@vibe.com"
                    type="email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                  Message
                </label>
                <textarea
                  className="w-full bg-slate-100 border-none rounded-lg p-4 focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-slate-400 text-slate-900"
                  placeholder="How can we help you curate your experience?"
                  rows="5"
                />
              </div>
              <button
                className="w-full md:w-auto px-10 py-4 bg-primary text-background-dark rounded-full font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-300"
                type="submit"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info Cards & Social Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-6">

            {/* Info Card: Email */}
            <div className="group bg-slate-50 p-8 rounded-xl flex items-center gap-6 hover:bg-slate-100 transition-colors duration-300">
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-3xl">alternate_email</span>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
                  Email Support
                </p>
                <p className="text-lg font-semibold text-slate-900">support@vibehub.club</p>
              </div>
            </div>

            {/* Info Card: Location */}
            <div className="group bg-slate-50 p-8 rounded-xl flex items-center gap-6 hover:bg-slate-100 transition-colors duration-300">
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center text-slate-500 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-3xl">location_on</span>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
                  HQ Location
                </p>
                <p className="text-lg font-semibold text-slate-900">
                  CMC OFPPT, Tamesna, Morocco
                </p>
              </div>
            </div>

            {/* Bento Social Grid */}
            <div className="grid grid-cols-2 gap-6">
              <a
                className="bg-sky-50 hover:bg-sky-100 p-8 rounded-xl flex flex-col items-center justify-center gap-3 transition-colors group"
                href="#"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-sky-500 shadow-sm">
                  <span className="material-symbols-outlined text-2xl">share</span>
                </div>
                <span className="font-bold text-sm text-slate-700">Twitter</span>
              </a>
              <a
                className="bg-pink-50 hover:bg-pink-100 p-8 rounded-xl flex flex-col items-center justify-center gap-3 transition-colors group"
                href="#"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-pink-500 shadow-sm">
                  <span className="material-symbols-outlined text-2xl">camera</span>
                </div>
                <span className="font-bold text-sm text-slate-700">Instagram</span>
              </a>
              <a
                className="col-span-2 bg-white border border-slate-100 p-6 rounded-xl flex items-center justify-between group hover:border-primary/30 transition-all"
                href="#"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">work</span>
                  </div>
                  <span className="font-bold text-slate-800">Connect on LinkedIn</span>
                </div>
                <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="max-w-7xl mx-auto px-8 mb-24">
        <div className="relative bg-background-dark rounded-3xl p-12 md:p-20 overflow-hidden">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent opacity-50" />
          {/* Decorative glow */}
          <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-primary rounded-full blur-[100px] opacity-20" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-6">
              Ready to find your vibe?
            </h2>
            <p className="text-lg text-white/70 max-w-xl mb-10">
              Join the largest student community on campus and start building
              your legacy today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="px-10 py-4 bg-white text-background-dark rounded-full font-bold hover:scale-105 transition-transform duration-300"
              >
                Join the Club
              </Link>
              <button className="px-10 py-4 border border-white/20 text-white rounded-full font-bold hover:bg-white/10 transition-colors">
                Explore Members
              </button>
            </div>
          </div>

          {/* Decorative abstract image */}
          <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 hidden xl:block w-96 h-96 opacity-40">
            <img
              alt="Abstract 3D art"
              className="w-full h-full object-cover rounded-full"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrfYkbJE_otd2aO5P6Y3jqUlAn_Rj6jpPm8R7fH6jQsM88ja4udnxMWvN2GCpFoWBBTSsqNYiCsM-LXqZDf6p42lSrqVANcm3W8e1-eyb3dGUeyUmEs8udTvCi2osR0ZkPP6QrhJZJnOq1V9dU1Wc7dRlx5-767Zas9L3Nz4Jn1g9emOwIPwMdhxbr18rxNwwRe1jDjb62EZJeOqFZKfUGdkaZXiCOhY9Zqa0105w904TrGjaP1g3KgKhhI08IKyXVzTBpdaIj1xQ"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default ContactComponent;
