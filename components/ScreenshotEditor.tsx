'use client';

import { useState, useRef, useEffect } from 'react';
import { FiSave, FiDownload, FiShare2, FiX } from 'react-icons/fi';
import { useStore } from '@/lib/store';
import Tesseract from 'tesseract.js';

interface EditorSettings {
  backgroundColor: string;
  padding: number;
  borderRadius: number;
  shadow: boolean;
}

export default function ScreenshotEditor() {
  const { currentScreenshot, setCurrentScreenshot } = useStore();
  const [settings, setSettings] = useState<EditorSettings>({
    backgroundColor: '#f3f4f6',
    padding: 20,
    borderRadius: 8,
    shadow: true,
  });
  const [extractedText, setExtractedText] = useState<string>('');
  const [isExtracting, setIsExtracting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentScreenshot && canvasRef.current) {
      renderPreview();
    }
  }, [currentScreenshot, settings]);

  const renderPreview = () => {
    if (!currentScreenshot || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      const totalPadding = settings.padding * 2;
      canvas.width = img.width + totalPadding;
      canvas.height = img.height + totalPadding;

      // Fill background
      ctx.fillStyle = settings.backgroundColor;
      if (settings.borderRadius > 0) {
        roundRect(ctx, 0, 0, canvas.width, canvas.height, settings.borderRadius);
        ctx.fill();
      } else {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Draw shadow if enabled
      if (settings.shadow) {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 10;
      }

      // Draw image
      ctx.drawImage(img, settings.padding, settings.padding);
    };
    img.src = currentScreenshot;
  };

  const roundRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  const extractText = async () => {
    if (!currentScreenshot) return;

    setIsExtracting(true);
    try {
      const result = await Tesseract.recognize(currentScreenshot, 'eng', {
        logger: (m) => console.log(m),
      });
      setExtractedText(result.data.text);
    } catch (error) {
      console.error('OCR error:', error);
      alert('Failed to extract text');
    } finally {
      setIsExtracting(false);
    }
  };

  const downloadImage = () => {
    if (!canvasRef.current) return;

    const link = document.createElement('a');
    link.download = `screenshot-${Date.now()}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  const saveToCloud = async () => {
    if (!canvasRef.current) return;

    const blob = await new Promise<Blob>((resolve) => {
      canvasRef.current!.toBlob((blob) => resolve(blob!), 'image/png');
    });

    const formData = new FormData();
    formData.append('file', blob, `screenshot-${Date.now()}.png`);
    formData.append('title', 'Screenshot');
    formData.append('userId', 'demo-user'); // Replace with actual user ID

    try {
      const response = await fetch('/api/screenshots/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Screenshot saved successfully!');
      } else {
        alert('Failed to save screenshot');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to save screenshot');
    }
  };

  const closeEditor = () => {
    setCurrentScreenshot(null);
    setExtractedText('');
  };

  if (!currentScreenshot) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Edit Screenshot
            </h2>
            <button
              onClick={closeEditor}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Preview */}
            <div className="lg:col-span-2">
              <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 overflow-auto">
                <canvas ref={canvasRef} className="max-w-full h-auto" />
              </div>
            </div>

            {/* Settings */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Background Color</label>
                <input
                  type="color"
                  value={settings.backgroundColor}
                  onChange={(e) =>
                    setSettings({ ...settings, backgroundColor: e.target.value })
                  }
                  className="w-full h-10 rounded cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Padding: {settings.padding}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.padding}
                  onChange={(e) =>
                    setSettings({ ...settings, padding: parseInt(e.target.value) })
                  }
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Border Radius: {settings.borderRadius}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={settings.borderRadius}
                  onChange={(e) =>
                    setSettings({ ...settings, borderRadius: parseInt(e.target.value) })
                  }
                  className="w-full"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.shadow}
                  onChange={(e) =>
                    setSettings({ ...settings, shadow: e.target.checked })
                  }
                  className="mr-2"
                />
                <label className="text-sm font-medium">Enable Shadow</label>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={extractText}
                  disabled={isExtracting}
                  className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 mb-2"
                >
                  {isExtracting ? 'Extracting...' : 'Extract Text (OCR)'}
                </button>

                {extractedText && (
                  <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm max-h-40 overflow-auto">
                    <p className="font-medium mb-1">Extracted Text:</p>
                    <p className="whitespace-pre-wrap">{extractedText}</p>
                  </div>
                )}
              </div>

              <div className="pt-4 space-y-2">
                <button
                  onClick={downloadImage}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center"
                >
                  <FiDownload className="mr-2" /> Download
                </button>
                <button
                  onClick={saveToCloud}
                  className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center"
                >
                  <FiSave className="mr-2" /> Save to Cloud
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
