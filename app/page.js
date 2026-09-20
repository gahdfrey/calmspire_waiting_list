import { SiteHeader } from "./components/SiteHeader";
import { AppPreview } from "./components/AppPreview";
import { OnboardingForm } from "./components/OnboardingForm";
import {
  ArrowRight,
  ChartBar,
  Check,
  Clock,
  FlaskConical,
  HeartPulse,
  Lock,
  Network,
  Pill,
  Plus,
  Receipt,
  ShieldCheck,
  Stethoscope,
  UserRound,
} from "./components/icons";

/* ---------------------------------------------------------------- content */

const alignment = [
  "NDPA 2023",
  "NDHI-aligned",
  "HL7 FHIR",
  "ICD-coded diagnoses",
  "Role-based access",
];

const problems = [
  {
    icon: Clock,
    title: "The consultation begins with archaeology",
    body: "The folder must be located. If it is located, it may be incomplete — a result filed elsewhere, a prescription in a different register, an admission summary that never made it back. The consultation proceeds on partial information.",
  },
  {
    icon: FlaskConical,
    title: "Investigations repeated for want of a prior result",
    body: "Drug interactions missed because the current medication list isn't visible. Allergies unrecorded at the point of prescribing. Continuity lost entirely when the usual clinician is unavailable.",
  },
  {
    icon: Receipt,
    title: "Revenue leaks where delivery and record diverge",
    body: "A dressing changed on the ward that never reaches the cashier. An investigation performed but the requisition mislaid. Because the service was never recorded, the loss can never appear as a shortfall.",
  },
  {
    icon: ShieldCheck,
    title: "Paper cannot demonstrate its own integrity",
    body: "There is no way to establish, after the fact, who accessed a file, whether an entry was altered, or when a note was written. In a dispute, the hospital's position rests on documentation it cannot verify.",
  },
];

const beforeAfter = [
  {
    area: "Retrieving a patient's history",
    today: "5–20 minutes; sometimes not found at all",
    withCV: "Under 10 seconds, from any authorised terminal",
  },
  {
    area: "Laboratory results",
    today: "Physical delivery; risk of loss and delay",
    withCV: "Posted to the record and visible to you immediately",
  },
  {
    area: "Billing and revenue",
    today: "Services delivered but never captured",
    withCV: "Every service billed at the point it is rendered",
  },
  {
    area: "Oversight",
    today: "Reports assembled manually, often days late",
    withCV: "Live dashboards on activity, revenue and throughput",
  },
  {
    area: "Accountability",
    today: "Difficult to establish who did what and when",
    withCV: "Every action attributed and time-stamped",
  },
];

const modules = [
  {
    icon: UserRound,
    name: "Patient registration & master record",
    body: "A unique hospital number issued at first registration, with duplicate detection, full payer details across self-pay, HMO, corporate and NHIS, and a visit history that stays attached permanently.",
  },
  {
    icon: Stethoscope,
    name: "Consultation & encounter notes",
    body: "Structured complaint, history, examination, assessment and plan. Standing allergies and problem list. ICD-aligned diagnosis coding, and prescribing routed straight to the pharmacy.",
  },
  {
    icon: FlaskConical,
    name: "Laboratory & diagnostics",
    body: "Requests raised from the consulting room arrive with the patient and clinical context attached. Specimen tracking, reference ranges, abnormal flagging and cumulative trending across prior tests.",
  },
  {
    icon: Pill,
    name: "Pharmacy & inventory",
    body: "Prescriptions received and dispensed electronically, stock decremented automatically, re-order thresholds and expiry alerts, and a full dispensing history per patient and per item.",
  },
  {
    icon: Receipt,
    name: "Billing, payments & revenue",
    body: "Services billed at the point of delivery rather than reconstructed afterwards. Configurable tariffs by payer, HMO and NHIS claim preparation, and daily cash reconciliation.",
  },
  {
    icon: ChartBar,
    name: "Reporting & management dashboards",
    body: "Daily, weekly and monthly activity and revenue produced from the live record. Clinician workload, service line performance, receivables ageing, and export to spreadsheet.",
  },
];

const roles = [
  {
    role: "Consultant / Doctor",
    sees: "Appointment list, patient histories, clinical notes, investigation requests and results, prescribing.",
    hidden: "No user administration. No finance.",
    you: true,
  },
  {
    role: "Nurse",
    sees: "Ward and clinic patients, vital signs, nursing notes, medication administration, care tasks.",
    hidden: "No billing. No system configuration.",
  },
  {
    role: "Laboratory scientist",
    sees: "Incoming investigation requests, specimen tracking, result entry and validation.",
    hidden: "No billing, and no clinical record beyond the request.",
  },
  {
    role: "Pharmacist",
    sees: "Incoming prescriptions, dispensing, stock levels and expiry monitoring.",
    hidden: "No clinical notes. No finance.",
  },
  {
    role: "Front desk / Records",
    sees: "Registration, appointment booking, patient search and demographic maintenance.",
    hidden: "No clinical detail whatsoever.",
  },
  {
    role: "Finance officer",
    sees: "Invoices, payments, HMO claims, outstanding balances, daily reconciliation.",
    hidden: "No clinical notes.",
  },
];

const journey = [
  {
    actor: "Front desk",
    text: "A returning patient is found by name, phone number or hospital number in a few seconds and checked in. Her arrival is immediately visible to the clinic.",
  },
  {
    actor: "Nurse",
    text: "Her vital signs are recorded directly into her record. You can see them before she enters the consulting room.",
  },
  {
    actor: "You",
    text: "One view: every previous visit, every diagnosis, her current medications, her recorded allergies, and every result the hospital has ever produced for her — including the one from fourteen months ago that would otherwise have been repeated.",
  },
  {
    actor: "Laboratory & pharmacy",
    text: "Your two investigation requests and your prescription arrive the moment you save them. Nothing is carried anywhere. If an item is unavailable, you know without a phone call.",
  },
  {
    actor: "Cash office",
    text: "The consultation, both investigations and the dispensed medication are already on her bill, because each was billed as it was rendered. The cashier collects a total nobody had to assemble.",
  },
];

const partnerTerms = [
  {
    icon: Network,
    title: "Direct engineering access",
    body: "A defect you report in the morning reaches the person who can fix it — not a first-line agent in a support queue.",
  },
  {
    icon: HeartPulse,
    title: "Real influence on the roadmap",
    body: "Features your clinicians ask for are features we build. It is a conversation with the founder, not a submission to a global committee.",
  },
  {
    icon: Receipt,
    title: "Foundation partner pricing",
    body: "A reduction on implementation fees and an introductory licence period at no charge. These terms close when the foundation cohort does.",
  },
  {
    icon: Check,
    title: "A configured trial first",
    body: "A no-obligation environment loaded with your own service catalogue, for your team to use before anything is signed.",
  },
];

const securityPoints = [
  "Individual credentials — shared logins are structurally impractical",
  "Sessions expire on inactivity, protecting unattended terminals",
  "Access revoked immediately when a staff member departs",
  "Encrypted in transit and at rest, with restoration tested rather than assumed",
];

const compliance = [
  {
    icon: Lock,
    label: "NDPA 2023",
    text: "Lawful basis, consent handling, data subject rights and breach notification, formalised in a Data Processing Agreement.",
  },
  {
    icon: Network,
    label: "NDHI",
    text: "Built in alignment with Nigeria's national digital health architecture, so records can be exchanged as that capability matures.",
  },
  {
    icon: ShieldCheck,
    label: "HL7 FHIR",
    text: "The record structure maps to international health data standards, protecting the hospital from a second migration later.",
  },
];

const phases = [
  { n: "01", stage: "Discovery & design", weeks: "2 weeks" },
  { n: "02", stage: "Configuration & data migration", weeks: "3 weeks" },
  { n: "03", stage: "Role-based training", weeks: "2 weeks" },
  { n: "04", stage: "Pilot in one or two departments", weeks: "3 weeks" },
  { n: "05", stage: "Progressive rollout", weeks: "3–4 weeks" },
  { n: "06", stage: "Stabilisation & handover", weeks: "2 weeks" },
];

const faqs = [
  {
    q: "What does the beta actually involve?",
    a: "A controlled pilot in one or two departments with our team on site, followed by phased rollout across the facility. We start narrow, prove the system in live use, and expand from a position of demonstrated success. Implementation, data migration, staff training and ongoing support are handled by us.",
  },
  {
    q: "Who owns the data?",
    a: "The hospital does, at all times — it is the data controller and we are the processor. Your data is never aggregated for commercial purposes, sold, or shared with any third party except on your written instruction or where compelled by law. If the relationship ends, you receive a complete export in a standard, readable format at no cost.",
  },
  {
    q: "What does it need to run?",
    a: "A standard web browser on ordinary workstations or laptops at the points of use, a reliable internal network, and an internet connection for cloud deployment. Tablets are supported for ward use. Nothing specialist is installed on individual machines, which cuts both cost and support burden.",
  },
  {
    q: "What happens when power or the network fails?",
    a: "We treat interruption as a normal operating condition rather than an exception, because in practice it is. No unsaved state is lost when a machine powers down, critical workflows tolerate brief loss of connectivity, and documented fallback procedures cover extended outage with a structured process for entering the paper record back in afterwards.",
  },
  {
    q: "Will you digitise our entire paper archive?",
    a: "We recommend against it. Migrating demographics and active clinical summaries is almost always the right scope; historical folders are then digitised progressively as patients return, so effort is spent on records that are actually in use. Every migration is validated against the source before the paper process is retired.",
  },
  {
    q: "Are you an established vendor?",
    a: "No, and we won't pretend to be. CareVault is an early-stage product entering structured deployment with a small number of selected facilities. What we offer instead is genuine attention, real influence over the product, and terms that reflect the considered decision you are taking on a young company. If your requirement is for a long-established vendor with an extensive installed base, we would say so plainly now rather than after contracting.",
  },
];

/* ------------------------------------------------------------- primitives */

const Eyebrow = ({ children, dark = false }) => (
  <p
    className={`mb-4 text-sm font-semibold uppercase tracking-[0.18em] ${
      dark ? "text-blue-400" : "text-blue-600"
    }`}
  >
    {children}
  </p>
);

const H2 = ({ children, dark = false }) => (
  <h2
    className={`text-4xl font-bold leading-tight tracking-tight lg:text-[2.75rem] ${
      dark ? "text-white" : "text-slate-900"
    }`}
  >
    {children}
  </h2>
);

const Lead = ({ children, dark = false }) => (
  <p
    className={`mt-5 max-w-2xl text-lg leading-relaxed ${
      dark ? "text-slate-400" : "text-slate-600"
    }`}
  >
    {children}
  </p>
);

/* ------------------------------------------------------------------- page */

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="top">
        {/* ---------------------------------------------------------- hero */}
        <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24">
          <div className="hero-wash absolute inset-0" aria-hidden="true" />
          <div className="dot-grid absolute inset-0" aria-hidden="true" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1.5 text-[13px] font-semibold text-blue-700">
                  <span className="blip h-1.5 w-1.5 rounded-full bg-blue-600" />
                  Beta onboarding open · limited places
                </span>

                <h1 className="mt-6 text-[2.75rem] font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-[4.25rem]">
                  One patient.
                  <br />
                  One record.
                  <br />
                  <span className="text-blue-600">One lifetime.</span>
                </h1>

                <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
                  CareVault unifies registration, consultation, laboratory, pharmacy,
                  billing and management reporting into a single connected record — where
                  every member of staff sees exactly the part of it their role requires,
                  and nothing else.
                </p>

                <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-700">
                  We are entering{" "}
                  <span className="font-semibold text-slate-900">
                    structured beta deployment
                  </span>{" "}
                  with a small number of partner facilities, and we are onboarding the
                  doctors who will use it first.
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <a
                    href="#join"
                    className="cta-animate group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
                  >
                    Request beta access
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href="#platform"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-[15px] font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50"
                  >
                    See what it does
                  </a>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2.5">
                  {[
                    "No cost to participate",
                    "Live demonstration first",
                    "Your data stays yours",
                  ].map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-500"
                    >
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rise lg:pl-4">
                <AppPreview />
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------- alignment strip */}
        <section className="border-y border-slate-200/70 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Built to national and international health data standards
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {alignment.map((a) => (
                <span
                  key={a}
                  className="text-[15px] font-semibold tracking-tight text-slate-400"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- problem */}
        <section className="scroll-mt-16 py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <Eyebrow>Why this exists</Eyebrow>
              <H2>
                When a patient&apos;s history sits in a paper folder, clinical judgement
                quietly erodes.
              </H2>
              <Lead>
                Every hospital runs on two things: the quality of its clinical judgement,
                and the quality of the information that judgement is based on. When a
                laboratory result travels back to the consulting room on foot, and a bill
                is reconstructed at day&apos;s end from three separate books, the second
                quietly undermines the first.
              </Lead>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {problems.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="group h-full rounded-2xl border border-slate-200/80 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_16px_48px_-16px_rgba(37,99,235,0.18)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 mb-2.5 text-lg font-bold tracking-tight text-slate-900">
                    {title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-slate-600">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------- before / after band */}
        <section
          id="platform"
          className="scroll-mt-16 border-y border-slate-200/70 bg-slate-50"
        >
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
            <div className="max-w-3xl">
              <Eyebrow>The value at a glance</Eyebrow>
              <H2>Information is entered once, by the person who generates it.</H2>
              <Lead>
                From that moment it is available — instantly and correctly — to everyone
                else authorised to see it. That single principle governs everything else
                in the system.
              </Lead>
            </div>

            <div className="mt-14 overflow-x-auto rounded-2xl border border-slate-200/80 bg-white">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                      Area
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                      Today, typically
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
                      With CareVault
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {beforeAfter.map((row) => (
                    <tr
                      key={row.area}
                      className="border-b border-slate-100 last:border-0"
                    >
                      <td className="px-6 py-5 align-top text-[15px] font-semibold text-slate-900">
                        {row.area}
                      </td>
                      <td className="px-6 py-5 align-top text-[15px] leading-relaxed text-slate-500">
                        {row.today}
                      </td>
                      <td className="px-6 py-5 align-top">
                        <span className="flex gap-2.5 text-[15px] leading-relaxed text-slate-800">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                          {row.withCV}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- modules */}
        <section className="scroll-mt-16 py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <Eyebrow>Functional scope — Phase 1</Eyebrow>
              <H2>Everything a clinic runs on, in the initial deployment.</H2>
              <Lead>
                Inpatient admission, theatre scheduling, radiology, antenatal and
                immunisation registers and patient-facing access follow in Phase 2,
                scheduled by agreement once the core is stable in daily use.
              </Lead>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {modules.map(({ icon: Icon, name, body }) => (
                <div
                  key={name}
                  className="group h-full rounded-2xl border border-slate-200/80 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_16px_48px_-16px_rgba(37,99,235,0.18)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 mb-2.5 text-lg font-bold tracking-tight text-slate-900">
                    {name}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-slate-600">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------- roles (dark band) */}
        <section
          id="roles"
          className="relative scroll-mt-16 overflow-hidden bg-slate-950"
        >
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(50rem 28rem at 20% 0%, rgba(21,93,252,0.22), transparent 60%), radial-gradient(40rem 24rem at 85% 100%, rgba(0,188,125,0.12), transparent 60%)",
            }}
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
            <div className="max-w-3xl">
              <Eyebrow dark>The role-based experience</Eyebrow>
              <H2 dark>
                You see clinical information. Finance sees billing. Same application,
                different hospital.
              </H2>
              <Lead dark>
                Permissions are evaluated by the system before anything is displayed. A
                user who isn&apos;t authorised for a function doesn&apos;t merely lack the
                button — the function is not available to them by any route.
                Confidentiality is enforced structurally, not by policy and trust.
              </Lead>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/10 md:grid-cols-2 lg:grid-cols-3">
              {roles.map((r) => (
                <div
                  key={r.role}
                  className="relative bg-slate-950/90 p-7 transition-colors hover:bg-slate-900/90"
                >
                  {r.you && (
                    <span className="absolute right-6 top-7 rounded-full bg-blue-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-blue-300 ring-1 ring-inset ring-blue-400/30">
                      You
                    </span>
                  )}
                  <h3 className="text-[15px] font-bold tracking-tight text-white">
                    {r.role}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{r.sees}</p>
                  <p className="mt-4 flex items-start gap-2 border-t border-white/10 pt-4 text-xs leading-relaxed text-slate-500">
                    <Lock className="mt-px h-3.5 w-3.5 shrink-0" />
                    {r.hidden}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- journey */}
        <section className="scroll-mt-16 py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <Eyebrow>One outpatient episode</Eyebrow>
                <H2>
                  Nothing carried, copied, telephoned, remembered or reconstructed.
                </H2>
                <Lead>
                  This is a single outpatient visit as it runs once CareVault is live. It
                  is the clearest way we know to convey what the system actually changes.
                </Lead>
                <a
                  href="#join"
                  className="group mt-8 inline-flex items-center gap-2 py-1.5 text-[15px] font-semibold text-blue-600 transition-colors hover:text-blue-700"
                >
                  See it run in your clinic
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              <ol className="relative">
                {journey.map((step, i) => (
                  <li key={step.actor} className="relative flex gap-6 pb-10 last:pb-0">
                    {i !== journey.length - 1 && (
                      <span
                        className="absolute left-[17px] top-10 h-full w-px bg-slate-200"
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white shadow-md shadow-blue-600/25">
                      {i + 1}
                    </span>
                    <div className="pt-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                        {step.actor}
                      </p>
                      <p className="mt-2.5 text-[16px] leading-relaxed text-slate-700">
                        {step.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- security */}
        <section
          id="security"
          className="scroll-mt-16 border-y border-slate-200/70 bg-slate-50"
        >
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
            <div className="max-w-3xl">
              <Eyebrow>Security, privacy & governance</Eyebrow>
              <H2>The hospital is the data controller. It stays that way.</H2>
              <Lead>
                Clinical records are among the most sensitive categories of personal data
                in existence. Your data is not aggregated for commercial purposes, not
                sold, and not shared with any third party except on your written
                instruction.
              </Lead>
            </div>

            <div className="mt-14 grid gap-5 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-slate-900">
                  Attributed, time-stamped, and never silently editable
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-slate-600">
                  Every meaningful action — viewing a record, creating a note, amending an
                  entry, raising an invoice — is recorded against the user who performed
                  it. A correction is stored as an amendment with the original preserved
                  beneath it. In a governance review or a legal dispute, the hospital can
                  demonstrate precisely what was recorded, by whom, and when.
                </p>
                <ul className="mt-7 space-y-3 border-t border-slate-200 pt-7">
                  {securityPoints.map((p) => (
                    <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-slate-600">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-5">
                {compliance.map(({ icon: Icon, label, text }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-slate-200/80 bg-white p-7"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                        <Icon className="h-4.5 w-4.5" />
                      </span>
                      <h3 className="text-[15px] font-bold tracking-tight text-slate-900">
                        {label}
                      </h3>
                    </div>
                    <p className="mt-3.5 text-[15px] leading-relaxed text-slate-600">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------- beta terms */}
        <section id="beta" className="scroll-mt-16 py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <Eyebrow>Why we are onboarding, not selling</Eyebrow>
              <H2>A deliberate choice to work closely with a handful of hospitals.</H2>
              <Lead>
                We would rather shape the product against real clinical workflow with
                engaged leadership than sell broadly into environments we do not
                understand. In exchange we ask for engaged participation: honest feedback
                and a nominated internal champion.
              </Lead>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {partnerTerms.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="flex gap-5 rounded-2xl border border-slate-200/80 bg-white p-8"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="mb-2.5 text-lg font-bold tracking-tight text-slate-900">
                      {title}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-slate-600">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Implementation phases */}
            <div className="mt-16 rounded-2xl border border-slate-200/80 bg-white p-8 lg:p-10">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-lg font-bold tracking-tight text-slate-900">
                  How a rollout runs
                </h3>
                <p className="text-sm font-medium text-slate-500">
                  Indicative total: 15–16 weeks, confirmed jointly after discovery
                </p>
              </div>

              <div className="mt-8 grid gap-px overflow-hidden rounded-xl bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
                {phases.map((p) => (
                  <div key={p.n} className="bg-white px-6 py-5">
                    <p className="text-xs font-bold tracking-[0.14em] text-blue-600">
                      {p.n}
                    </p>
                    <p className="mt-2 text-[15px] font-semibold text-slate-900">
                      {p.stage}
                    </p>
                    <p className="mt-1 text-[13px] text-slate-500">{p.weeks}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Honesty callout */}
            <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50/60 p-8 lg:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
                Being straight with you
              </p>
              <p className="mt-4 max-w-3xl text-[17px] leading-relaxed text-slate-700">
                CareVault is an early-stage product entering structured deployment. We are
                not a twenty-year-old vendor with two hundred reference sites, and we will
                not pretend to be. If your requirement is for a long-established vendor
                with an extensive installed base, we would say so plainly at this stage
                rather than after contracting.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ join */}
        <section
          id="join"
          className="scroll-mt-16 border-y border-slate-200/70 bg-slate-50"
        >
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
            <div className="grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
              <div>
                <Eyebrow>Beta onboarding</Eyebrow>
                <H2>Put your name down, and we&apos;ll show you the system.</H2>
                <Lead>
                  Thirty minutes of watching a patient move through CareVault tells you
                  more than any written proposal can, and it costs the hospital nothing
                  but the time.
                </Lead>

                <dl className="mt-12 grid gap-8 sm:grid-cols-3">
                  {[
                    ["< 10s", "to retrieve a full patient history"],
                    ["8", "roles, each with its own environment"],
                    ["15–16 wks", "contract to full operation"],
                  ].map(([stat, label]) => (
                    <div key={label}>
                      <dt className="text-3xl font-bold tracking-tight text-slate-900">
                        {stat}
                      </dt>
                      <dd className="mt-2 text-sm leading-relaxed text-slate-500">
                        {label}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-12 flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    <Clock className="h-5 w-5" />
                  </span>
                  <p className="text-[15px] leading-relaxed text-slate-600">
                    Places in the foundation cohort are limited by how closely we can work
                    with each facility. We review every request and reply within two
                    business days.
                  </p>
                </div>
              </div>

              <div className="lg:pt-4">
                <OnboardingForm />
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- faq */}
        <section id="faq" className="scroll-mt-16 py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <Eyebrow>Common questions</Eyebrow>
                <H2>Before you put your name down.</H2>
                <Lead>
                  If something here isn&apos;t answered, raise it at the demonstration —
                  we would rather establish it now than later.
                </Lead>
              </div>

              <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200/80 bg-white">
                {faqs.map((f) => (
                  <details key={f.q} className="group">
                    <summary className="flex cursor-pointer items-center justify-between gap-6 px-6 py-5 text-left text-[16px] font-semibold text-slate-900 transition-colors hover:bg-slate-50">
                      {f.q}
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-transform duration-300 group-open:rotate-45 group-open:bg-blue-50 group-open:text-blue-600">
                        <Plus className="h-4 w-4" />
                      </span>
                    </summary>
                    <p className="px-6 pb-6 text-[15px] leading-relaxed text-slate-600">
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ closing CTA */}
        <section className="relative overflow-hidden bg-slate-950">
          <div
            className="absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(44rem 26rem at 50% 0%, rgba(21,93,252,0.28), transparent 62%)",
            }}
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-3xl px-6 py-24 text-center lg:py-32">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[13px] font-semibold text-slate-200">
              <span className="blip h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Foundation cohort — onboarding now
            </span>

            <h2 className="mt-7 text-4xl font-bold leading-tight tracking-tight text-white lg:text-[2.75rem]">
              Ready to stop reconstructing the record?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-400">
              Join the doctors shaping CareVault before it launches. Three details, a live
              demonstration, and no commitment until you&apos;ve seen it work.
            </p>

            <a
              href="#join"
              className="cta-animate cta-animate-light group mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-[15px] font-semibold text-slate-900 shadow-lg shadow-black/20 hover:bg-slate-100"
            >
              Request beta access
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </section>
      </main>

      {/* ---------------------------------------------------------- footer */}
      <footer className="border-t border-slate-200/70 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="max-w-sm">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md shadow-blue-600/25">
                  <HeartPulse className="h-[18px] w-[18px]" />
                </span>
                <span className="text-[17px] font-bold tracking-tight text-slate-900">
                  Care<span className="text-blue-600">Vault</span>
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-500">
                A unified Electronic Health Records and hospital operations platform,
                built for the operating conditions of hospitals in Nigeria and comparable
                markets.
              </p>
            </div>

            <nav className="flex flex-wrap gap-x-8 gap-y-2">
              {[
                ["#platform", "Platform"],
                ["#roles", "Access"],
                ["#security", "Security"],
                ["#beta", "Beta terms"],
                ["#faq", "FAQ"],
                ["#join", "Request access"],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className="inline-block py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[13px] text-slate-500">
              © {new Date().getFullYear()} CareVault. All rights reserved.
            </p>
            <p className="text-[13px] text-slate-500">
              Beta programme · Nigeria Data Protection Act 2023 aligned
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
