/**
 * VisitorHeader - Top section of the visitor profile.
 */
function VisitorHeader({ avatar, displayName, bio }) {
  return (
    <section className="relative mb-12">
      <div className="flex flex-col items-center gap-8 md:flex-row md:items-end">
        <div className="group relative">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-primary/40 to-amber-200/40 opacity-40 blur transition duration-500 group-hover:opacity-60" />
          <div className="relative h-40 w-40 overflow-hidden rounded-3xl border-4 border-white bg-slate-100 shadow-xl md:h-48 md:w-48">
            <img alt="" className="h-full w-full object-cover" src={avatar} />
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <span className="mb-3 inline-block rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-800">
            Visitor Curator
          </span>
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            {displayName}
          </h1>
          <p className="mt-3 max-w-xl text-lg leading-relaxed text-slate-600">
            {bio}
          </p>
        </div>
      </div>
    </section>
  );
}

export default VisitorHeader;
