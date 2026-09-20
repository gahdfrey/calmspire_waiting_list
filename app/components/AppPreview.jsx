import { Check, FlaskConical, Search } from "./icons";

const stats = [
  { label: "Patients today", value: "14", delta: "+3", tone: "emerald" },
  { label: "Pending labs", value: "6", delta: "2 new", tone: "amber" },
  { label: "Billed at point of care", value: "100%", delta: "+18%", tone: "emerald" },
];

const patients = [
  {
    initials: "MO",
    name: "Mrs. M. Okafor",
    detail: "Follow-up · 09:30",
    status: "Checked in",
    tone: "emerald",
  },
  {
    initials: "JA",
    name: "Mr. J. Adeyemi",
    detail: "Lab review · 10:15",
    status: "Awaiting result",
    tone: "amber",
  },
  {
    initials: "BN",
    name: "Miss B. Nwosu",
    detail: "Antenatal · 11:00",
    status: "Scheduled",
    tone: "slate",
  },
];

const toneMap = {
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  amber: "bg-amber-50 text-amber-700 ring-amber-600/20",
  slate: "bg-slate-100 text-slate-600 ring-slate-500/20",
};

// 30-day outpatient volume, smoothed — illustrative of the dashboard, not live data.
const series = [18, 22, 19, 26, 24, 31, 28, 35, 33, 41, 38, 46, 44, 52, 58];

const chartPath = (() => {
  const w = 268;
  const h = 56;
  const max = Math.max(...series);
  const min = Math.min(...series);
  const pts = series.map((v, i) => {
    const x = (i / (series.length - 1)) * w;
    const y = h - ((v - min) / (max - min)) * (h - 6) - 3;
    return [x, y];
  });
  const line = pts
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
  return { line, area: `${line} L${w},${h} L0,${h} Z` };
})();

export const AppPreview = () => (
  <div className="relative">
    {/* Glow behind the panel */}
    <div
      className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-blue-600/10 via-transparent to-emerald-500/10 blur-2xl"
      aria-hidden="true"
    />

    <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_32px_80px_-24px_rgba(15,23,43,0.28)] ring-1 ring-slate-900/10">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 bg-slate-50 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        <div className="mx-auto flex items-center gap-1.5 rounded-md bg-white px-3 py-1 text-[11px] font-medium text-slate-500 ring-1 ring-slate-200">
          app.carevault.health
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {/* Greeting row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[15px] font-bold tracking-tight text-slate-900">
              Good morning, Dr. Okonkwo
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              Tuesday · 14 appointments · 2 results to review
            </p>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-[11px] text-slate-400 ring-1 ring-slate-200">
            <Search className="h-3.5 w-3.5" />
            Search patients…
          </div>
        </div>

        {/* Stat tiles */}
        <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="min-w-0 rounded-xl border border-slate-200/80 bg-white p-2.5 sm:p-3"
            >
              <p className="text-[9px] font-semibold uppercase tracking-[0.06em] text-slate-400 sm:text-[10px] sm:tracking-[0.12em]">
                {s.label}
              </p>
              <div className="mt-1.5 flex flex-wrap items-baseline gap-x-1.5">
                <span className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                  {s.value}
                </span>
                <span
                  className={`text-[10px] font-semibold ${
                    s.tone === "emerald" ? "text-emerald-600" : "text-amber-600"
                  }`}
                >
                  {s.delta}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="mt-3 rounded-xl border border-slate-200/80 bg-white p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-700">Outpatient volume</p>
            <p className="text-[10px] text-slate-400">Last 30 days</p>
          </div>
          <svg
            viewBox="0 0 268 56"
            className="mt-3 h-14 w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="cv-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#155dfc" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#155dfc" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={chartPath.area} fill="url(#cv-area)" />
            <path
              d={chartPath.line}
              fill="none"
              stroke="#155dfc"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="draw"
              style={{ "--dash": 420 }}
            />
          </svg>
        </div>

        {/* Patient list */}
        <div className="mt-3 divide-y divide-slate-100 rounded-xl border border-slate-200/80 bg-white">
          {patients.map((p) => (
            <div key={p.name} className="flex items-center gap-3 px-4 py-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[11px] font-bold text-blue-700">
                {p.initials}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-slate-900">
                  {p.name}
                </p>
                <p className="truncate text-[11px] text-slate-500">{p.detail}</p>
              </div>
              <span
                className={`hidden shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ring-1 ring-inset min-[380px]:inline-block ${
                  toneMap[p.tone]
                }`}
              >
                {p.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Floating toast */}
    <div className="absolute -bottom-5 -left-4 hidden items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 shadow-[0_16px_40px_-12px_rgba(15,23,43,0.25)] ring-1 ring-slate-900/10 sm:flex">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
        <FlaskConical className="h-4 w-4" />
      </span>
      <div>
        <p className="text-[11px] font-bold text-slate-900">Result posted to record</p>
        <p className="text-[10px] text-slate-500">FBC · visible to Dr. Okonkwo now</p>
      </div>
    </div>

    {/* Floating badge */}
    <div className="absolute -right-3 -top-4 hidden items-center gap-2 rounded-xl bg-slate-950 px-3.5 py-2.5 shadow-lg ring-1 ring-white/10 lg:flex">
      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/15 text-emerald-400">
        <Check className="h-3.5 w-3.5" />
      </span>
      <div>
        <p className="text-[11px] font-bold text-white">Every action attributed</p>
        <p className="text-[10px] text-slate-400">Full audit trail</p>
      </div>
    </div>
  </div>
);
