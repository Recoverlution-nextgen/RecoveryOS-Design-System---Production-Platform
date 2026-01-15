import React from 'react'
import fs from 'fs'
import path from 'path'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { GetStaticProps } from 'next'

interface DocsProps {
  operatingTruth: string
  recoveryos: string
}

export default function Docs({ operatingTruth, recoveryos }: DocsProps) {
  const [activeTab, setActiveTab] = React.useState<'operating-truth' | 'recoveryos'>('operating-truth')

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Documentation
            </h1>
            <a 
              href="/" 
              className="text-purple-600 hover:text-purple-700 underline"
            >
              ← Back to Home
            </a>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('operating-truth')}
                className={`flex-1 px-6 py-4 text-left font-medium transition-colors ${
                  activeTab === 'operating-truth'
                    ? 'bg-purple-50 text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Operating Truth
              </button>
              <button
                onClick={() => setActiveTab('recoveryos')}
                className={`flex-1 px-6 py-4 text-left font-medium transition-colors ${
                  activeTab === 'recoveryos'
                    ? 'bg-purple-50 text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                RecoveryOS Design System
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <article className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-purple-600 prose-strong:text-gray-900 prose-code:text-purple-600 prose-code:bg-purple-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
              {activeTab === 'operating-truth' && (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {operatingTruth}
                </ReactMarkdown>
              )}
              {activeTab === 'recoveryos' && (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {recoveryos}
                </ReactMarkdown>
              )}
            </article>
          </div>
        </div>
      </div>
    </main>
  )
}

export const getStaticProps: GetStaticProps<DocsProps> = async () => {
  const contentDir = path.join(process.cwd(), 'content')
  
  const operatingTruth = fs.readFileSync(
    path.join(contentDir, 'operating-truth.md'),
    'utf-8'
  )
  
  const recoveryos = fs.readFileSync(
    path.join(contentDir, 'recoveryos.md'),
    'utf-8'
  )

  return {
    props: {
      operatingTruth,
      recoveryos,
    },
  }
}
