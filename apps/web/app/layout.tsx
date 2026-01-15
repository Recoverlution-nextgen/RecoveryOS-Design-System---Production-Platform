import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RecoveryOS Design System',
  description: 'Governed therapeutic visual experiences for the four realities',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}