'use client';

import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { FiCamera, FiMonitor, FiSquare } from 'react-icons/fi';
import { useStore } from '@/lib/store';

export default function ScreenshotCapture() {
  const [captureMode, setCaptureMode] = useState<'full' | 'area' | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const { setCurrentScreenshot, setIsCapturing: setGlobalCapturing } = useStore();

  const captureFullScreen = async () => {
    setIsCapturing(true);
    setGlobalCapturing(true);
    
    try {
      // Simulate capture delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const canvas = await html2canvas(document.body, {
        allowTaint: true,
        useCORS: true,
        scale: 2,
      });
      
      const imageUrl = canvas.toDataURL('image/png');
      setCurrentScreenshot(imageUrl);
    } catch (error) {
      console.error('Capture error:', error);
      alert('Failed to capture screenshot');
    } finally {
      setIsCapturing(false);
      setGlobalCapturing(false);
    }
  };

  const captureArea = async () => {
    alert('Area capture: Click and drag to select an area (Feature coming soon)');
    // This would require a custom selection overlay
  };

  const handleCapture = async (mode: 'full' | 'area') => {
    setCaptureMode(mode);
    
    if (mode === 'full') {
      await captureFullScreen();
    } else if (mode === 'area') {
      await captureArea();
    }
    
    setCaptureMode(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Capture Screenshot
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => handleCapture('full')}
          disabled={isCapturing}
          className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiMonitor className="w-12 h-12 mb-3 text-blue-500" />
          <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Full Screen
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Capture entire viewport
          </span>
        </button>

        <button
          onClick={() => handleCapture('area')}
          disabled={isCapturing}
          className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-green-500 hover:bg-green-50 dark:hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiSquare className="w-12 h-12 mb-3 text-green-500" />
          <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Select Area
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Choose specific region
          </span>
        </button>
      </div>

      {isCapturing && (
        <div className="mt-4 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-300">
            Capturing...
          </span>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <strong>Tip:</strong> For best results, ensure the content you want to capture is visible on screen.
          Browser-based capture works within the current page.
        </p>
      </div>
    </div>
  );
}
