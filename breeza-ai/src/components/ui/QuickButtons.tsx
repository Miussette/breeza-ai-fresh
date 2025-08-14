interface QuickButtonsProps {
  onSelect: (text: string) => void;
}

export default function QuickButtons({ onSelect }: QuickButtonsProps) {
  return (
    <div className="flex justify-center mt-3">
      <button
        onClick={() => onSelect("breathing exercise")}
        className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors duration-200 flex items-center gap-2"
      >
        🧘 Breathing Exercise
      </button>
    </div>
  );
}
