import { useState } from "react";
import { Link } from "react-router-dom";

const CAMPUS_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAegdzP9VKIqqWnF4Xwg_GPfxgwIEo4OKccWMpnnlsNhI_7ySE95OREj5iJnfbJZ9YgLLLrNAlq0AQW32VRni3ZUw4g8FWjVu0yEFLiDWPpt2evuWIp-iyrHosBJj0o3hu_FV237TsqX1FweeJz4F4PYGNv_3u-43nh7kWQD6YdVDAme06mVRCID3pckzwzd-YPD6MzR0MHhRhTrZAsL5hZt5AkVJSUbJt0q46MOq_1VO6oXAsf_XmxTFTgXbnux7UhzsHMhu3ocjHn";

function RegisterPage() {
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="flex min-h-[calc(100vh-4.5rem)] w-full flex-col bg-background-light md:flex-row">
      {/* Left: visual (from signup.html) */}
      <section className="relative flex min-h-[280px] w-full items-center justify-center overflow-hidden bg-primary md:min-h-0 md:w-1/2 md:min-h-[calc(100vh-4.5rem)]">
        <div className="absolute inset-0 z-0">
          <img
            alt=""
            className="h-full w-full object-cover opacity-80 mix-blend-multiply sepia-[0.2] filter"
            src={CAMPUS_IMG}
          />
          <div className="absolute inset-0 bg-primary/30 brightness-90" />
        </div>
        <div className="relative z-10 max-w-xl p-8 md:p-12">
          <div className="mb-6 inline-block rounded-full bg-white/95 px-4 py-1 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Academic Excellence
            </span>
          </div>
          <h1 className="font-heading text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
            Join the{" "}
            <span className="font-heading italic font-bold">VibeHub</span>{" "}
            Community
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/90 md:text-xl">
            Connect with avant-garde thinkers and modern pioneers in our
            exclusive academic vanguard.
          </p>
        </div>
        <div className="absolute bottom-8 left-8 z-20 hidden md:block">
          <div className="flex max-w-xs -rotate-2 items-center gap-4 rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
              <span className="material-symbols-outlined text-primary">
                school
              </span>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Est. 2024
              </p>
              <p className="font-heading font-bold text-slate-900">
                Premier Membership
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Right: form */}
      <section className="flex w-full items-center justify-center bg-background-light p-6 md:w-1/2 md:p-12">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center md:text-left">
            <h2 className="mb-2 font-heading text-3xl font-black uppercase tracking-widest text-slate-900">
              VibeHub Club
            </h2>
            <p className="text-slate-600">
              Enter your details to create a member profile.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-xl md:p-10">
            <form
              className="space-y-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="first-name"
                    className="ml-1 block text-xs font-semibold uppercase tracking-widest text-slate-500"
                  >
                    First Name
                  </label>
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    placeholder="Jane"
                    className="w-full rounded-lg border-none bg-slate-100 px-4 py-3 text-slate-900 ring-2 ring-transparent transition-all focus:ring-primary/40"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="last-name"
                    className="ml-1 block text-xs font-semibold uppercase tracking-widest text-slate-500"
                  >
                    Last Name
                  </label>
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    placeholder="Doe"
                    className="w-full rounded-lg border-none bg-slate-100 px-4 py-3 text-slate-900 ring-2 ring-transparent transition-all focus:ring-primary/40"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="ml-1 block text-xs font-semibold uppercase tracking-widest text-slate-500"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jane.doe@university.edu"
                  className="w-full rounded-lg border-none bg-slate-100 px-4 py-3 text-slate-900 ring-2 ring-transparent transition-all focus:ring-primary/40"
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="ml-1 block text-xs font-semibold uppercase tracking-widest text-slate-500"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPw ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full rounded-lg border-none bg-slate-100 px-4 py-3 pr-12 text-slate-900 ring-2 ring-transparent transition-all focus:ring-primary/40"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-primary"
                    onClick={() => setShowPw((v) => !v)}
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPw ? "visibility" : "visibility_off"}
                    </span>
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="confirm-password"
                  className="ml-1 block text-xs font-semibold uppercase tracking-widest text-slate-500"
                >
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-lg border-none bg-slate-100 px-4 py-3 text-slate-900 ring-2 ring-transparent transition-all focus:ring-primary/40"
                />
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 font-bold text-slate-900 shadow-lg transition-all hover:scale-[1.01] hover:shadow-xl active:scale-[0.98]"
                >
                  Create Account
                  <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </button>
              </div>
            </form>
            <div className="mt-8 flex items-center justify-center gap-2">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Secured Enrollment
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-primary underline decoration-2 underline-offset-4 transition-colors hover:opacity-90"
            >
              Sign In
            </Link>
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <span className="cursor-pointer transition-colors hover:text-primary">
              Privacy Policy
            </span>
            <span className="cursor-pointer transition-colors hover:text-primary">
              Terms of Service
            </span>
            <Link
              to="/contact"
              className="transition-colors hover:text-primary"
            >
              Help Center
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RegisterPage;
