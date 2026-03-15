import { Link, useParams } from "react-router-dom";
import { EVENTS } from "../data/eventsData";

const RECENT_ATTENDEES = [
  { name: "Alex Rivera", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDi5U31KC-uOVhpXhfNpADFqIiSGQipsqWQ6O61AMr6GZy43OhxhabJWQNCBJnKbAdZo8pFSPHKXsmJH3higtFgFLIYj71ewirM35ha67MMYJUUl15IEiIrOBNScpKNR1hN_s-gG3VrPY3hQArGY3IaBkrpSL9vmGIIU6BHqMUjL-m5oIO-qIvttYYE2LBTRCGTypMXCwFUZ1y2SZzxKmWBZSApYk_z_e9_0X9Zul8rvC0JDfym4VdV09MWJI6vG4fg4fWt_cnaB0yf" },
  { name: "Jordan Smith", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-4xWh2V-4C2j_HGs9NgY9R3LhNXuIDX0Ri2zR3zOR6MW69yxdPqQ5KspQk4R2SXZTMA_AzxbuN72hk39Sq2Q4flBSTreQfeMi9do3W1lg4PWGWtzJClQc5QY9vDR-m3s0jbXFqeXOpg1qCz473xFC26sVCm7dS9DYtgBCRUzMOF3_N3qztERi5JnVRrD7LM4sUybvFJBE1b2KE-ktteZPygo0D4XweZGisyAfpMgXuex1ltxDO0KPOQeuYfj84vaFXIQFBHyW89E-" },
  { name: "Maria Garcia", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFlZDQYxKMNEQvgQDnvLLAM6CVddqcegYKBomg51I__aWjgY80pA00gUGyLxxXftrvo0mNxznF-L93r5iMfxrvdlPcHQRe87eDm_bPzqg4CQlNK9YZ1XoFUgSHrmMztIh96JKVInToGhM5WoFnXN9ub5Uq13vtK6iL18-26XEdm0VHx5qLbONvX1Kuc8z9NWrHWa84Oxm42aaJ5x6IxgQB3OtlGJOzJ7pOcBhTgTVDwAk-gML5p4wRfkelTEqOFslTUp1fE8zuIOA9" },
];

const DEFAULT_EVENT_DETAILS = {
  title: "Annual Entrepreneurship Summit 2024",
  tag: "Featured Event",
  host: "VibeHub Entrepreneurship Division",
  dateTime: "Oct 25, 10:00 AM",
  location: "Main Auditorium, Building C",
  address: "123 University Drive, Academic Quarter",
  participants: "142 Joined",
  spotsLeft: "20 spots left",
  organizerName: "Sarah Jenkins",
  organizerRole: "Head of Entrepreneurship",
  organizerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSxv5l-3VvTZCEE9tsLa3Jc1Dbv84C3KYizcMuxLdCTllkeLUzkpwjYVYSOyrIMrZWVjJwHlqvhYzsMRWQWd9Oc63JXdTQisGc88C0e4sugqfODUJh09h312ZP57-H5pG2kPR_SWu-z1vpN9MSIHk8iywixp_KkaweKyQozmLMabEZgZ9w5LKEUYBhYFJEY4ameQyxaEt9Ok4TAIYXCrhcllRwUoTtWHBeXKg6ce_Eh1YvbnVSASJxkJO0DN9p-Z5QbZ9LPJ0Pc20V",
  heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDy0q5AmMkNP9zX1i_vEWFJTzU_VM47V1k6JP8jJh6pGna-0NOwCkRnqrKW1o72ynddXgNeyNZxRvVPf9yBuIjnXx9ULv-MAqF2VXIyDHwlj_wEbpYKjM6EQA0sjSccbgOsnAzsyWevGsj-OnobO4UyV6fFmnnb5vKu69a_wqht1lERz-3eto_C0rTrEoAtajWrkEERMl_DJ4NVdQlctmkVckIC1pvQ4WybECWhQKgUP1oMLVAp10aRIUVsSqgaFEDZ8MNbVerz7pn9",
  mapImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwqgQfRNcJmHAu7Qvma7kssmLbUQme7HYIDlEC29YpmaUd_h2bBCUUoU0jddyOiFsA1NPPgoUnqSDoUGvS4cpeGRpdOl17ANRbFOWLN2bChN1L3mgDtpxDeEJVoQJmr12Opk_kNmChIBw5kjso9xbS1X6FJxZTEr5c5hkC_jLPmeffBPG4Zu3jFeX8DX-i_jg8lp--DNcwWKw6Bn0CmfmgmyrQAA42fhSBJYByLbTL7t0TrNnsl0CDpqM4BN0b_OpQqUEw0ETARyTn",
};

function EventDetailsPage() {
  const { id } = useParams();
  const eventFromList = EVENTS.find((e) => e.id === id);
  const details = eventFromList
    ? {
        ...DEFAULT_EVENT_DETAILS,
        title: eventFromList.title,
        tag: eventFromList.category,
        heroImage: eventFromList.image,
      }
    : DEFAULT_EVENT_DETAILS;

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8 lg:px-20">
      <div className="mb-4">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Events
        </Link>
      </div>
      <nav className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
        <Link to="/" className="transition-colors hover:text-primary">
          Home
        </Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <Link to="/events" className="transition-colors hover:text-primary">
          Events
        </Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-slate-900 dark:text-slate-100">Event Details</span>
      </nav>

      <div className="relative mb-8 overflow-hidden rounded-xl shadow-xl">
        <div
          className="aspect-[21/9] w-full bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url("${details.heroImage}")`,
          }}
          aria-hidden
        />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
          <div className="max-w-3xl">
            <span className="mb-4 inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-900">
              {details.tag}
            </span>
            <h2 className="text-4xl font-black leading-tight text-white md:text-5xl">
              {details.title}
            </h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-8 lg:col-span-2">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">About the Event</h3>
                <p className="text-slate-500 dark:text-slate-400">
                  Hosted by {details.host}
                </p>
              </div>
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-bold text-slate-900 shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Join Event
              </button>
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                Join us for the most anticipated student-led entrepreneurship
                event of the year. The 2024 Summit brings together visionary
                student leaders, industry mentors, and successful alumni for a
                day of inspiration, networking, and practical skill-building.
              </p>
              <p className="mt-4">
                This year&apos;s theme is &quot;Scaling Social Impact.&quot; We&apos;ll
                explore how modern technology and collaborative models are
                reshaping how we build sustainable businesses that matter.
                Attendees will participate in hands-on workshops, listen to
                keynote speeches from tech founders, and have the opportunity to
                pitch their own ideas to a panel of friendly judges.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex flex-col gap-3 rounded-xl border border-primary/20 bg-white/50 p-6 backdrop-blur-sm dark:bg-slate-800/50">
              <span className="material-symbols-outlined text-3xl text-primary">
                calendar_today
              </span>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Date &amp; Time
                </p>
                <p className="text-xl font-bold">{details.dateTime}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 rounded-xl border border-primary/20 bg-white/50 p-6 backdrop-blur-sm dark:bg-slate-800/50">
              <span className="material-symbols-outlined text-3xl text-primary">
                location_on
              </span>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Location
                </p>
                <p className="text-xl font-bold">{details.location}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 rounded-xl border border-primary/20 bg-white/50 p-6 backdrop-blur-sm dark:bg-slate-800/50">
              <span className="material-symbols-outlined text-3xl text-primary">
                group
              </span>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Participants
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold">{details.participants}</p>
                  <span className="text-xs font-bold text-primary">
                    ({details.spotsLeft})
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-primary/20">
            <div className="relative flex h-64 w-full items-center justify-center bg-slate-200 dark:bg-slate-800">
              <img
                alt="Campus map"
                className="absolute inset-0 h-full w-full object-cover opacity-50"
                src={details.mapImage}
              />
              <div className="z-10 flex flex-col items-center gap-2 p-4 text-center">
                <span className="material-symbols-outlined text-4xl text-slate-900 dark:text-white">
                  push_pin
                </span>
                <p className="font-bold text-slate-900 dark:text-white">
                  Campus Main Auditorium
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {details.address}
                </p>
                <button
                  type="button"
                  className="mt-2 rounded-lg bg-white px-4 py-2 text-xs font-bold text-slate-900 shadow-sm"
                >
                  Open in Maps
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-xl border border-primary/20 bg-white p-6 shadow-sm dark:bg-slate-800">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">
              Organizer
            </h4>
            <div className="flex items-center gap-4">
              <div
                className="h-12 w-12 rounded-full border-2 border-primary bg-cover bg-center"
                style={{ backgroundImage: `url("${details.organizerAvatar}")` }}
                aria-hidden
              />
              <div>
                <p className="font-bold">{details.organizerName}</p>
                <p className="text-xs text-slate-500">
                  {details.organizerRole}
                </p>
              </div>
            </div>
            <button
              type="button"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-primary/40 bg-transparent py-2.5 text-sm font-bold text-slate-900 transition-colors hover:bg-primary/10 dark:text-white"
            >
              <span className="material-symbols-outlined text-lg">mail</span>
              Contact Organizer
            </button>
          </div>

          <div className="rounded-xl border border-primary/20 bg-white p-6 shadow-sm dark:bg-slate-800">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Recent Attendees
              </h4>
              <span className="text-xs font-bold text-primary">View all</span>
            </div>
            <div className="flex flex-col gap-4">
              {RECENT_ATTENDEES.map((attendee) => (
                <div key={attendee.name} className="flex items-center gap-3">
                  <div
                    className="h-8 w-8 rounded-full bg-slate-200 bg-cover bg-center"
                    style={{ backgroundImage: `url("${attendee.avatar}")` }}
                    aria-hidden
                  />
                  <p className="text-sm font-medium">{attendee.name}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex -space-x-3 overflow-hidden">
              <div
                className="inline-block h-8 w-8 rounded-full bg-slate-300 ring-2 ring-white bg-cover bg-center dark:ring-slate-800"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBGYPGHeEFvKqfRB7UDLFijyMci9IaKjg8TXesuVALglcUR1FjAum221MwWRHmDlpjOIYNzbUDcFMpBPI5_Oe5tSxJhdpRrQ7E8ySZXsY4RYnxaopP1ydmXPYXdy_K_T0_QKkWO0bxUz8MSerKKQd66B8A7gbizNkoTzVR0IcMlX8t8xhw3JFdtX35JHgwJmtkoCUfSW8IBeGmrI15-bJyCCFQFxBN4L43_Qi5yMHnaEc-pcvsgnrNcvQChlY-UA4FGPGvoR41zal2s")',
                }}
                aria-hidden
              />
              <div
                className="inline-block h-8 w-8 rounded-full bg-slate-300 ring-2 ring-white bg-cover bg-center dark:ring-slate-800"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBqpWyGSIgLvRp2WPj4AgnplE7WAmRtxEIl5FZSLs9Z_QC_0ZAuWk6ZX7LwthRHAI-nUaWN7NTjUkJYXPAnh-Zy9IIGz9RBOuIWWiF3iYuALYrMzoUGt5H7hcTARI9H0WDMiuVD2pDUN-uPdS0oNR39q_8tnCEpoL5KyoKD-TZAIXuhPKbuUcdi9NoCotmNKbJOzdvt5xppUwgUT8-IJi4yBdMNPO7hcCdyzKz1wk0l6RWwj93rE_3S7m9gC-4Zi5Mqw2x1GzaK1i6W")',
                }}
                aria-hidden
              />
              <div
                className="inline-block h-8 w-8 rounded-full bg-slate-300 ring-2 ring-white bg-cover bg-center dark:ring-slate-800"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAMm0-OOFBW7jFvtjywbFnoKUvxUQGl1eg9pGtPqBnGidIlvVweXvJr9wLWkIi7WmTljnt3ttCM_kMI8dvgwVRuH86QijsTetfw4HiBCFkEg7ZUs14YHSFR0etEl3QWJJZ-Nt5o1Cx18GGGUYwBZprGqmn0cFovStlKeYVHOGbIIHk4wA8DHGtIgV0RIErrZFZzEw2AopRBT0p4H9lEcQM7Ks_4wFjdiMr1j7inSbMEQphgzhv7L4gceCWKmMjBtISHoD4eOsixJikz")',
                }}
                aria-hidden
              />
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-slate-900 ring-2 ring-white dark:ring-slate-800">
                +139
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-primary/20 bg-primary/10 p-6">
            <h4 className="mb-3 text-sm font-bold">Invite your friends</h4>
            <p className="mb-4 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              Know someone who&apos;d love this? Share the event details with
              them.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                className="flex flex-1 items-center justify-center rounded-lg bg-white py-2 shadow-sm transition-transform hover:scale-105 dark:bg-slate-700"
              >
                <span className="material-symbols-outlined text-xl">share</span>
              </button>
              <button
                type="button"
                className="flex flex-1 items-center justify-center rounded-lg bg-white py-2 shadow-sm transition-transform hover:scale-105 dark:bg-slate-700"
              >
                <span className="material-symbols-outlined text-xl">
                  content_copy
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EventDetailsPage;
