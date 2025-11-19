'use client';

import { useState } from 'react';
import ScreenshotCapture from '@/components/ScreenshotCapture';
import ScreenshotEditor from '@/components/ScreenshotEditor';
import ScreenshotGallery from '@/components/ScreenshotGallery';
import PresetManager from '@/components/PresetManager';
import { FiCamera, FiImage, FiSettings, FiGrid } from 'react-icons/fi';

type Tab = 'capture' | 'gallery' | 'presets' | 'settings';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('capture');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <ScreenshotEditor />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Snapper
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Beautiful screenshots with automatic styling and cloud storage
          </p>
        </header>

        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-6 p-2">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('capture')}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'capture'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <FiCamera className="mr-2" />
              Capture
            </button>
            
            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'gallery'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <FiImage className="mr-2" />
              Gallery
            </button>
            
            <button
              onClick={() => setActiveTab('presets')}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'presets'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <FiGrid className="mr-2" />
              Presets
            </button>
            
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'settings'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <FiSettings className="mr-2" />
              Settings
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'capture' && <ScreenshotCapture />}
          {activeTab === 'gallery' && <ScreenshotGallery />}
          {activeTab === 'presets' && <PresetManager />}
          {activeTab === 'settings' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                Settings
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
                  <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">
                    Supabase Configuration Required
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    To enable cloud storage and authentication, you need to configure Supabase:
                  </p>
                  <ol className="list-decimal list-inside text-sm text-gray-600 dark:text-gray-300 space-y-2">
                    <li>Create a Supabase project at <a href="https://supabase.com" target="_blank" className="text-blue-500 hover:underline">supabase.com</a></li>
                    <li>Run the SQL schema from <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">docs/database-schema.sql</code></li>
                    <li>Create a storage bucket named "screenshots"</li>
                    <li>Copy your project URL and anon key to <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">.env.local</code></li>
                  </ol>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">
                    Keyboard Shortcuts
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex justify-between">
                      <span>Capture Full Screen</span>
                      <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Ctrl + Shift + F</kbd>
                    </div>
                    <div className="flex justify-between">
                      <span>Capture Area</span>
                      <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Ctrl + Shift + A</kbd>
                    </div>
                    <p className="text-xs mt-3 text-gray-500">
                      Note: Keyboard shortcuts work when the app is in focus
                    </p>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">
                    About Snapper
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Version 1.0.0 - A modern screenshot tool with automatic styling, OCR text extraction, 
                    and cloud storage integration. Built with Next.js, Tailwind CSS, and Supabase.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>Built with Next.js, Tailwind CSS, and Supabase</p>
        </footer>
      </div>
    </div>
  );
}
