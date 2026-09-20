// Lucide-style stroked icons, matching the CareVault product site's icon language.
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

export const HeartPulse = (p) => (
  <svg {...base} strokeWidth={2.25} {...p}>
    <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
    <path d="M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
  </svg>
);

export const UserRound = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="8" r="5" />
    <path d="M20 21a8 8 0 0 0-16 0" />
  </svg>
);

export const Stethoscope = (p) => (
  <svg {...base} {...p}>
    <path d="M11 2v2M5 2v2M5 4v7a6 6 0 0 0 12 0V4" />
    <circle cx="20" cy="10" r="2" />
    <path d="M11 17v1a4 4 0 0 0 8 0v-6" />
  </svg>
);

export const FlaskConical = (p) => (
  <svg {...base} {...p}>
    <path d="M10 2v7.31a2 2 0 0 1-.28 1.02L4.6 19.4A2 2 0 0 0 6.3 22h11.4a2 2 0 0 0 1.7-2.6l-5.12-9.07A2 2 0 0 1 14 9.31V2" />
    <path d="M8.5 2h7M7 16h10" />
  </svg>
);

export const Pill = (p) => (
  <svg {...base} {...p}>
    <path d="m10.5 20.5-7-7a4.95 4.95 0 0 1 7-7l7 7a4.95 4.95 0 0 1-7 7Z" />
    <path d="m8.5 8.5 7 7" />
  </svg>
);

export const Receipt = (p) => (
  <svg {...base} {...p}>
    <path d="M4 2v20l2-1.5L8 22l2-1.5L12 22l2-1.5L16 22l2-1.5L20 22V2l-2 1.5L16 2l-2 1.5L12 2l-2 1.5L8 2 6 3.5Z" />
    <path d="M8 7h8M8 11h8M8 15h5" />
  </svg>
);

export const ChartBar = (p) => (
  <svg {...base} {...p}>
    <path d="M3 3v16a2 2 0 0 0 2 2h16" />
    <path d="M7 16v-5M12 16V8M17 16v-3" />
  </svg>
);

export const ShieldCheck = (p) => (
  <svg {...base} {...p}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const Lock = (p) => (
  <svg {...base} {...p}>
    <rect width="18" height="11" x="3" y="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export const Network = (p) => (
  <svg {...base} {...p}>
    <rect x="9" y="2" width="6" height="6" rx="1" />
    <rect x="2" y="16" width="6" height="6" rx="1" />
    <rect x="16" y="16" width="6" height="6" rx="1" />
    <path d="M12 8v4M5 16v-2h14v2" />
  </svg>
);

export const Clock = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const Check = (p) => (
  <svg {...base} strokeWidth={2.5} {...p}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const ArrowRight = (p) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export const Plus = (p) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Search = (p) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const Menu = (p) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const X = (p) => (
  <svg {...base} {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
