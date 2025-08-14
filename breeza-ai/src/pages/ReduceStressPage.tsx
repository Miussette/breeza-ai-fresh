// src/pages/ReduceStressPage.tsx
import { SimplePage } from "../components/ui/SimplePage";

export default function ReduceStressPage() {
  return (
    <SimplePage title="Reduce Stress">
      <p className="text-gray-700 mb-4">
        🌿 Here are quick techniques to ease your mind:
      </p>
      <ul className="list-disc pl-5 space-y-2 text-gray-600">
        <li>Take 5 deep breaths and hold for 4 seconds each.</li>
        <li>Try a short 2-minute mindfulness pause.</li>
        <li>Stretch your arms and shoulders gently.</li>
        <li>Drink a glass of water slowly.</li>
      </ul>
    </SimplePage>
  );
}
