import React, { useState, useEffect } from 'react';

interface GratitudeEntry {
  id: string;
  text: string;
  date: string;
}

export const GratitudeJournal: React.FC = () => {
  const [entries, setEntries] = useState<GratitudeEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Load entries from localStorage on mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('gratitudeEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save entries to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem('gratitudeEntries', JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentEntry.trim()) {
      const newEntry: GratitudeEntry = {
        id: Date.now().toString(),
        text: currentEntry.trim(),
        date: new Date().toLocaleDateString()
      };
      
      setEntries(prev => [newEntry, ...prev]);
      setCurrentEntry('');
      setShowSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          💜 Gratitude Journal
        </h3>
        <p className="text-gray-600">
          Take a moment to reflect on what you're grateful for today
        </p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg">
          <p className="text-green-700 text-center font-medium">
            💜 Thank you for taking time to reflect. Your gratitude has been saved!
          </p>
        </div>
      )}

      {/* Entry Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="gratitude-entry" className="block text-sm font-medium text-gray-700 mb-2">
            What are you grateful for today?
          </label>
          <textarea
            id="gratitude-entry"
            value={currentEntry}
            onChange={(e) => setCurrentEntry(e.target.value)}
            placeholder="I'm grateful for..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            rows={3}
            maxLength={500}
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {currentEntry.length}/500 characters
          </div>
        </div>
        
        <button
          type="submit"
          disabled={!currentEntry.trim()}
          className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          Add Gratitude Entry
        </button>
      </form>

      {/* Previous Entries */}
      {entries.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Your Gratitude Journey ({entries.length} entries)
          </h4>
          
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-gray-800 mb-2">{entry.text}</p>
                    <p className="text-xs text-gray-500">{entry.date}</p>
                  </div>
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete entry"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {entries.length === 0 && (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🌟</div>
          <p className="text-gray-500">
            Start your gratitude journey by adding your first entry above
          </p>
        </div>
      )}

      {/* Gratitude Tips */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
        <h5 className="font-semibold text-gray-800 mb-2">💡 Gratitude Tips</h5>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Be specific about what you're grateful for</li>
          <li>• Focus on people who have helped you</li>
          <li>• Notice small, everyday moments of joy</li>
          <li>• Reflect on challenges that helped you grow</li>
        </ul>
      </div>
    </div>
  );
};