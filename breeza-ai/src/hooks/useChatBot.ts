import axios from "axios";
import { LessonData } from "../types/lesson";

export type Message = {
  sender: "bot" | "user";
  text: string;
  showBreathingButton?: boolean;
};

const fallbackTips: Record<string, string> = {
  anxiety: "🧘 *Quick Tip:* Try the **4-7-8 breathing technique** to calm anxiety.",
  stress: "💆 *Quick Tip:* Take a **2-minute mindful pause**, stretch your shoulders, and breathe deeply.",
  relaxation: "🌸 *Quick Tip:* Play some soft music and focus on slow deep breathing.",
  mindfulness: "✨ *Quick Tip:* Notice **5 things you can see**, **4 you can touch**, **3 you can hear**, **2 you can smell**, **1 you can taste**.",
  meditation: "🕯️ *Quick Tip:* Sit in silence for 1 minute focusing only on your breath.",
  gratitude: "🙏 *Quick Tip:* Think of **3 things you’re grateful for** right now.",
  selfcare: "💖 *Quick Tip:* Drink water, stretch your body, and take a short mindful break.",
};

const topics: Record<string, string> = {
  anxiety: "anxiety",
  stress: "stress",
  relaxation: "relaxation",
  mindfulness: "mindfulness",
  breathing: "breathing",
  meditation: "meditation",
  gratitude: "gratitude",
  selfcare: "selfcare",
};

export const useChatBot = () => {
  const detectTopic = (input: string): string | null => {
    const lower = input.toLowerCase();
    return Object.keys(topics).find((key) => lower.includes(key)) || null;
  };

  const getLesson = async (topic: string): Promise<LessonData | null> => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
      const res = await axios.get(`${API_URL}/api/lesson/${topic}`);
      return res.data;
    } catch {
      return null;
    }
  };

  const getPlan = async (): Promise<string | null> => {
    try {
      const res = await axios.get("http://localhost:5000/plan");
      const plan = res.data;
      return Object.entries(plan)
        .map(([day, activity]) => `- **${day}:** ${activity}`)
        .join("\n");
    } catch {
      return null;
    }
  };

 const sendToAPI = async (message: string, userName?: string): Promise<string> => {
  try {
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
    const res = await axios.post(`${API_URL}/api/chat`, { 
      message,
      history: [], // Add empty history for now
      userName: userName || null // Send user name for personalization
    });
    return res.data.reply; // Backend returns 'reply' not 'response'
  } catch (error) {
    console.error('Chat API error:', error);
    return "❌ I had trouble reaching my mind palace. Try again later.";
  }
};


  const handleUserInput = async (message: string, userName?: string): Promise<Message[]> => {
    const lowerInput = message.toLowerCase();
    const matchedTopic = detectTopic(lowerInput);

    // Check if user explicitly asks for breathing help
    if (matchedTopic === "breathing" || lowerInput.includes("breathing exercise")) {
      return [
        {
          sender: "bot",
          text: "😌 I recommend a guided breathing exercise. 👉 Click the button below to start.",
          showBreathingButton: true,
        },
      ];
    }

    // Check if user is expressing anxiety/panic and might benefit from breathing
    if (lowerInput.includes("panic") || lowerInput.includes("can't breathe") || 
        lowerInput.includes("hyperventilating") || lowerInput.includes("panic attack")) {
      return [
        {
          sender: "bot",
          text: "I hear that you're feeling really overwhelmed right now. Let's focus on your breathing together. A guided exercise can help you feel more grounded.",
          showBreathingButton: true,
        },
      ];
    }

    if (matchedTopic) {
      const lesson = await getLesson(matchedTopic);
      if (lesson) {
        return [
          {
            sender: "bot",
            text: `📖 **${lesson.title}**\n${lesson.description}`,
          },
        ];
      } else {
        return [
          {
            sender: "bot",
            text: `❌ Sorry, I couldn’t load detailed information about **${matchedTopic}**, but here’s a quick tip:\n${fallbackTips[matchedTopic]}`,
          },
        ];
      }
    }

    if (lowerInput.includes("plan") || lowerInput.includes("weekly")) {
      const planText = await getPlan();
      if (planText) {
        return [
          {
            sender: "bot",
            text: `🗓️ **Weekly Well-being Plan:**\n${planText}`,
          },
        ];
      } else {
        return [
          {
            sender: "bot",
            text: "❌ Could not load the weekly plan.",
          },
        ];
      }
    }

    const aiReply = await sendToAPI(message, userName);
    return [
      {
        sender: "bot",
        text: aiReply,
      },
    ];
  };

  return { handleUserInput };
};
