import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { WeeklyPlan as WeeklyPlanType } from '../types/weeklyPlan';

interface WeeklyPlanModalProps {
  mood: string;
  onClose: () => void;
}

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const WeeklyPlanModal: React.FC<WeeklyPlanModalProps> = ({ mood, onClose }) => {
  const [plan, setPlan] = useState<WeeklyPlanType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFullWeek, setShowFullWeek] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Load completed tasks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`completedTasks_${mood}`);
    if (saved) {
      setCompletedTasks(new Set(JSON.parse(saved)));
    }
  }, [mood]);

  // Generate weekly plan
  const loadWeeklyPlan = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('✨ Creating your personalized wellness plan...');
      console.log('API URL:', API_URL);
      console.log('Making request to:', `${API_URL}/api/weekly-plan`);

      const response = await fetch(`${API_URL}/api/weekly-plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mood,
          goals: [],
          preferences: [],
          timeAvailable: '30 minutes'
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Weekly plan response:', data);

      if (data.success && data.plan) {
        setPlan(data.plan);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('❌ Error loading weekly plan:', error);
      setError('Could not load the weekly plan. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [mood]);

  // Load plan on mount
  useEffect(() => {
    loadWeeklyPlan();
  }, [loadWeeklyPlan]);

  // Save completed tasks to localStorage
  const saveCompletedTasks = useCallback((tasks: Set<string>) => {
    localStorage.setItem(`completedTasks_${mood}`, JSON.stringify([...tasks]));
  }, [mood]);

  // Handle task completion
  const handleTaskToggle = useCallback((dayIndex: number, taskIndex: number) => {
    const taskId = `${dayIndex}-${taskIndex}`;
    const newCompleted = new Set(completedTasks);

    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
      setSuccessMessage('🎉 Great job! You\'re building healthy habits.');
      setTimeout(() => setSuccessMessage(null), 3000);
    }

    setCompletedTasks(newCompleted);
    saveCompletedTasks(newCompleted);
  }, [completedTasks, saveCompletedTasks]);

  // Calculate progress
  const progress = useMemo(() => {
    if (!plan) return 0;
    const totalTasks = plan.days.reduce((sum, day) => sum + day.tasks.length, 0);
    const completedCount = completedTasks.size;
    return totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;
  }, [plan, completedTasks]);

  // Get today's tasks (assuming Monday = 0)
  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1; // Convert Sunday=0 to Monday=0
  const todaysTasks = plan?.days[todayIndex]?.tasks || [];

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">✨ Creating your personalized wellness plan...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={loadWeeklyPlan}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!plan) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                📅 Your Weekly Wellness Plan
              </h2>
              <p className="text-gray-600 mt-1">{plan.theme}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm font-medium text-blue-600">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mx-6 mt-4 p-3 bg-green-100 border border-green-300 rounded-lg">
            <p className="text-green-700 text-center font-medium">{successMessage}</p>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {!showFullWeek ? (
            // Today's Focus View
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  Today's Focus: {daysOfWeek[todayIndex]}
                </h3>
                <p className="text-gray-600">Start with these activities to build momentum</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                <div className="space-y-4">
                  {todaysTasks.map((task, taskIndex) => {
                    const taskId = `${todayIndex}-${taskIndex}`;
                    const isCompleted = completedTasks.has(taskId);

                    return (
                      <div
                        key={taskIndex}
                        className={`flex items-center p-4 rounded-lg border-2 transition-all duration-200 ${isCompleted
                            ? 'bg-green-100 border-green-300'
                            : 'bg-white border-gray-200 hover:border-blue-300'
                          }`}
                      >
                        <input
                          type="checkbox"
                          checked={isCompleted}
                          onChange={() => handleTaskToggle(todayIndex, taskIndex)}
                          className="mr-4 h-6 w-6 text-blue-600 rounded focus:ring-blue-500"
                        />

                        <div className="flex-1">
                          <span className={`text-lg font-medium ${isCompleted ? 'text-green-700 line-through' : 'text-gray-800'
                            }`}>
                            {task.activity}
                          </span>

                          <div className="flex items-center mt-2 text-sm text-gray-600">
                            <span className="mr-4">⏱️ {task.duration}</span>
                            <span className="mr-4">🎯 {task.category}</span>
                            {task.difficulty && (
                              <span>📊 {task.difficulty}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    const todayTaskId = `${todayIndex}-0`;
                    if (!completedTasks.has(todayTaskId) && todaysTasks.length > 0) {
                      handleTaskToggle(todayIndex, 0);
                    }
                  }}
                  disabled={todaysTasks.length === 0 || completedTasks.has(`${todayIndex}-0`)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${todaysTasks.length === 0 || completedTasks.has(`${todayIndex}-0`)
                      ? 'bg-green-100 text-green-700 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transform hover:scale-105'
                    }`}
                >
                  {completedTasks.has(`${todayIndex}-0`) ? '✓ Completed' : 'Mark Complete'}
                </button>

                <button
                  onClick={() => setShowFullWeek(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
                >
                  View Full Week
                </button>
              </div>
            </div>
          ) : (
            // Full Week View
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-gray-800">Complete Weekly Plan</h3>
                <button
                  onClick={() => setShowFullWeek(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  ← Back
                </button>
              </div>

              <div className="grid gap-6">
                {plan.days.map((day, dayIndex) => (
                  <div key={dayIndex} className="border-l-4 border-blue-500 pl-6 bg-gray-50 rounded-r-lg p-4">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">
                      {daysOfWeek[dayIndex]}
                    </h4>

                    <div className="space-y-3">
                      {day.tasks.map((task, taskIndex) => {
                        const taskId = `${dayIndex}-${taskIndex}`;
                        const isCompleted = completedTasks.has(taskId);

                        return (
                          <div
                            key={taskIndex}
                            className={`flex items-center p-3 rounded-lg border transition-all duration-200 ${isCompleted
                                ? 'bg-green-100 border-green-300'
                                : 'bg-white border-gray-200 hover:bg-blue-50'
                              }`}
                          >
                            <input
                              type="checkbox"
                              checked={isCompleted}
                              onChange={() => handleTaskToggle(dayIndex, taskIndex)}
                              className="mr-3 h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                            />

                            <div className="flex-1">
                              <span className={`text-sm font-medium ${isCompleted ? 'text-green-700 line-through' : 'text-gray-700'
                                }`}>
                                {task.activity}
                              </span>

                              <div className="flex items-center mt-1 text-xs text-gray-500">
                                <span className="mr-3">⏱️ {task.duration}</span>
                                <span className="mr-3">🎯 {task.category}</span>
                                {task.difficulty && (
                                  <span>📊 {task.difficulty}</span>
                                )}
                              </div>
                            </div>

                            <button
                              onClick={() => handleTaskToggle(dayIndex, taskIndex)}
                              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${isCompleted
                                  ? 'bg-green-200 text-green-800 hover:bg-green-300'
                                  : 'bg-blue-200 text-blue-800 hover:bg-blue-300'
                                }`}
                            >
                              {isCompleted ? 'Done' : 'Mark'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips Section */}
          <div className="mt-8 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">💡 Wellness Tips</h4>
            <div className="space-y-2">
              {plan.tips.map((tip, index) => (
                <p key={index} className="text-gray-700 text-sm">
                  • {tip}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};