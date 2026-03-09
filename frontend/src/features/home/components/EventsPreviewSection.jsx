const events = [
  {
    date: "Oct 12, 2024",
    title: "Annual Vibe Gala Night",
    category: "Culture",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDXVEltJ5oes7ogP5736ERWgkXcxpCehkCQlZxNYYbV3QgfepJoljKd48i89xAK5a9M7veEEhH_ZWmPX2u6KNUz616qLzBSwRFJeun3n0UUctCqlN4Mpo2yNH97PlPNsgBbvGqdzLQ6VSdAtGNEc3SX_jhtiRvLMwvXq2PhF4SUstu-0_te7w-6FgXRBWOTA0I0DkEF4Zrpi3d03O4w1iewoV6ru0F7SDVCGy__5P1Wc-8FByn9xiuXppDqi-FhIfe7b_Zm1B0aY1cq",
  },
  {
    date: "Oct 18, 2024",
    title: "Start-up Pitch Deck Workshop",
    category: "Entrepreneurship",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBMWz1AjuPPJOF25OC8d-u3wJAljoV69Qj7ORGwdwjIy4vtdLB3hihyRY0BQa-TLDp9iWgaYxF8ZVYlr1y1LON043ApXu9knyfh9KLj3HGvHKMcAVVuypEcaGffOXfdIAlxsRG5xG7UtfWTFR5DOs1F66VAhmJrpA1Fc9UiXqQ_TVJfnx1R1gO2EjRxwMTgwQEDvS5_1ihJ-hBF8h7foiSTXwii-xZtr3kMGlXAiMfnrWagd_fAfjKGF4WEoqtE1UC6hVVkE6BPcVBB",
  },
  {
    date: "Oct 25, 2024",
    title: "Intra-University Cup",
    category: "Sports",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDej98NG-WsX0ys36nWo7lMfFWvHtYdavtBG68MYF4R6iyu0xkr3URjfH0_ceP1vdrlQQmahKVvOpYIgls4Xwhx_lY0Q90XaCHTG49r3VkLNbCmPfXTnMXb42xYboHuLfNvlFHha_RyO43VPabPs8bIsMPsEkGS3qf3z834Skzc7uC8s1-uRCf5pfArXv5Okw3kmnA0FiuX-SQOTJHCKhc0I4Hj2dgQmRBDR9jUod96eWw5aqa11CHaom4txHNcglsu4xg_SbbA0xyJ",
  },
];

function EventsPreviewSection() {
  return (
    <section className="container-custom section-padding">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <h2 className="section-title">Upcoming Events</h2>
          <p className="section-subtitle">
            Mark your calendars for the hottest dates on campus
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {events.map((event) => (
          <div key={event.title} className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
            <div className="h-48 bg-slate-200">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage: `url('${event.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </div>

            <div className="p-6">
              <div className="mb-3 flex items-center gap-2 text-xs font-bold text-primary-custom">
                <span className="material-symbols-outlined text-sm">
                  calendar_today
                </span>
                {event.date}
              </div>

              <h4 className="mb-3 text-xl font-bold">{event.title}</h4>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-tight">
                  {event.category}
                </span>
                <button className="text-sm font-bold">RSVP</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default EventsPreviewSection;