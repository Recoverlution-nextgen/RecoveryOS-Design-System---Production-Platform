import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Recoverlution Design System - Snapshots',
  description: 'Visual regression testing and design system snapshots',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <nav className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex space-x-6">
            <a href="/__snapshots/colors" className="text-sm font-medium text-gray-900 hover:text-indigo-600">
              Colors
            </a>
            <a href="/__snapshots/assets" className="text-sm font-medium text-gray-900 hover:text-indigo-600">
              Assets
            </a>
            <a href="/__snapshots/overlays" className="text-sm font-medium text-gray-900 hover:text-indigo-600">
              Overlays
            </a>
            <a href="/__snapshots/type" className="text-sm font-medium text-gray-900 hover:text-indigo-600">
              Type
            </a>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}