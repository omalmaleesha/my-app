import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import Page from "./protected/page";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center w-full">
            <div className="flex-1 w-full flex flex-col">
              {/* Navigation Bar */}
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-7xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-white text-black rounded-full shadow-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 20h5v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2h5M9 12h6m-3-3v6m0 0v6m0-6H6m6 0h6"
                        />
                      </svg>
                    </div>
                    <h1 className="text-xl font-bold text-white-800 tracking-wide">Blogger</h1>
                  </div>

                  {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                </div>
              </nav>

              {/* Main Content */}
              <div className="flex flex-col w-full px-2">
                {/* Reducing the gap between the header and the content */}
                <div className="flex-1 w-full">{children}</div>
              </div>

              {/* Footer */}
              <footer className="bg-black text-gray-400 py-4 w-full">
                <div className="flex flex-col md:flex-row justify-between items-center px-6 space-y-2 md:space-y-0 text-sm">
                  <h1 className="text-white font-bold">Blogger</h1>

                  <div className="flex space-x-4">
                    <a href="#" className="hover:text-white transition">
                      About
                    </a>
                    <a href="#" className="hover:text-white transition">
                      Contact
                    </a>
                    <a href="#" className="hover:text-white transition">
                      Privacy
                    </a>
                  </div>

                  <p>&copy; 2024 Blogger. All rights reserved.</p>
                </div>
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
