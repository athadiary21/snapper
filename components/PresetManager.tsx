'use client';

import { useEffect, useState } from 'react';
import { FiPlus, FiTrash2, FiCheck } from 'react-icons/fi';
import { useStore } from '@/lib/store';

interface Preset {
  id: string;
  name: string;
  settings: {
    backgroundColor?: string;
    padding?: number;
    borderRadius?: number;
    shadow?: boolean;
  };
}

export default function PresetManager() {
  const { presets, setPresets, selectedPreset, selectPreset } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPreset, setNewPreset] = useState({
    name: '',
    backgroundColor: '#f3f4f6',
    padding: 20,
    borderRadius: 8,
    shadow: true,
  });

  useEffect(() => {
    fetchPresets();
  }, []);

  const fetchPresets = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/presets?userId=demo-user');
      const result = await response.json();
      
      if (result.success && result.data) {
        const formattedData = result.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          settings: item.settings,
        }));
        setPresets(formattedData);
      }
    } catch (error) {
      console.error('Failed to fetch presets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createPreset = async () => {
    if (!newPreset.name.trim()) {
      alert('Please enter a preset name');
      return;
    }

    try {
      const response = await fetch('/api/presets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'demo-user',
          name: newPreset.name,
          settings: {
            backgroundColor: newPreset.backgroundColor,
            padding: newPreset.padding,
            borderRadius: newPreset.borderRadius,
            shadow: newPreset.shadow,
          },
        }),
      });

      if (response.ok) {
        await fetchPresets();
        setShowCreateForm(false);
        setNewPreset({
          name: '',
          backgroundColor: '#f3f4f6',
          padding: 20,
          borderRadius: 8,
          shadow: true,
        });
      } else {
        alert('Failed to create preset');
      }
    } catch (error) {
      console.error('Create error:', error);
      alert('Failed to create preset');
    }
  };

  const deletePreset = async (id: string) => {
    if (!confirm('Are you sure you want to delete this preset?')) return;

    try {
      const response = await fetch(`/api/presets?id=${id}&userId=demo-user`, {
        method: 'DELETE',
      });

      if (response.ok) {
        if (selectedPreset?.id === id) {
          selectPreset(null);
        }
        await fetchPresets();
      } else {
        alert('Failed to delete preset');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete preset');
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Presets
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
          Presets
        </h2>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
        >
          <FiPlus className="mr-2" /> New Preset
        </button>
      </div>

      {showCreateForm && (
        <div className="mb-6 p-4 border-2 border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-gray-900">
          <h3 className="font-semibold mb-4 text-gray-800 dark:text-white">
            Create New Preset
          </h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Preset name"
              value={newPreset.name}
              onChange={(e) => setNewPreset({ ...newPreset, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
            />
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm mb-1">Background Color</label>
                <input
                  type="color"
                  value={newPreset.backgroundColor}
                  onChange={(e) =>
                    setNewPreset({ ...newPreset, backgroundColor: e.target.value })
                  }
                  className="w-full h-10 rounded cursor-pointer"
                />
              </div>
              
              <div>
                <label className="block text-sm mb-1">Padding: {newPreset.padding}px</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={newPreset.padding}
                  onChange={(e) =>
                    setNewPreset({ ...newPreset, padding: parseInt(e.target.value) })
                  }
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={newPreset.shadow}
                onChange={(e) =>
                  setNewPreset({ ...newPreset, shadow: e.target.checked })
                }
                className="mr-2"
              />
              <label className="text-sm">Enable Shadow</label>
            </div>

            <div className="flex gap-2">
              <button
                onClick={createPreset}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Create
              </button>
              <button
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {presets.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No presets yet. Create your first preset!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {presets.map((preset) => (
            <div
              key={preset.id}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedPreset?.id === preset.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => selectPreset(preset)}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  {preset.name}
                </h3>
                <div className="flex gap-2">
                  {selectedPreset?.id === preset.id && (
                    <FiCheck className="w-5 h-5 text-blue-500" />
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePreset(preset.id);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <div
                    className="w-6 h-6 rounded border border-gray-300 mr-2"
                    style={{ backgroundColor: preset.settings.backgroundColor }}
                  />
                  <span>Background</span>
                </div>
                <div>Padding: {preset.settings.padding}px</div>
                <div>Radius: {preset.settings.borderRadius}px</div>
                <div>Shadow: {preset.settings.shadow ? 'Yes' : 'No'}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
