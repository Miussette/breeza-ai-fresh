interface Resource {
  icon: string;
  title: string;
  topic: string;
}

interface ResourcesSectionProps {
  onSelectResource: (topic: string) => void;
}

const resources: Resource[] = [
  { icon: "📖", title: "Learn about Anxiety", topic: "anxiety" },
  { icon: "🧘", title: "Guided Meditation", topic: "meditation" },
  { icon: "🎵", title: "Relaxing Music Playlist", topic: "relaxation" },
  { icon: "✍️", title: "Gratitude Journal", topic: "gratitude" },
];

export default function ResourcesSection({ onSelectResource }: ResourcesSectionProps) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">Explore more resources</h3>

      <div className="grid grid-cols-2 gap-4">
        {resources.map((res, idx) => (
          <button
            key={idx}
            onClick={() => onSelectResource(res.topic)}
            className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
          >
            <span className="text-2xl">{res.icon}</span>
            <span className="mt-2 text-sm font-medium">{res.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
