import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "RecoveryOS Command Center",
  description: "Studios, governance, and admin surfaces."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="cc-body">
        <div className="cc-backdrop" aria-hidden />
        {children}
      </body>
    </html>
  );
}
