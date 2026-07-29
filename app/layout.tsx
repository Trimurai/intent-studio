import type { Metadata } from "next";
import "./globals.css";
import "./extra.css";

export const metadata: Metadata = {
  title: "IntentStudio | Enterprise Decision Intelligence",
  description: "A role-aware Enterprise Digital Brain for decisive leadership.",
  openGraph: {
    title: "IntentStudio | Make every intention count.",
    description: "Turn enterprise knowledge into focused, grounded decisions.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Intent Studio | The CEO Digital Brain",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
