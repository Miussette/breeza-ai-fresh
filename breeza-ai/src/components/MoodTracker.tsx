import React from "react";

interface MoodTrackerProps {
  onSelect: (mood: string) => void;
}

const moods = [
  { emoji: "😄", label: "Happy" },
  { emoji: "😊", label: "Calm" },
  { emoji: "😰", label: "Anxious" },
  { emoji: "😢", label: "Sad" },
  { emoji: "🤩", label: "Excited" },
  { emoji: "😓", label: "Stressed" },
  { emoji: "😤", label: "Frustrated" },
  { emoji: "😡", label: "Angry" },
  { emoji: "😴", label: "Tired" },
  { emoji: "😴", label: "Sleepy" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😌", label: "Relaxed" },
  { emoji: "🤔", label: "Confused" },
  { emoji: "😊", label: "Hopeful" },
  { emoji: "😳", label: "Embarrassed" },
  { emoji: "🤔", label: "Thoughtful" },
  { emoji: "🙏", label: "Grateful" },
  { emoji: "🥳", label: "Joyful" },
  { emoji: "🤒", label: "Unwell" },
  { emoji: "🌊", label: "Overwhelmed" },
];

export default function MoodTracker({ onSelect }: MoodTrackerProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center py-6 relative">
      {/* Background circles - same as other pages */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full"></div>
        <div className="absolute top-1/2 -left-20 w-60 h-60 bg-gradient-to-br from-pink-200/20 to-blue-200/20 rounded-full"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl px-4">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8 tracking-wide">
          HOW ARE YOU FEELING TODAY?
        </h1>

        {/* Mood Grid - 5 rows of 4 columns */}
        <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto">
          {moods.map((mood, index) => (
            <div
              key={index}
              onClick={() => onSelect(mood.label)}
              className="bg-blue-100/80 backdrop-blur-sm rounded-xl p-3 md:p-4 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105 hover:bg-blue-200/80 hover:shadow-lg border border-blue-200/50 min-h-[80px] md:min-h-[90px]"
            >
              <div className="text-2xl md:text-3xl mb-1 md:mb-2">
                {mood.emoji}
              </div>
              <span className="text-gray-700 font-medium text-xs text-center leading-tight">
                {mood.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
