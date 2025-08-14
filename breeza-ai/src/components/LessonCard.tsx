import { LessonData } from "../types/lesson";

interface LessonCardProps {
  lesson: LessonData;
  onStartBreathing: () => void; // ✅ agregado
}

export default function LessonCard({ lesson, onStartBreathing }: LessonCardProps) {
  return (
    <div className="p-4 rounded-lg shadow-lg border bg-white space-y-3">
      <h3 className="text-xl font-bold text-blue-700 flex items-center gap-2">
        📖 {lesson.title}
      </h3>
      <p className="text-gray-700">{lesson.description}</p>

      {/* Lista de pasos */}
      <ul className="list-disc list-inside text-gray-600 space-y-1">
        {lesson.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>

      {/* Botón para iniciar respiración si lo desea */}
      <button
        onClick={onStartBreathing}
        className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        🧘 Try Breathing Exercise
      </button>
    </div>
  );
}
