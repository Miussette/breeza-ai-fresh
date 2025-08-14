import React from 'react';
import { SimplePage } from "../components/ui/SimplePage";

export default function MindfulnessPage() {
  return (
    <SimplePage
      title="Mindfulness Music"
      subtitle="Relax with calming sounds and guided meditation"
      centerTitle
    >
      <div className="space-y-8">
        {/* YouTube Embed */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            🎵 Peaceful Meditation Music
          </h3>
          <div className="aspect-video rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/1ZYbU82GVz4?si=example"
              title="Peaceful Meditation Music"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">
            🧘 How to Use This Space
          </h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Find a comfortable position and close your eyes
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Focus on your breath and let the music guide you
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              If your mind wanders, gently bring attention back to the sounds
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Start with 5-10 minutes and gradually increase as you feel comfortable
            </li>
          </ul>
        </div>
      </div>
    </SimplePage>
  );
}