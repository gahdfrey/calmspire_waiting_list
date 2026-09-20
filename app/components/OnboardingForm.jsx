"use client";

import { useState } from "react";
import { addRegistration } from "../action";
import { ArrowRight, Check } from "./icons";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const nextSteps = [
  "We review your facility and confirm fit for the beta cohort.",
  "A 30-minute live demonstration — one patient, end to end through the system.",
  "A discovery visit, then a trial environment configured with your own service catalogue.",
];

export const OnboardingForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [submitted, setSubmitted] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);
    const doctorName = (formData.get("doctorName") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const hospitalName = (formData.get("hospitalName") || "").toString().trim();

    if (!doctorName || !email || !hospitalName) {
      setError("Please complete every field before submitting.");
      return;
    }

    if (!EMAIL_PATTERN.test(email)) {
      setError("That email address doesn't look right. Please check it.");
      return;
    }

    setIsPending(true);
    const res = await addRegistration(formData);
    setIsPending(false);

    if (res.successMessage) {
      setSubmitted({ doctorName, hospitalName });
    } else {
      setError(res.errorMessage);
    }
  };

  if (submitted) {
    return (
      <div className="rise rounded-2xl border border-slate-200/80 bg-white p-8 shadow-[0_24px_64px_-28px_rgba(15,23,43,0.28)] sm:p-10">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-600/20">
          <Check className="h-6 w-6" />
        </span>

        <h3 className="mt-6 text-2xl font-bold tracking-tight text-slate-900">
          Your place is reserved
        </h3>

        <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
          Thank you, <span className="font-semibold text-slate-900">{submitted.doctorName}</span>.
          We&apos;ve recorded your interest on behalf of{" "}
          <span className="font-semibold text-slate-900">{submitted.hospitalName}</span>, and
          we&apos;ll be in touch within two business days.
        </p>

        <div className="mt-8 border-t border-slate-200 pt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            What happens next
          </p>
          <ol className="mt-5 space-y-4">
            {nextSteps.map((step, i) => (
              <li key={step} className="flex gap-3.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[11px] font-bold text-blue-700">
                  {i + 1}
                </span>
                <span className="text-[15px] leading-relaxed text-slate-600">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-[0_24px_64px_-28px_rgba(15,23,43,0.28)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-slate-900">
            Request beta access
          </h3>
          <p className="mt-1.5 text-sm text-slate-500">
            Three details. No obligation, and no commitment until you&apos;ve seen it run.
          </p>
        </div>
        <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-600/20 sm:inline-flex">
          <span className="blip h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Open
        </span>
      </div>

      <form onSubmit={handleSubmit} className="mt-7 space-y-5" noValidate>
        <div>
          <label
            htmlFor="doctorName"
            className="block text-sm font-medium text-slate-700"
          >
            Doctor&apos;s name
          </label>
          <input
            id="doctorName"
            name="doctorName"
            type="text"
            autoComplete="name"
            placeholder="Dr. Adaeze Okonkwo"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@hospital.org"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            required
          />
        </div>

        <div>
          <label
            htmlFor="hospitalName"
            className="block text-sm font-medium text-slate-700"
          >
            Hospital name
          </label>
          <input
            id="hospitalName"
            name="hospitalName"
            type="text"
            autoComplete="organization"
            placeholder="St. Luke's Specialist Hospital"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            required
          />
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Submitting…" : "Join the beta cohort"}
          {!isPending && (
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          )}
        </button>

        <p className="text-center text-xs leading-relaxed text-slate-500">
          Your details are used only to contact you about the CareVault beta. They are
          never sold or shared with third parties.
        </p>
      </form>
    </div>
  );
};
