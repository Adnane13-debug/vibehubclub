/**
 * PastExperienceList - List of past events/experiences.
 */
function PastExperienceList({ pastEvents, avatar }) {
  return (
    <div className="card-soft overflow-hidden rounded-xl shadow-md">
      <div className="divide-y divide-slate-100">
        {pastEvents.map((p) => (
          <div
            key={p.id}
            className="flex cursor-pointer items-center gap-6 p-6 transition-colors hover:bg-slate-50"
          >
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl">
              <img
                alt=""
                className="h-full w-full object-cover"
                src={p.thumb}
              />
            </div>
            <div className="min-w-0 grow">
              <h4 className="font-bold text-slate-900">{p.title}</h4>
              <p className="text-xs text-slate-500">{p.meta}</p>
            </div>
            <div className="hidden shrink-0 sm:block">
              <img
                alt=""
                className="h-8 w-8 rounded-full border-2 border-white object-cover ring-2 ring-slate-100"
                src={avatar}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PastExperienceList;
