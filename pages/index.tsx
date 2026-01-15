import React from 'react'
import Link from 'next/link'
import { Button } from '../lib/design-system'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
            RecoveryOS
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A governed design system for therapeutic visual experiences that serve the four realities:
            Sense → Route → Deliver → Seal
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="primary" size="lg">
              Explore Components
            </Button>
            <Link href="/docs">
              <Button variant="secondary" size="lg">
                View Documentation
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-2">🎨 Design Tokens</h3>
              <p className="text-gray-600">
                Comprehensive color, typography, and motion tokens following RecoveryOS constitution.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-2">🧩 Component Library</h3>
              <p className="text-gray-600">
                Accessible, therapeutic UI components built with React and TypeScript.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-2">🎯 Asset Governance</h3>
              <p className="text-gray-600">
                Universal tagging system for therapeutic visual content with Supabase integration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
