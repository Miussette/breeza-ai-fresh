import { useState, useEffect } from "react";
import BreathingCircle from "./ui/BreathingCircle";

interface BreathingExerciseProps {
  onClose: (message?: string) => void;
}

export default function BreathingExercise({ onClose }: BreathingExerciseProps) {
  const steps = [
    { text: "Inhale deeply 🌬️", duration: 4000, phase: "inhale" as const },
    { text: "Hold your breath ⏳", duration: 7000, phase: "hold" as const },
    { text: "Exhale slowly 😌", duration: 8000, phase: "exhale" as const },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [countdown, setCountdown] = useState(steps[0].duration / 1000);

  const phase = steps[currentStep].phase;

  useEffect(() => {
    // Duración en segundos para el paso actual
    const totalSeconds = steps[currentStep].duration / 1000;
    setCountdown(totalSeconds);

    // Temporizador que actualiza la cuenta regresiva cada segundo
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cambiar al siguiente paso después de la duración del paso actual
    const stepTimeout = setTimeout(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
      setCycleCount((prev) => prev + 1);
    }, steps[currentStep].duration);

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(stepTimeout);
    };
  }, [currentStep]);

  return (
    <div className="p-6 mt-4 rounded-xl shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 text-center space-y-4">
      <h3 className="text-xl font-semibold text-blue-800 flex items-center justify-center gap-2">
        🧘 Guided Breathing Exercise 4-7-8
      </h3>

      {/* Texto dinámico + cuenta regresiva */}
      <p className="text-lg font-medium text-gray-700">
        {steps[currentStep].text}  
        <span className="ml-2 text-blue-600 font-bold">
           {countdown}s
        </span>
      </p>

      {/* Círculo dinámico */}
      <div className="flex justify-center my-4">
        <BreathingCircle phase={phase} />
      </div>

      {/* Contador de ciclos */}
      <p className="text-sm text-gray-500">
        Cycle: <span className="font-bold">{Math.floor(cycleCount / 3) + 1}</span>
      </p>

      {/* Botón para terminar */}
      <button
        onClick={() => onClose("✅ Breathing exercise completed! Feeling calmer now?")}
        className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
      >
        ✖ End Exercise
      </button>
    </div>
  );
}