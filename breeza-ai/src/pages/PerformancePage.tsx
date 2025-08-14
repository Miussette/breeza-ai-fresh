import React from 'react';
import { SimplePage } from "../components/ui/SimplePage";

export default function PerformancePage() {
  return (
    <SimplePage
      title="Your Performance Analytics"
      subtitle="Track your mental wellness journey and celebrate your progress"
      centerTitle
    >
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">87%</div>
            <div className="text-gray-700 font-medium">Completion Rate</div>
            <div className="text-sm text-gray-500 mt-1">This month</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">24</div>
            <div className="text-gray-700 font-medium">Day Streak</div>
            <div className="text-sm text-gray-500 mt-1">Current active streak</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">4.8</div>
            <div className="text-gray-700 font-medium">Mood Score</div>
            <div className="text-sm text-gray-500 mt-1">Average this week</div>
          </div>
        </div>

        {/* Progress Charts */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            📊 Activity Progress
          </h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Breathing Exercises</span>
                <span className="text-sm text-gray-500">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Gratitude Journal</span>
                <span className="text-sm text-gray-500">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" style={{width: '92%'}}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Weekly Plans</span>
                <span className="text-sm text-gray-500">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{width: '78%'}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Mood Trends */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            📈 Mood Trends
          </h3>
          <div className="text-center py-8">
            <div className="text-6xl mb-4">📊</div>
            <p className="text-gray-600">
              Your mood has been trending upward over the past week!
            </p>
            <div className="flex justify-center space-x-4 mt-4">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">+15% Happiness</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">-23% Stress</span>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            🏆 Recent Achievements
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl mb-2">🔥</div>
              <div className="text-sm font-medium text-gray-700">Week Warrior</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🧘</div>
              <div className="text-sm font-medium text-gray-700">Zen Master</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💜</div>
              <div className="text-sm font-medium text-gray-700">Gratitude Guru</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">⭐</div>
              <div className="text-sm font-medium text-gray-700">Consistency King</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Keep up the great work! Your mental wellness journey is making a real difference.
          </p>
          <a
            href="/session"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
          >
            Continue Your Journey
          </a>
        </div>
      </div>
    </SimplePage>
  );
}