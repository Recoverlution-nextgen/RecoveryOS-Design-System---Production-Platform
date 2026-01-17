import { useState } from "react";
import { Button } from "../ui/button";
import { projectId, publicAnonKey } from "../../utils/supabase/info";

/**
 * Pixabay API Test Page
 * 
 * Diagnostic tool to test Pixabay integration and API key
 */
export function PixabayTestPage() {
  const [testResult, setTestResult] = useState<any>(null);
  const [searchResult, setSearchResult] = useState<any>(null);
  const [simpleSearchResult, setSimpleSearchResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runTest = async () => {
    setLoading(true);
    setTestResult(null);
    
    console.log('🧪 Running API Key Test...');
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/pixabay/test`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      
      const data = await response.json();
      console.log('🧪 Test result:', data);
      console.log('🧪 Response status:', response.status);
      
      setTestResult({
        ...data,
        status: response.status,
        statusText: response.statusText
      });
    } catch (error) {
      console.error('❌ Test error:', error);
      setTestResult({ success: false, error: error.message });
    }
    
    setLoading(false);
  };

  const runSimpleSearch = async () => {
    setLoading(true);
    setSimpleSearchResult(null);
    
    console.log('🔍 Running simple search (no filters)...');
    
    try {
      // Simplest possible search - no colors, no dimensions
      const params = new URLSearchParams({
        q: 'purple',
        per_page: '5'
      });
      
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/pixabay/search?${params.toString()}`;
      console.log('🔍 Request URL:', url);
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      
      const data = await response.json();
      console.log('🔍 Simple search result:', data);
      console.log('🔍 Response status:', response.status);
      
      setSimpleSearchResult({
        ...data,
        status: response.status,
        statusText: response.statusText
      });
    } catch (error) {
      console.error('❌ Simple search error:', error);
      setSimpleSearchResult({ error: error.message });
    }
    
    setLoading(false);
  };

  const runSearch = async () => {
    setLoading(true);
    setSearchResult(null);
    
    console.log('🎯 Running full Journey search (with all filters)...');
    
    try {
      const params = new URLSearchParams({
        q: 'bokeh purple spheres macro',
        per_page: '5',
        image_type: 'photo',
        orientation: 'horizontal',
        colors: 'lilac',
        min_width: '1920',
        min_height: '1080'
      });
      
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/pixabay/search?${params.toString()}`;
      console.log('🎯 Request URL:', url.replace(/key=[^&]+/, 'key=***'));
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      
      const data = await response.json();
      console.log('🎯 Full search result:', data);
      console.log('🎯 Response status:', response.status);
      
      setSearchResult({
        ...data,
        status: response.status,
        statusText: response.statusText
      });
    } catch (error) {
      console.error('❌ Search error:', error);
      setSearchResult({ error: error.message });
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
            Pixabay API Diagnostic Tool
          </h1>
          <p className="text-gray-600">
            Run these tests in order to diagnose the 400 error issue
          </p>
        </div>
        
        <div className="space-y-6">
          {/* Test API Key */}
          <div className="p-6 border-2 border-[#3E2BB8]/20 rounded-lg bg-white shadow-sm">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#3E2BB8] text-white flex items-center justify-center flex-shrink-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                1
              </div>
              <div className="flex-1">
                <h2 className="text-xl mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                  Test API Key
                </h2>
                <p className="text-gray-600 mb-4">
                  Makes the simplest possible request to verify PIXABAY_API_KEY is valid
                </p>
              </div>
            </div>
            <Button 
              onClick={runTest} 
              disabled={loading}
              className="bg-[#3E2BB8] hover:bg-[#5739FB]"
            >
              {loading ? 'Testing...' : 'Run Test'}
            </Button>
            
            {testResult && (
              <div className="mt-4">
                {testResult.success ? (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 mb-2" style={{ fontWeight: 600 }}>
                      ✅ API Key is Valid!
                    </p>
                    <p className="text-sm text-green-700">
                      Found {testResult.totalHits} results. Your PIXABAY_API_KEY is working correctly.
                    </p>
                  </div>
                ) : (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 mb-2" style={{ fontWeight: 600 }}>
                      ❌ API Key Test Failed
                    </p>
                    <p className="text-sm text-red-700 mb-2">
                      Status: {testResult.status} {testResult.statusText}
                    </p>
                    {testResult.error && (
                      <p className="text-xs text-red-600 bg-red-100 p-2 rounded mt-2 font-mono">
                        {testResult.error}
                      </p>
                    )}
                  </div>
                )}
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                    Show raw response
                  </summary>
                  <pre className="mt-2 p-4 bg-gray-50 rounded-lg text-xs overflow-auto">
                    {JSON.stringify(testResult, null, 2)}
                  </pre>
                </details>
              </div>
            )}
          </div>

          {/* Test Simple Search */}
          <div className="p-6 border-2 border-[#3E2BB8]/20 rounded-lg bg-white shadow-sm">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#3E2BB8] text-white flex items-center justify-center flex-shrink-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                2
              </div>
              <div className="flex-1">
                <h2 className="text-xl mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                  Test Simple Search
                </h2>
                <p className="text-gray-600 mb-4">
                  Search for "purple" with no additional filters (no colors, no dimensions)
                </p>
              </div>
            </div>
            <Button 
              onClick={runSimpleSearch} 
              disabled={loading}
              className="bg-[#3E2BB8] hover:bg-[#5739FB]"
            >
              {loading ? 'Searching...' : 'Run Simple Search'}
            </Button>
            
            {simpleSearchResult && (
              <div className="mt-4">
                {simpleSearchResult.totalHits > 0 ? (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 mb-2" style={{ fontWeight: 600 }}>
                      ✅ Simple Search Works!
                    </p>
                    <p className="text-sm text-green-700">
                      Found {simpleSearchResult.totalHits} results without filters.
                    </p>
                  </div>
                ) : (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 mb-2" style={{ fontWeight: 600 }}>
                      ❌ Simple Search Failed
                    </p>
                    <p className="text-sm text-red-700 mb-2">
                      Status: {simpleSearchResult.status} {simpleSearchResult.statusText}
                    </p>
                    {simpleSearchResult.error && (
                      <p className="text-xs text-red-600 bg-red-100 p-2 rounded mt-2 font-mono">
                        {simpleSearchResult.error}
                      </p>
                    )}
                  </div>
                )}
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                    Show raw response
                  </summary>
                  <pre className="mt-2 p-4 bg-gray-50 rounded-lg text-xs overflow-auto">
                    {JSON.stringify(simpleSearchResult, null, 2)}
                  </pre>
                </details>
              </div>
            )}
          </div>

          {/* Test Full Journey Search */}
          <div className="p-6 border-2 border-[#3E2BB8]/20 rounded-lg bg-white shadow-sm">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#3E2BB8] text-white flex items-center justify-center flex-shrink-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                3
              </div>
              <div className="flex-1">
                <h2 className="text-xl mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                  Test Journey Search (Full Parameters)
                </h2>
                <p className="text-gray-600 mb-4">
                  Tests the actual search with all filters: colors=lilac, min_width=1920, min_height=1080
                </p>
              </div>
            </div>
            <Button 
              onClick={runSearch} 
              disabled={loading}
              className="bg-[#3E2BB8] hover:bg-[#5739FB]"
            >
              {loading ? 'Searching...' : 'Run Journey Search'}
            </Button>
            
            {searchResult && (
              <div className="mt-4">
                {searchResult.totalHits > 0 ? (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 mb-2" style={{ fontWeight: 600 }}>
                      ✅ Journey Search Works!
                    </p>
                    <p className="text-sm text-green-700">
                      Found {searchResult.totalHits} results with all filters applied.
                    </p>
                    {searchResult.hits && searchResult.hits.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        {searchResult.hits.slice(0, 4).map((image: any) => (
                          <div key={image.id} className="border rounded-lg overflow-hidden">
                            <img 
                              src={image.webformatURL} 
                              alt={image.tags}
                              className="w-full h-40 object-cover"
                            />
                            <p className="p-2 text-xs text-gray-600">
                              {image.tags.substring(0, 50)}...
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 mb-2" style={{ fontWeight: 600 }}>
                      ❌ Journey Search Failed
                    </p>
                    <p className="text-sm text-red-700 mb-2">
                      Status: {searchResult.status} {searchResult.statusText}
                    </p>
                    {searchResult.error && (
                      <p className="text-xs text-red-600 bg-red-100 p-2 rounded mt-2 font-mono">
                        {searchResult.error}
                      </p>
                    )}
                  </div>
                )}
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                    Show raw response
                  </summary>
                  <pre className="mt-2 p-4 bg-gray-50 rounded-lg text-xs overflow-auto max-h-96">
                    {JSON.stringify(searchResult, null, 2)}
                  </pre>
                </details>
              </div>
            )}
          </div>

          {/* Console Instructions */}
          <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <h3 className="text-lg mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
              📋 Diagnostic Instructions
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                • Open your browser console (F12) to see detailed server logs
              </p>
              <p>
                • Run tests in order (1 → 2 → 3) to narrow down the issue
              </p>
              <p>
                • Look for messages starting with 🧪, 🔍, ✅, or ❌
              </p>
              <p className="pt-2 border-t border-blue-300 mt-3">
                <strong>Common Issues:</strong>
              </p>
              <p>
                • <strong>Test 1 fails:</strong> PIXABAY_API_KEY is invalid or not set
              </p>
              <p>
                • <strong>Test 2 fails but Test 1 passes:</strong> Parameter format issue
              </p>
              <p>
                • <strong>Test 3 fails but Tests 1+2 pass:</strong> Specific filter issue (likely colors or dimensions)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
