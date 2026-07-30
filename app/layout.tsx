import type { Metadata } from "next";
import "./globals.css";
import "./extra.css";
import "./enhancements.css";

export const metadata: Metadata = {
  title: "Intent Studio | Enterprise Digital Brain",
  description: "A human-led Enterprise Digital Brain for decisive leadership.",
  openGraph: {
    title: "Intent Studio | Enterprise Digital Brain",
    description: "Human intent. AI execution. Enterprise outcomes.",
    images: ["/intent-banner.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Intent Studio | Enterprise Digital Brain",
    images: ["/intent-banner.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
