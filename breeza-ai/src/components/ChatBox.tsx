// 🧠 Imports
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import BreathingExercise from "./BreathingExercise";
import QuickButtons from "./ui/QuickButtons";
import { LessonData } from "../types/lesson";
import { useChatBot, Message } from "../hooks/useChatBot";
import { useUser } from "../hooks/useUser";

// Props
interface ChatBoxProps {
  initialMessage?: string;
  onLessonFetched?: (lesson: LessonData | null) => void;
  externalMessage?: string | null;
  onExternalMessageHandled?: () => void;
}

export default function ChatBox({
  initialMessage,
  onLessonFetched,
  externalMessage,
  onExternalMessageHandled,
}: ChatBoxProps) {
  const { user, isLoggedIn } = useUser();
  
  const getPersonalizedGreeting = () => {
    if (isLoggedIn && user?.name) {
      return `🌼 Hello ${user.name}! How are you feeling today? I'm Kiro, and I'm here to support your wellness journey.`;
    }
    return initialMessage ?? "🌼 Hi there! How are you feeling today? I'm here for you.";
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: getPersonalizedGreeting(),
    },
  ]);
  const [input, setInput] = useState("");
  const [showBreathingExercise, setShowBreathingExercise] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const { handleUserInput } = useChatBot();

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const userMessage = text ?? input;
    if (!userMessage.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    const lowerInput = userMessage.toLowerCase();

    if (messages.length === 1) {
      let response = "Thanks for sharing 💛 I'm here with you.";
      let shouldShowBreathingButton = false;
      
      if (lowerInput.includes("good") || lowerInput.includes("happy") || lowerInput.includes("fine") || lowerInput.includes("okay")) {
        response =
          "I'm glad to hear that ✨ Would you like to explore something relaxing today?";
        // No breathing button for positive responses
      } else if (
        lowerInput.includes("bad") ||
        lowerInput.includes("stress") ||
        lowerInput.includes("anxious") ||
        lowerInput.includes("sad") ||
        lowerInput.includes("worried") ||
        lowerInput.includes("overwhelmed") ||
        lowerInput.includes("panic")
      ) {
        response =
          "Thank you for sharing 💛 It's okay to feel that way. Would you like to take a breathing break together?";
        shouldShowBreathingButton = true; // Only show for negative emotions
      } else {
        response = "Thanks for sharing 💛 I'm here with you. How can I support you today?";
        // No breathing button for neutral responses
      }

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: response, showBreathingButton: shouldShowBreathingButton },
      ]);
      setInput("");
      return;
    }

    const responses = await handleUserInput(userMessage, user?.name);
    setMessages((prev) => [...prev, ...responses]);

    setInput("");
  };

  useEffect(() => {
    if (externalMessage) {
      sendMessage(externalMessage);
      if (onExternalMessageHandled) onExternalMessageHandled();
    }
  }, [externalMessage]);

  return (
    <div className="p-4 border rounded-lg bg-white shadow-md space-y-3 w-[90%] max-w-3xl mx-auto">
      <div
        ref={chatRef}
        className="h-[450px] overflow-y-auto border p-4 rounded-md bg-gradient-to-b from-blue-50 to-white"
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 mb-4 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "bot" && (
              <img
                src="/bot-avatar.png"
                alt="Breeza AI"
                className="w-10 h-10 rounded-full shadow-md object-contain bg-blue-50 p-1"
              />
            )}
            <div
              className={`max-w-[80%] p-4 rounded-2xl shadow-md ${
                msg.sender === "user"
                  ? "bg-green-100 text-right"
                  : "bg-blue-50 text-left"
              }`}
            >
              <ReactMarkdown
                components={{
                  p: ({ children }) => (
                    <p className="text-gray-800 text-lg leading-relaxed mb-1">
                      {children}
                    </p>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold text-blue-700">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-purple-600">{children}</em>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside pl-3 space-y-1">
                      {children}
                    </ul>
                  ),
                  li: ({ children }) => (
                    <li className="text-gray-700 text-md">{children}</li>
                  ),
                }}
              >
                {msg.text}
              </ReactMarkdown>

              {msg.showBreathingButton && (
                <div className="mt-2">
                  <button
                    onClick={() => setShowBreathingExercise(true)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                    🧘 Start Breathing Exercise
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex space-x-2">
        <input
          className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type how you feel..."
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button
          onClick={() => sendMessage()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>

      <QuickButtons onSelect={sendMessage} />

      {showBreathingExercise && (
        <div className="mt-4">
          <BreathingExercise onClose={() => setShowBreathingExercise(false)} />
        </div>
      )}
    </div>
  );
}
