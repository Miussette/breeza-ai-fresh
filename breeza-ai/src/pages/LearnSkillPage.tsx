// src/pages/LearnSkillPage.tsx
import { SimplePage } from "../components/ui/SimplePage";

export default function LearnSkillPage() {
  return (
    <SimplePage title="Learn a Quick Skill">
      <p className="text-gray-700 mb-4">
        ✨ Let’s learn something new in just 2 minutes:
      </p>
      <ul className="list-disc pl-5 space-y-2 text-gray-600">
        <li>Learn a quick breathing technique (4-7-8 method).</li>
        <li>Discover a simple brain exercise to improve focus.</li>
        <li>Try a quick posture fix for instant relief.</li>
        <li>Learn one new positive affirmation for today.</li>
      </ul>
    </SimplePage>
  );
}
