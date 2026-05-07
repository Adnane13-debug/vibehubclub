function EventsFilterSection({ activeFilter, onFilterChange }) {
  const filters = [
    { id: "all", label: "All Events", icon: "grid_view" },
    { id: "sport", label: "Sport", icon: "sports_soccer", dropdown: true },
    { id: "culture", label: "Culture", icon: "theater_comedy", dropdown: true },
    {
      id: "entrepreneurship",
      label: "Entrepreneurship",
      icon: "lightbulb",
      dropdown: true,
    },
    { id: "date", label: "Date Range", icon: "calendar_month" },
  ];

  return (
    <div className="mb-10 flex flex-wrap gap-3 border-b border-primary/10 pb-6">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id;
        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onFilterChange?.(filter.id)}
            className={`flex h-10 items-center justify-center gap-2 rounded-xl px-5 text-sm transition-colors ${
              isActive
                ? "bg-primary font-semibold text-slate-900 shadow-sm"
                : "border border-slate-200 bg-white font-medium text-slate-700 hover:bg-slate-50"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {filter.icon}
            </span>
            {filter.label}
            {filter.dropdown && (
              <span className="material-symbols-outlined text-[16px]">
                keyboard_arrow_down
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default EventsFilterSection;
