interface ChatBubbleProps {
  text: string;
  sender: "user" | "bot";
}

export default function ChatBubble({ text, sender }: ChatBubbleProps) {
  const isUser = sender === "user";

  return (
    <div
      className={`max-w-xs px-3 py-2 rounded-lg text-sm shadow-sm ${
        isUser
          ? "self-end bg-green-100 text-right"
          : "self-start bg-blue-100 text-left"
      }`}
    >
      <p className="whitespace-pre-line">
        <strong>{isUser ? "You" : "MindBuddy"}</strong>: {text}
      </p>
    </div>
  );
}