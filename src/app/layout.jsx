import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EC.Bills",
  description: "AI Powered.",
};

export default function RootLayout({ children }) {
  return (
    <html data-theme="light" lang="en" className="bg-base-300 px-4 py-2">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="w-full h-full">
          <div className="w-full h-12"></div>
          <div className="flex">
            <ul className="menu bg-base-100 rounded-box h-dvh w-56 hidden">
              <li><a>Item 1</a></li>
              <li>
                <details open>
                  <summary>Analysis</summary>
                  <ul>
                    <li><a>Submenu 1</a></li>
                    <li><a>Submenu 2</a></li>
                  </ul>
                </details>
              </li>
              <li><a>Item 3</a></li>
            </ul>
            <div className="w-full h-full px-6">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}