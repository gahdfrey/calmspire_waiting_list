"use server";

const googleScriptURL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const addRegistration = async (formData) => {
  const doctorName = (formData.get("doctorName") || "").toString().trim();
  const email = (formData.get("email") || "").toString().trim();
  const hospitalName = (formData.get("hospitalName") || "").toString().trim();

  if (!doctorName || !email || !hospitalName) {
    return { errorMessage: "Please complete every field before submitting." };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { errorMessage: "That email address doesn't look right. Please check it." };
  }

  if (!googleScriptURL) {
    return {
      errorMessage:
        "The onboarding form isn't configured yet. Please email us directly and we'll add you manually.",
    };
  }

  try {
    const res = await fetch(googleScriptURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        doctorName,
        email,
        hospitalName,
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      throw new Error(`Apps Script returned HTTP ${res.status}`);
    }

    // Apps Script answers 200 even when the write itself failed, so the HTTP
    // status alone is not proof of success — the body has to be checked too.
    // Without this, a failed write would still show the doctor a confirmation.
    const raw = await res.text();
    let body;

    try {
      body = JSON.parse(raw);
    } catch {
      // An HTML reply means the script threw, or the deployment is not public.
      throw new Error(`Apps Script did not return JSON: ${raw.slice(0, 120)}`);
    }

    if (!body.ok) {
      throw new Error(body.error || "Apps Script reported a failed write");
    }

    return {
      successMessage: `Thank you, ${doctorName}. Your interest has been recorded.`,
    };
  } catch (error) {
    // Surfaced in the Vercel runtime logs so a silent failure is diagnosable.
    console.error("[carevault] waiting-list submission failed:", error);

    return {
      errorMessage:
        "We couldn't record your request just now. Please try again in a moment.",
    };
  }
};
