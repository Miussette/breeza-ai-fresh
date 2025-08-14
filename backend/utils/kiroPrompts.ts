// backend/utils/kiroPrompts.ts
import * as fs from 'fs';
import * as path from 'path';

// Load Kiro prompts
const KIRO_BASE = path.resolve(process.cwd(), '.kiro');

export function loadKiroPrompt(promptName: string) {
  try {
    const promptPath = path.join(KIRO_BASE, 'prompts', `${promptName}.txt`);
    return fs.readFileSync(promptPath, 'utf8').trim();
  } catch (err) {
    console.error(`Error loading prompt ${promptName}:`, err);
    return null;
  }
}

export function loadKiroConfig() {
  try {
    const specs = JSON.parse(fs.readFileSync(path.join(KIRO_BASE, 'specs.json'), 'utf8'));
    const steering = JSON.parse(fs.readFileSync(path.join(KIRO_BASE, 'steering.json'), 'utf8'));
    return { specs, steering };
  } catch (err) {
    console.error('Error loading Kiro config:', err);
    return null;
  }
}



export const PROMPTS = {
  BREATHING_RELAXATION: 'breathing_relaxation',
  EMOTIONAL_CHECKIN: 'emotional_checkin',
  EMOTIONAL_SUPPORT: 'emotional_support',
  POSITIVE_REDIRECT: 'positive_redirect',
  WELLBEING_LESSONS: 'wellbeing_lessons'
} as const;

export function getContextualPrompt(message: string, mood: string, history: string[] = []) {
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.match(/\b(breathing|breathe|breathing exercise|help me breathe)\b/) ||
      lowerMessage.match(/\b(panic attack|can't breathe|hyperventilating|panic)\b/)) {
    return loadKiroPrompt(PROMPTS.BREATHING_RELAXATION);
  }
  if (lowerMessage.match(/\b(sad|depressed|upset|hurt|lonely|scared)\b/)) {
    return loadKiroPrompt(PROMPTS.EMOTIONAL_SUPPORT);
  }
  if (lowerMessage.match(/\b(learn|teach|explain|what is|how to)\b/)) {
    return loadKiroPrompt(PROMPTS.WELLBEING_LESSONS);
  }
  if (lowerMessage.match(/\b(hopeless|worthless|can't|impossible|give up)\b/)) {
    return loadKiroPrompt(PROMPTS.POSITIVE_REDIRECT);
  }
  if (history.length === 0) return loadKiroPrompt(PROMPTS.EMOTIONAL_CHECKIN);
  return loadKiroPrompt(PROMPTS.EMOTIONAL_SUPPORT);
}

export function generateKiroResponse(message: string, mood: string, history: string[] = []) {
  const config = loadKiroConfig();
  const contextPrompt = getContextualPrompt(message, mood, history);
  if (!contextPrompt) return generateFallbackResponse(message, mood);
  return generateResponseFromPrompt(contextPrompt, message, mood, config);
}

function generateResponseFromPrompt(prompt: string, message: string, mood: string, config: any) {
  const lowerMessage = message.toLowerCase();
  if (prompt.includes('breathing') || prompt.includes('relaxation')) {
    if (lowerMessage.match(/\b(panic|can't breathe|hyperventilating|panic attack|overwhelmed)\b/)) {
      return "I hear that you're feeling really overwhelmed right now. Let's focus on your breathing together. Try breathing in for 4 counts, hold for 4, and breathe out for 6. You're safe, and this feeling will pass. 💙";
    }
    const breathingResponses = [
      "Let's try the 4-7-8 breathing technique together. Inhale through your nose for 4 seconds, hold for 7, and exhale slowly for 8. Ready? 🌸",
      "Close your eyes for a moment. Imagine a gentle wave washing over your body. Inhale deeply... and release. How does that feel?",
      "I'm here with you. Let's take three slow, deep breaths together. Breathe in... hold... and slowly breathe out. You're doing great. 💙"
    ];
    return breathingResponses[Math.floor(Math.random() * breathingResponses.length)];
  }
  if (prompt.includes('check in') || prompt.includes('feeling')) {
    if (lowerMessage.match(/\b(good|great|happy|fine|okay)\b/)) {
      return "I'm glad to hear that ✨ It's wonderful when we can appreciate these positive moments. Would you like to explore something relaxing today, or is there anything specific on your mind?";
    } else if (lowerMessage.match(/\b(bad|sad|anxious|stressed|worried|tired)\b/)) {
      return "Thank you for sharing that with me 💛 It takes courage to acknowledge how we're feeling. It's completely okay to feel this way. Would you like to take a breathing break together, or would you prefer to talk about what's on your mind?";
    } else {
      return "🌼 Hi there! How are you feeling today? I'm here for you, and there's no pressure to be anything other than exactly where you are right now.";
    }
  }
  if (prompt.includes('emotional support') || prompt.includes('distress')) {
    const supportResponses = [
      "I'm here with you. Would you like to share what's been on your mind lately? Sometimes just putting feelings into words can help. 🤗",
      "What emotion feels strongest for you right now? There's no right or wrong answer - I'm just here to listen and support you.",
      "Is there something you wish someone would say to you right now? Sometimes we know exactly what we need to hear. 💝"
    ];
    return supportResponses[Math.floor(Math.random() * supportResponses.length)];
  }
  if (prompt.includes('positive') || prompt.includes('redirect')) {
    const positiveResponses = [
      "You're doing your best, and that's enough today. Let's take one step at a time together. What feels most manageable for you right now? 🌟",
      "Even in the darkest moments, there's light ahead. I believe in you, and I'm here to walk alongside you. What's one small thing that might bring you a tiny bit of comfort today?",
      "Your feelings are valid, and you don't have to carry them alone. What would it look like to be gentle with yourself right now? 🌸"
    ];
    return positiveResponses[Math.floor(Math.random() * positiveResponses.length)];
  }
  if (prompt.includes('wellbeing') || prompt.includes('lessons')) {
    if (lowerMessage.match(/\bmindfulness\b/)) {
      return "Mindfulness is about paying attention to the present moment without judgment. You can practice by focusing on your breath for just one minute. Would you like to try a quick mindfulness exercise together?";
    } else if (lowerMessage.match(/\bstress\b/)) {
      return "Stress is a natural response to life's demands. The key is learning when to pause and reset. One simple technique is the 'STOP' method: Stop, Take a breath, Observe your feelings, and Proceed mindfully. How does that sound?";
    } else if (lowerMessage.match(/\bgratitude\b/)) {
      return "Gratitude is like a muscle - the more we practice it, the stronger it gets. Even naming one small thing you're grateful for can shift your perspective. What's something tiny that brought you a moment of appreciation today?";
    }
  }
  return "I hear you, and I'm here to support you. Every feeling you have is valid, and you don't have to go through this alone. What would feel most helpful for you right now? 💙";
}

function generateFallbackResponse(message: string, mood: string) {
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.match(/\b(hi|hello|hey)\b/)) {
    return "🌼 Hello! I'm BreezaAI, and I'm here to support your mental wellness journey. How are you feeling right now?";
  }
  if (lowerMessage.match(/\b(anxious|anxiety|stressed|worried)\b/)) {
    return "I can hear that you're feeling anxious right now. That's really tough. Would a quick breathing exercise help, or would you prefer to talk about what's making you feel this way?";
  }
  if (lowerMessage.match(/\b(sad|depressed|down|upset)\b/)) {
    return "I'm sorry you're feeling sad right now. Those feelings are completely valid. Sometimes when we're feeling low, connecting with someone or doing something gentle for ourselves can help a little. What feels manageable for you today?";
  }
  return "Thank you for sharing that with me. I'm here to listen and support you. Can you tell me a bit more about how you're feeling?";
}
