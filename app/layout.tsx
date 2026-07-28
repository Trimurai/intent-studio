import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Intent Studio | CEO Digital Brain",
  description: "A strategic decision workspace for enterprise leaders.",
  openGraph: {
    title: "Intent Studio | The CEO Digital Brain",
    description: "Turn strategic intent into cited, actionable insight.",
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
