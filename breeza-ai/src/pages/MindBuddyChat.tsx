import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

import MoodTracker from "../components/MoodTracker";
import ChatBox from "../components/ChatBox";
import DailyTip from "../components/DailyTip";
import { WeeklyPlanModal } from "../components/WeeklyPlanModal";
import { GratitudeJournal } from "../components/GratitudeJournal";
import { moodResponses } from "../utils/moodResponses";
import { LessonData } from "../types/lesson";

export default function MindBuddyChat() {
  const [moodSelected, setMoodSelected] = useState<string | null>(null);
  const [initialBotMessage, setInitialBotMessage] = useState<string | null>(null);
  const [externalMessage, setExternalMessage] = useState<string | null>(null);

  // ✅ Guardamos la lección para mostrarla en una Card
  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [showWeeklyPlan, setShowWeeklyPlan] = useState(false);
  const [showGratitudeJournal, setShowGratitudeJournal] = useState(false);

  const handleMoodSelect = (mood: string) => {
    setMoodSelected(mood);

    const response =
      moodResponses[mood] ||
      `🌼 Welcome to BreezaAI! I'm here to support your mental wellness journey. You selected **${mood}** - let's work together to help you feel your best today. What's on your mind?`;

    setInitialBotMessage(response);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center py-8">
      <div className="w-full max-w-4xl space-y-6">
        {/* ✅ Si NO ha elegido mood, mostramos el selector */}
        {!moodSelected ? (
          <MoodTracker onSelect={handleMoodSelect} />
        ) : (
          <>
            {/* ✅ Cabecera que muestra el mood actual */}
            <div className="bg-blue-100 p-4 rounded-lg text-center shadow flex justify-between items-center">
              <p className="text-gray-700 text-lg">
                You selected: <strong>{moodSelected}</strong> 💙
              </p>
              <button
                onClick={() => {
                  setMoodSelected(null);
                  setLesson(null);
                  setInitialBotMessage(null);
                }}
                className="text-sm text-blue-700 hover:underline"
              >
                🔄 Change mood
              </button>
            </div>

            {/* Background circles for visual consistency */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full"></div>
              <div className="absolute top-1/2 -left-20 w-60 h-60 bg-gradient-to-br from-pink-200/20 to-blue-200/20 rounded-full"></div>
            </div>

            {/* ✅ Chat principal más ancho y estilizado */}
            <ChatBox
              initialMessage={
                initialBotMessage ?? "🌼 Welcome to BreezaAI! I'm here to support your mental wellness journey. How are you feeling right now?"
              }
              onLessonFetched={setLesson}
              externalMessage={externalMessage}
              onExternalMessageHandled={() => setExternalMessage(null)}
            />

            {/* ✅ Si hay lección cargada, mostramos la Card */}
            {lesson && (
              <div className="mt-4 p-6 rounded-lg shadow-lg border bg-white relative z-10">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                  📖 {lesson.title}
                </h3>
                <p className="text-gray-700 mt-3 text-xl">{lesson.description}</p>

                {/* Lista de pasos de la lección */}
                <ul className="mt-4 list-disc list-inside text-gray-600 space-y-2 text-lg">
                  {lesson.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* ✅ Tip del día */}
            <DailyTip />

            {/* ✅ Botones grandes para funcionalidades principales */}
            <div className="flex gap-6 justify-center relative z-10">
              <button
                onClick={() => setShowGratitudeJournal(!showGratitudeJournal)}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                💜 Gratitude Journal
              </button>
              <button
                onClick={() => setShowWeeklyPlan(true)}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                📅 Weekly Plan
              </button>
            </div>

            {/* ✅ Weekly Plan Modal */}
            {showWeeklyPlan && moodSelected && (
              <WeeklyPlanModal
                mood={moodSelected}
                onClose={() => setShowWeeklyPlan(false)}
              />
            )}

            {/* ✅ Gratitude Journal Component */}
            {showGratitudeJournal && (
              <div className="relative z-10">
                <GratitudeJournal />
              </div>
            )}
          </>
        )}

        {/* ✅ Botón Back to Home SIEMPRE visible al final */}
        <div className="flex justify-center mt-8">
          <Link to="/" className="back-home-btn">
            <ArrowLeftIcon className="w-5 h-5 text-blue-500" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
