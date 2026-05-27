import { useTranslation } from "react-i18next";
import { useState, useEffect, useMemo } from "react";
import api from "../../../services/api";
import EventsHeroSection from "../components/EventsHeroSection";
import EventsFilterSection from "../components/EventsFilterSection";
import EventCard from "../components/EventCard";
import EventsFeaturedSection from "../components/EventsFeaturedSection";

function pickFeaturedEvent(list) {
  if (!list.length) return null;
  const flagged = list.find((e) => Number(e.featured) === 1);
  return flagged ?? list[0];
}

function getEventsGridClass(count) {
  if (count === 1) {
    return "mx-auto grid w-full max-w-md grid-cols-1 gap-8";
  }
  if (count === 2) {
    return "mx-auto grid w-full max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2";
  }
  return "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3";
}

function EventsPage() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("all");
  const [publishedEvents, setPublishedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    api
      .get("/api/public/events")
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : [];
        setPublishedEvents(list);
        setFetchError(false);
      })
      .catch((err) => {
        console.error(err);
        setFetchError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const featuredEvent = useMemo(
    () => pickFeaturedEvent(publishedEvents),
    [publishedEvents]
  );

  const filteredEvents =
    activeFilter === "all"
      ? publishedEvents
      : publishedEvents.filter((e) => e.categorie?.toLowerCase() === activeFilter);

  const gridClass = useMemo(
    () => getEventsGridClass(filteredEvents.length),
    [filteredEvents.length]
  );

  if (loading) {
    return <div className="p-8 text-center">{t("eventsPage.loading")}</div>;
  }

  return (
    <div className="flex flex-1 justify-center px-6 py-10 md:px-20">
      <div className="layout-content-container flex max-w-[1200px] flex-1 flex-col">
        <EventsHeroSection />
        <EventsFilterSection
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        <div className={gridClass}>
          {publishedEvents.length === 0 ? (
            <p className="col-span-full text-center text-slate-500 py-8">
              {t("eventsPage.empty")}
            </p>
          ) : filteredEvents.length === 0 ? (
            <p className="col-span-full text-center text-slate-500 py-8">
              {t("eventsPage.noFilterMatch")}
            </p>
          ) : (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          )}
        </div>
        <EventsFeaturedSection event={featuredEvent} apiFailed={fetchError} />
      </div>
    </div>
  );
}

export default EventsPage;
