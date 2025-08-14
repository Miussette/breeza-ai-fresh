const tips = [
  "Take 3 deep breaths before starting your work.",
  "Drink a glass of water and stretch for 1 min.",
  "Pause for 5 minutes and just observe your surroundings.",
  "Write down 3 things you're grateful for today.",
  "Disconnect from your phone for 10 minutes and relax."
];

export default function DailyTip() {
  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <div className="mt-4 p-4 rounded-md bg-yellow-50 text-center shadow-sm">
      <p className="text-sm text-gray-700">
        🌟 <strong>Tip of the day:</strong> {randomTip}
      </p>
    </div>
  );
}
