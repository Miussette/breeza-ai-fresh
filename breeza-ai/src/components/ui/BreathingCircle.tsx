interface BreathingCircleProps {
  phase: "inhale" | "hold" | "exhale"; // Valores permitidos
}

export default function BreathingCircle({ phase }: BreathingCircleProps) {
  const colors: Record<"inhale" | "hold" | "exhale", string> = {
    inhale: "bg-green-300 scale-125",  // Crece
    hold: "bg-yellow-300 scale-125",   // Mantiene tamaño
    exhale: "bg-blue-300 scale-100",   // Reduce
  };

  return (
    <div
      className={`w-28 h-28 rounded-full transition-all duration-1000 shadow-md ${colors[phase]}`}
    />
  );
}
