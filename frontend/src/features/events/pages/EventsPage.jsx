import { useState } from "react";
import EventsHeroSection from "../components/EventsHeroSection";
import EventsFilterSection from "../components/EventsFilterSection";
import EventCard from "../components/EventCard";
import EventsFeaturedSection from "../components/EventsFeaturedSection";
import { EVENTS } from "../data/eventsData";

function EventsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredEvents =
    activeFilter === "all"
      ? EVENTS
      : EVENTS.filter(
          (e) =>
            e.category.toLowerCase() === activeFilter ||
            (activeFilter === "sport" && e.category === "Sports")
        );

  return (
    <div className="flex flex-1 justify-center px-6 py-10 md:px-20">
      <div className="layout-content-container flex max-w-[1200px] flex-1 flex-col">
        <EventsHeroSection />
        <EventsFilterSection
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        <EventsFeaturedSection />
        <div className="mb-10 mt-16 flex justify-center">
          <button
            type="button"
            className="flex items-center gap-2 rounded-full border-2 border-primary px-8 py-3 text-sm font-bold text-slate-900 transition-all hover:bg-primary/20 dark:text-slate-100"
          >
            View All Upcoming Events
            <span className="material-symbols-outlined">expand_more</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventsPage;
