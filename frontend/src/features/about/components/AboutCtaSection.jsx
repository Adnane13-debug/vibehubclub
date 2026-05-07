import { Link } from "react-router-dom";

function AboutCtaSection() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center">
      <div className="relative overflow-hidden rounded-3xl border-2 border-primary/20 bg-primary/10 p-12 md:p-20">
        <div className="relative z-10">
          <h2 className="mb-6 text-3xl font-black md:text-4xl">
            Ready to find your vibe?
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg text-slate-600">
            Join the largest student community on campus and start building your
            legacy today.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/register"
              className="w-full rounded-xl bg-primary px-10 py-4 font-bold text-background-dark transition-transform hover:scale-105 sm:w-auto"
            >
              Join the Club
            </Link>
            <Link
              to="/contact"
              className="w-full rounded-xl border border-primary px-10 py-4 font-bold text-primary transition-all hover:bg-primary hover:text-background-dark sm:w-auto"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutCtaSection;
