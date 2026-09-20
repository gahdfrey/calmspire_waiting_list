import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const title = "CareVault — Beta Onboarding for Clinicians";
const description =
  "CareVault unifies registration, consultation, laboratory, pharmacy, billing and reporting into one connected patient record. We are onboarding doctors and hospitals for the structured beta. Request your place.";

export const metadata = {
  metadataBase: new URL("https://carevault.health"),
  title,
  description,
  keywords: [
    "CareVault",
    "EHR Nigeria",
    "electronic health records",
    "hospital management software",
    "clinical software beta",
    "NDHI",
    "HL7 FHIR",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "CareVault",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
