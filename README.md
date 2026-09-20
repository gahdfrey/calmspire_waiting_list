# CareVault — Beta Onboarding

The beta waiting-list site for **CareVault**, a unified Electronic Health Records and
hospital operations platform. The page addresses doctors and facility leads, makes clear
that CareVault is in **structured beta deployment**, and collects expressions of
interest from hospitals that want a place in the foundation cohort.

Content is drawn from the *CareVault Technical & Software Proposal* (v1.0). The visual
design follows the CareVault product site: Tailwind v4 defaults, light theme,
`blue-600` primary, `slate` neutrals, `rounded-xl` controls and `rounded-2xl` cards.

## What it collects

Exactly three fields:

| Field         | Form name      | Notes                    |
| ------------- | -------------- | ------------------------ |
| Doctor's name | `doctorName`   | required                 |
| Work email    | `email`        | required, format-checked |
| Hospital name | `hospitalName` | required                 |

A `submittedAt` ISO timestamp is added server-side.

## Configuration

```
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/.../exec
```

If the variable is missing, the form fails gracefully with a message rather than erroring.

## Google Sheets backend

[`apps-script/Code.gs`](apps-script/Code.gs) is the Apps Script web app that receives
submissions. It matches the current field names, and adds a header row, a script lock so
concurrent submissions can't collide, duplicate-email suppression, and server-side
validation.

To install it:

1. Open the target Google Sheet → **Extensions → Apps Script**.
2. Paste `apps-script/Code.gs` over the default `Code.gs` and save.
3. Run `setupSheet` once from the editor and accept the permission prompt.
4. **Deploy → New deployment → Web app**, with *Execute as: Me* and
   *Who has access: Anyone*.
5. Copy the `/exec` URL into `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`.

Opening the `/exec` URL in a browser returns `{"ok":true,...}` as a health check.

> The field names changed from the original version of this app (`firstName`,
> `lastName`, `phone`, `email`). If you have an older Apps Script deployment, replace it
> with `apps-script/Code.gs` or rows will land empty.

## Running

```bash
npm install
npm run dev
```

## Structure

```
app/
  page.js                      landing page — all sections and copy
  layout.js                    fonts and metadata
  action.js                    server action; forwards submissions to Apps Script
  globals.css                  Tailwind v4 entry, theme tokens, keyframes
  components/
    SiteHeader.jsx             fixed header, scroll state, mobile menu
    AppPreview.jsx             hero product mockup (clinician dashboard)
    OnboardingForm.jsx         three-field form with validation and success state
    icons.jsx                  inline lucide-style icon set
apps-script/
  Code.gs                      Google Sheets receiver
```

Page sections: hero with product preview · standards strip · why this exists · value at
a glance · Phase 1 modules · role-based access (dark band) · one outpatient episode ·
security and regulatory alignment · beta partner terms and rollout phases · onboarding
form · FAQ · closing CTA.

## Stack

Next.js 15 (App Router) · React 19 · Tailwind CSS v4
