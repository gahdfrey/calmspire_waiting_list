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
      throw new Error("Failed to record the beta request");
    }

    return {
      successMessage: `Thank you, ${doctorName}. Your interest has been recorded.`,
    };
  } catch (error) {
    return {
      errorMessage:
        "We couldn't record your request just now. Please try again in a moment.",
    };
  }
};
