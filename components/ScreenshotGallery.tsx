'use client';

import { useEffect, useState } from 'react';
import { FiTrash2, FiDownload, FiEye } from 'react-icons/fi';
import { useStore } from '@/lib/store';

interface Screenshot {
  id: string;
  title: string;
  image_url: string;
  created_at: string;
}

export default function ScreenshotGallery() {
  const { screenshots, setScreenshots } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchScreenshots();
  }, []);

  const fetchScreenshots = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/screenshots?userId=demo-user');
      const result = await response.json();
      
      if (result.success && result.data) {
        const formattedData = result.data.map((item: any) => ({
          id: item.id,
          url: item.image_url,
          title: item.title,
          createdAt: new Date(item.created_at),
        }));
        setScreenshots(formattedData);
      }
    } catch (error) {
      console.error('Failed to fetch screenshots:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteScreenshot = async (id: string) => {
    if (!confirm('Are you sure you want to delete this screenshot?')) return;

    try {
      const response = await fetch(`/api/screenshots?id=${id}&userId=demo-user`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchScreenshots();
      } else {
        alert('Failed to delete screenshot');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete screenshot');
    }
  };

  const downloadScreenshot = (url: string, title: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title}.png`;
    link.click();
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Screenshot Gallery
        </h2>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Screenshot Gallery
        </h2>
        <button
          onClick={fetchScreenshots}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
        >
          Refresh
        </button>
      </div>

      {screenshots.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No screenshots yet. Capture your first screenshot!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {screenshots.map((screenshot) => (
            <div
              key={screenshot.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video bg-gray-100 dark:bg-gray-900 relative group">
                <img
                  src={screenshot.url}
                  alt={screenshot.title}
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => window.open(screenshot.url, '_blank')}
                    className="p-2 bg-white rounded-full mx-1 hover:bg-gray-100"
                    title="View"
                  >
                    <FiEye className="w-5 h-5 text-gray-800" />
                  </button>
                  <button
                    onClick={() => downloadScreenshot(screenshot.url, screenshot.title)}
                    className="p-2 bg-white rounded-full mx-1 hover:bg-gray-100"
                    title="Download"
                  >
                    <FiDownload className="w-5 h-5 text-gray-800" />
                  </button>
                  <button
                    onClick={() => deleteScreenshot(screenshot.id)}
                    className="p-2 bg-white rounded-full mx-1 hover:bg-gray-100"
                    title="Delete"
                  >
                    <FiTrash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-gray-800 dark:text-white truncate">
                  {screenshot.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(screenshot.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
