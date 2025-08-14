// Types for Weekly Plan functionality

export interface DailyAction {
  activity: string;
  duration: string;
  category: 'mindfulness' | 'exercise' | 'social' | 'creative' | 'learning' | 'rest';
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface DailyPlan {
  tasks: DailyAction[];
  focus: string;
}

export interface WeeklyPlan {
  days: DailyPlan[];
  theme: string;
  tips: string[];
  createdAt: string;
}

export interface WeeklyPlanRequest {
  mood: string;
  goals: string[];
  preferences: string[];
  timeAvailable: string;
}

// Additional types for API responses
export interface WeeklyPlanResponse {
  success: boolean;
  plan: WeeklyPlan;
  timestamp: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  reply: string;
  timestamp: string;
}