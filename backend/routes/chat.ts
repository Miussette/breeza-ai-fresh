import express, { Router, Request, Response } from 'express';
const { generateWeeklyPlan } = require('../utils/weeklyPlanGenerator');
const { generateKiroResponse } = require('../utils/kiroPrompts');
import { WeeklyPlanRequest } from '../types/weeklyPlan';

const router: Router = express.Router();

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequestBody {
  message: string;
  history?: ChatMessage[];
  userName?: string;
}

// System prompt for BreezaAI
const systemPrompt = `You are BreezaAI — a warm, concise, and empathetic mental‑health companion.

Primary goals:
1) Help users regulate emotions safely (breathing, grounding, brief journaling).
2) Encourage healthy routines and micro‑habits (sleep, hydration, movement, connection).
3) Offer short, actionable guidance; avoid long lectures.

Style:
- English only. Tone: calm, supportive, non‑judgmental. Keep replies 3–7 sentences.
- Prefer steps and bullets when giving exercises.
- Mirror the user's feeling in one short sentence, then guide.

Boundaries & Safety:
- You are not a doctor or therapist. Do not diagnose or prescribe.
- If the user mentions self‑harm, harm to others, or a crisis:
  - Say you're concerned.
  - Encourage immediate help from local emergency services or hotlines.
  - Offer to stay with grounding steps.
- Avoid medical, legal, or financial instructions.

Decision rules:
- If user expresses anxiety/stress/overwhelm → offer a short breathing or grounding option first.
- If user is sad/low → offer emotional validation + 1 small action (text a friend, short walk, hydration).
- If user is angry/frustrated → validate + suggest brief pause (box breathing or count‑to‑10) before problem‑solving.
- If user is happy/excited → celebrate + suggest savoring practice or gratitude note.
- If unclear → ask one gentle clarifying question.

Response template (when relevant):
1) Validate in 1 short sentence.
2) Offer 1 option (or 2 alternatives max).
3) Give a tiny next step or question to continue.`;

// Generate contextual response based on message and conversation history
function generateResponse(message: string, history: ChatMessage[] = [], userName?: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Try to use Kiro prompts first
  try {
    const mood = extractMoodFromHistory(history) || 'neutral';
    const kiroResponse = generateKiroResponse(message, mood, history);
    if (kiroResponse) return kiroResponse;
  } catch (error) {
    console.log('Kiro prompts not available, using fallback responses');
  }
  
  // Analyze conversation context
  const context = analyzeContext(history);
  
  // Handle contextual responses
  if (context.topic && context.lastUserMessage) {
    const contextualResponse = getContextualResponse(message, context);
    if (contextualResponse) return contextualResponse;
  }
  
  // Greetings
  if (lowerMessage.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
    const personalizedGreetings = userName ? [
      `🌼 Hello ${userName}! I'm BreezaAI, and I'm here to support your mental wellness journey. How are you feeling right now?`,
      `💙 Hi ${userName}! I'm glad you're here. What's on your mind today?`,
      `✨ Welcome back ${userName}! I'm here to listen and support you. How can I help you feel a bit better today?`,
      `🌸 Hello ${userName}! It's wonderful that you're taking time for your mental health. What's going on for you right now?`
    ] : [
      "🌼 Hello! I'm BreezaAI, and I'm here to support your mental wellness journey. How are you feeling right now?",
      "💙 Hi there! I'm glad you're here. What's on your mind today?",
      "✨ Welcome! I'm here to listen and support you. How can I help you feel a bit better today?",
      "🌸 Hello! It's wonderful that you're taking time for your mental health. What's going on for you right now?"
    ];
    return personalizedGreetings[Math.floor(Math.random() * personalizedGreetings.length)];
  }
  
  // Calm/relaxed states - don't push techniques
  if (lowerMessage.match(/\b(calm|relaxed|fine|okay|good|peaceful|content)\b/) && 
      !lowerMessage.match(/\b(help|need|want|breathing|exercise)\b/)) {
    const calmResponses = [
      "That's wonderful that you're feeling calm. It's great when we can find those peaceful moments. How has your day been treating you?",
      "I'm so glad to hear you're feeling relaxed. Those moments of peace are precious. What's been helping you feel this way?",
      "It sounds like you're in a good space right now. That's really nice to hear. Is there anything specific that's contributing to this feeling?",
      "That's lovely that you're feeling content. Sometimes it's nice just to acknowledge when we're doing well. What's been going well for you lately?"
    ];
    return calmResponses[Math.floor(Math.random() * calmResponses.length)];
  }
  
  // Anxiety/stress - validate first, then offer help if requested
  if (lowerMessage.match(/\b(anxious|anxiety|stressed|stress|overwhelmed|worried|panic)\b/)) {
    if (lowerMessage.match(/\b(help|need|what should|guide|breathing|exercise)\b/)) {
      return "I hear that you're feeling anxious and looking for some support. Would a quick breathing exercise help right now? [Start Breathing Exercise]";
    } else {
      const anxietyResponses = [
        "I can hear that you're feeling anxious right now. That's really tough. What's been weighing on your mind the most?",
        "Anxiety can feel so overwhelming. I'm here with you. Can you tell me a bit more about what's making you feel this way?",
        "It sounds like you're going through a stressful time. That's really hard. What's been the most challenging part of your day?",
        "I understand you're feeling stressed. Those feelings are valid. Would you like to talk about what's been causing this stress?"
      ];
      return anxietyResponses[Math.floor(Math.random() * anxietyResponses.length)];
    }
  }
  
  // Sadness/low mood - validate and suggest small action
  if (lowerMessage.match(/\b(sad|depressed|down|low|blue|upset|crying|cry)\b/)) {
    const sadResponses = [
      "I'm sorry you're feeling sad right now. Those feelings are completely valid. Sometimes when we're feeling low, even small things like drinking some water or stepping outside for a moment can help a little. What feels manageable for you right now?",
      "It sounds like you're having a tough time. I'm here with you. When we're feeling down, connecting with someone we care about or doing something gentle for ourselves can sometimes provide a tiny bit of comfort. What usually helps you feel a little better?",
      "I hear that you're feeling really low. That's so hard. Sometimes when everything feels heavy, taking one small step like texting a friend or making a warm drink can be a gentle way to care for ourselves. What feels possible for you today?"
    ];
    return sadResponses[Math.floor(Math.random() * sadResponses.length)];
  }
  
  // Anger/frustration - validate and suggest pause
  if (lowerMessage.match(/\b(angry|mad|frustrated|irritated|annoyed|furious)\b/)) {
    const angerResponses = [
      "It sounds like you're feeling really frustrated right now. That's completely understandable. When we're feeling this way, sometimes taking a brief pause can help us think more clearly. Would you like to try counting to 10 slowly, or would you prefer to talk about what's making you feel this way?",
      "I can hear the frustration in your message. Those feelings make complete sense. Sometimes when we're angry, a quick pause - like taking three deep breaths - can help us feel a bit more grounded before we figure out next steps. What feels right for you?",
      "Anger can be such an intense emotion. It sounds like something really got to you. Would it help to take a moment to breathe, or would you rather talk through what happened?"
    ];
    return angerResponses[Math.floor(Math.random() * angerResponses.length)];
  }
  
  // Happy/excited - celebrate and suggest savoring
  if (lowerMessage.match(/\b(happy|excited|great|amazing|wonderful|fantastic|good news|celebration)\b/)) {
    const happyResponses = [
      "That's wonderful to hear! I love that you're feeling happy. When we have these positive moments, it can be really nice to savor them. What's been the best part of your day?",
      "How exciting! It's so great when things go well. These happy moments are worth celebrating. Would you like to share what's been making you feel so good?",
      "I'm so glad you're feeling excited! Positive emotions like this are such a gift. Sometimes writing down what we're grateful for in these moments can help us remember them later. What's been bringing you joy?"
    ];
    return happyResponses[Math.floor(Math.random() * happyResponses.length)];
  }
  
  // Weekly plan requests
  if (lowerMessage.match(/\b(weekly plan|week plan|plan|schedule|routine)\b/)) {
    return "I'd love to help you create a personalized weekly wellness plan! You can access this feature by clicking the 'Weekly Plan' button below our chat. It will create a customized plan based on how you're feeling. Would you like to try that?";
  }
  
  // Breathing exercise requests
  if (lowerMessage.match(/\b(breathing|breathe|breath|relaxation|calm down)\b/) && 
      lowerMessage.match(/\b(exercise|technique|help|guide|need)\b/)) {
    return "I'd be happy to guide you through a breathing exercise. You can start one by clicking the 'Breathing Exercise' button below our chat. It will walk you through a calming technique step by step. Would you like to try that now?";
  }
  
  // Default empathetic response
  const defaultResponses = [
    "Thank you for sharing that with me. I'm here to listen and support you. Can you tell me a bit more about how you're feeling?",
    "I appreciate you opening up. Everyone's experience is unique and valid. What's been on your mind lately?",
    "It sounds like you have something important to share. I'm here to support you. How can I help you feel a bit better today?",
    "I'm glad you're here and taking time to check in with yourself. That's really important. What would be most helpful for you right now?"
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Analyze conversation context
function analyzeContext(history: ChatMessage[]): { topic?: string; lastUserMessage?: string; pattern?: string } {
  if (history.length < 2) return {};
  
  const lastUserMessage = history[history.length - 2]?.content?.toLowerCase() || '';
  const currentTopic = extractTopic(lastUserMessage);
  
  return {
    topic: currentTopic,
    lastUserMessage,
    pattern: detectPattern(history)
  };
}

// Extract mood from conversation history
function extractMoodFromHistory(history: ChatMessage[]): string | undefined {
  const recentMessages = history.slice(-3); // Look at last 3 messages
  const allText = recentMessages.map(msg => msg.content.toLowerCase()).join(' ');
  
  if (allText.match(/\b(anxious|anxiety|worried|panic|nervous)\b/)) return 'anxious';
  if (allText.match(/\b(sad|depressed|down|blue|upset|crying)\b/)) return 'sad';
  if (allText.match(/\b(stressed|overwhelmed|pressure|busy|tired)\b/)) return 'stressed';
  if (allText.match(/\b(happy|excited|great|wonderful|amazing|good)\b/)) return 'happy';
  if (allText.match(/\b(angry|mad|frustrated|irritated|annoyed)\b/)) return 'angry';
  
  return 'neutral';
}

// Extract topic from message
function extractTopic(message: string): string | undefined {
  if (message.match(/\b(work|job|career|boss|colleague)\b/)) return 'work';
  if (message.match(/\b(school|college|university|exam|study|student)\b/)) return 'school';
  if (message.match(/\b(family|parent|mom|dad|sibling|relative)\b/)) return 'family';
  if (message.match(/\b(relationship|partner|boyfriend|girlfriend|spouse)\b/)) return 'relationship';
  if (message.match(/\b(health|sick|illness|doctor|medical)\b/)) return 'health';
  if (message.match(/\b(money|financial|debt|bills|budget)\b/)) return 'financial';
  return undefined;
}

// Detect conversation patterns
function detectPattern(history: ChatMessage[]): string | undefined {
  const userMessages = history.filter(msg => msg.role === 'user').map(msg => msg.content.toLowerCase());
  
  if (userMessages.some(msg => msg.match(/\b(anxious|anxiety|stressed)\b/))) {
    return 'anxiety_pattern';
  }
  if (userMessages.some(msg => msg.match(/\b(sad|depressed|down)\b/))) {
    return 'sadness_pattern';
  }
  
  return undefined;
}

// Generate contextual responses
function getContextualResponse(message: string, context: any): string | null {
  const lowerMessage = message.toLowerCase();
  
  // Work-related anxiety
  if (context.topic === 'work' && context.lastUserMessage?.match(/\b(anxious|stressed)\b/)) {
    if (lowerMessage.match(/\b(deadline|pressure|boss|meeting)\b/)) {
      return "Work pressure can definitely amplify anxiety - there's so much we can't control in those environments. What specific aspect of work has been weighing on you the most? Sometimes breaking it down into smaller pieces can help.";
    }
  }
  
  // School-related stress
  if (context.topic === 'school' && context.lastUserMessage?.match(/\b(anxious|stressed)\b/)) {
    if (lowerMessage.match(/\b(exam|test|grade|assignment|workload)\b/)) {
      return "School can definitely be a source of anxiety - there's so much pressure and uncertainty. What specifically about your studies has been weighing on you the most? Sometimes it helps to focus on just the next small step.";
    }
  }
  
  // Family-related concerns
  if (context.topic === 'family' && lowerMessage.match(/\b(difficult|hard|problem|issue)\b/)) {
    return "Family relationships can be really complex and emotionally challenging. It sounds like you're dealing with something difficult. Would you like to talk about what's been happening, or would you prefer some strategies for managing the stress this is causing?";
  }
  
  return null;
}

router.post('/chat', async (req: Request<{}, {}, ChatRequestBody>, res: Response) => {
  try {
    const { message, history = [], userName } = req.body;
    
    console.log('💬 Chat request:', { message, historyLength: history.length });
    
    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    const response = generateResponse(message.trim(), history, userName);
    
    console.log('✅ Generated response:', response);
    
    res.json({ 
      reply: response,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error in /chat:', error);
    res.status(500).json({ error: 'Error generating chat response' });
  }
});

// Health check route
router.get('/ping', (req: Request, res: Response) => {
  res.json({ message: 'Server running correctly 🚀' });
});

// Weekly Plan Generation Route
router.post('/weekly-plan', async (req: Request<{}, {}, WeeklyPlanRequest>, res: Response) => {
  try {
    const { mood, goals, preferences, timeAvailable } = req.body;
    
    console.log('📅 Weekly plan request:', { mood, goals, preferences, timeAvailable });

    if (!mood) {
      return res.status(400).json({ error: 'Mood is required' });
    }

    const weeklyPlan = generateWeeklyPlan({
      mood,
      goals: goals || [],
      preferences: preferences || [],
      timeAvailable: timeAvailable || '30 minutes'
    });

    console.log('✅ Generated weekly plan:', weeklyPlan);

    res.json({ 
      success: true, 
      plan: weeklyPlan,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error generating weekly plan:', error);
    res.status(500).json({ error: 'Error generating weekly plan' });
  }
});

// Get full weekly plan
router.get('/weekly-plan/:planId', async (req: Request, res: Response) => {
  try {
    const { planId } = req.params;
    
    console.log('📋 Full weekly plan request for:', planId);
    
    // For now, generate a new plan based on the planId (which contains mood info)
    const mood = planId.includes('anxious') ? 'anxious' : 
                 planId.includes('sad') ? 'sad' : 
                 planId.includes('stressed') ? 'stressed' : 'calm';
    
    const fullPlan = generateWeeklyPlan({
      mood,
      goals: [],
      preferences: [],
      timeAvailable: '30 minutes'
    });

    res.json({ 
      success: true, 
      plan: fullPlan,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error getting full weekly plan:', error);
    res.status(500).json({ error: 'Error getting full weekly plan' });
  }
});

export default router;
