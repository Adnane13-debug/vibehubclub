import { useTranslation } from "react-i18next";
function EventsFilterSection({ activeFilter, onFilterChange }) {
  const { t } = useTranslation();
  const filters = [
    { id: "all",            label: t("eventsFilter.allEvents"),      icon: "grid_view"         },
    { id: "sport",          label: t("eventsFilter.sport"),            icon: "sports_soccer"     },
    { id: "culture",        label: t("eventsFilter.culture"),          icon: "theater_comedy"    },
    { id: "entrepreneurship", label: t("eventsFilter.entrepreneurship"), icon: "lightbulb"       },
    { id: "date",           label: "Date Range",       icon: "calendar_month"    },
  ];

  return (
    <div className="mb-10">

      {/* Section label */}
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
        {t("eventsFilter.browseByCategory")}
      </p>

      {/* Filter toolbar */}
      <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-6 dark:border-white/[0.06]">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => onFilterChange?.(filter.id)}
              className={`group flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200
                ${isActive
                  ? "bg-primary text-slate-900 shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:-translate-y-px hover:border-slate-300 hover:text-slate-900 hover:shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:border-white/20 dark:hover:text-slate-200"
                }`}
            >
              <span
                className={`material-symbols-outlined text-[15px] transition-colors
                  ${isActive ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`}
              >
                {filter.icon}
              </span>

              {filter.label}

              {filter.id !== "all" && filter.id !== "date" && (
                <span
                  className={`material-symbols-outlined text-[14px] transition-colors
                    ${isActive ? 'text-slate-900/60' : 'text-slate-300 group-hover:text-slate-400'}`}
                >
                  keyboard_arrow_down
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default EventsFilterSection;