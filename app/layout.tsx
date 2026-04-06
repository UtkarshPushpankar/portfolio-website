import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "next-themes";
import CustomCursor from "./components/CustomCursor";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Utkarsh Pushpankar - Full-Stack Engineer",
  description:
    "Full-stack engineer specializing in AI-native products, real-time systems, and scalable backend architectures. Building production-grade software that matters.",
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "AI",
    "Machine Learning",
    "Software Engineer",
    "Utkarsh Pushpankar",
  ],
  authors: [{ name: "Utkarsh Pushpankar" }],
  openGraph: {
    title: "Utkarsh Pushpankar - Full-Stack Engineer",
    description: "Full-stack engineer building AI-native systems and production-grade software.",
    type: "website",
  },
  icons: {
    icon: [{ url: "/Professional_Photo.jpeg", type: "image/jpeg" }],
    shortcut: "/Professional_Photo.jpeg",
    apple: "/Professional_Photo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} ${spaceGrotesk.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
          <CustomCursor />
        </ThemeProvider>
      </body>
    </html>
  );
}
