import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "RecoveryOS Marketing",
  description: "Stunning, motion-forward marketing surface for RecoveryOS."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
