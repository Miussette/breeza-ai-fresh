// src/pages/SelfCarePage.tsx
import { SimplePage } from "../components/ui/SimplePage";

export default function SelfCarePage() {
  return (
    <SimplePage title="Self-Care">
      <p className="text-gray-700 mb-4">
        💙 Take a moment for yourself:
      </p>
      <ul className="list-disc pl-5 space-y-2 text-gray-600">
        <li>Write down 3 things you’re grateful for.</li>
        <li>Take a 10-minute break from screens.</li>
        <li>Listen to your favorite relaxing song.</li>
        <li>Smile at yourself in the mirror, it helps! 😊</li>
      </ul>
    </SimplePage>
  );
}
