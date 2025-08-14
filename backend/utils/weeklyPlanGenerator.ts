// backend/src/utils/weeklyPlanGenerator.ts

type Activity = {
  activity: string;
  duration: string;
  category: 'mindfulness' | 'exercise' | 'social' | 'creative' | 'learning' | 'rest';
  difficulty: 'easy' | 'medium' | 'hard';
};

type PlanRequest = {
  mood: string;
  preferences?: string[];
};

type DayPlan = {
  tasks: Activity[];
  focus: string;
};

type WeeklyPlan = {
  days: DayPlan[];
  theme: string;
  tips: string[];
  createdAt: string;
};

const mindfulnessActivities: Activity[] = [
  { activity: "5-minute morning meditation", duration: "5 min", category: "mindfulness", difficulty: "easy" },
  { activity: "Gratitude journaling", duration: "10 min", category: "mindfulness", difficulty: "easy" },
  { activity: "Deep breathing exercise", duration: "3 min", category: "mindfulness", difficulty: "easy" },
  { activity: "Body scan meditation", duration: "15 min", category: "mindfulness", difficulty: "medium" },
  { activity: "Mindful walking", duration: "20 min", category: "mindfulness", difficulty: "easy" },
  { activity: "Progressive muscle relaxation", duration: "12 min", category: "mindfulness", difficulty: "medium" },
  { activity: "Loving-kindness meditation", duration: "10 min", category: "mindfulness", difficulty: "medium" }
];

const exerciseActivities: Activity[] = [
  { activity: "Light stretching routine", duration: "10 min", category: "exercise", difficulty: "easy" },
  { activity: "15-minute walk", duration: "15 min", category: "exercise", difficulty: "easy" },
  { activity: "Yoga flow", duration: "20 min", category: "exercise", difficulty: "medium" },
  { activity: "Dance to favorite music", duration: "10 min", category: "exercise", difficulty: "easy" },
  { activity: "Bodyweight exercises", duration: "15 min", category: "exercise", difficulty: "medium" },
  { activity: "Nature hike", duration: "30 min", category: "exercise", difficulty: "medium" },
  { activity: "Swimming", duration: "25 min", category: "exercise", difficulty: "medium" }
];

const socialActivities: Activity[] = [
  { activity: "Call a friend or family member", duration: "15 min", category: "social", difficulty: "easy" },
  { activity: "Write a thank you message", duration: "5 min", category: "social", difficulty: "easy" },
  { activity: "Join a community activity", duration: "60 min", category: "social", difficulty: "medium" },
  { activity: "Have coffee with a colleague", duration: "30 min", category: "social", difficulty: "easy" },
  { activity: "Volunteer for a cause", duration: "120 min", category: "social", difficulty: "medium" },
  { activity: "Attend a social event", duration: "90 min", category: "social", difficulty: "medium" }
];

const creativeActivities: Activity[] = [
  { activity: "Draw or sketch", duration: "20 min", category: "creative", difficulty: "easy" },
  { activity: "Write in a journal", duration: "15 min", category: "creative", difficulty: "easy" },
  { activity: "Listen to music mindfully", duration: "10 min", category: "creative", difficulty: "easy" },
  { activity: "Try a new recipe", duration: "45 min", category: "creative", difficulty: "medium" },
  { activity: "Photography walk", duration: "30 min", category: "creative", difficulty: "easy" },
  { activity: "Craft or DIY project", duration: "60 min", category: "creative", difficulty: "medium" },
  { activity: "Learn a musical instrument", duration: "25 min", category: "creative", difficulty: "hard" }
];

const learningActivities: Activity[] = [
  { activity: "Read for pleasure", duration: "20 min", category: "learning", difficulty: "easy" },
  { activity: "Watch an educational video", duration: "15 min", category: "learning", difficulty: "easy" },
  { activity: "Practice a new language", duration: "10 min", category: "learning", difficulty: "medium" },
  { activity: "Take an online course", duration: "30 min", category: "learning", difficulty: "medium" },
  { activity: "Listen to a podcast", duration: "25 min", category: "learning", difficulty: "easy" },
  { activity: "Research a topic of interest", duration: "20 min", category: "learning", difficulty: "easy" }
];

const restActivities: Activity[] = [
  { activity: "Take a warm bath", duration: "20 min", category: "rest", difficulty: "easy" },
  { activity: "Practice good sleep hygiene", duration: "30 min", category: "rest", difficulty: "easy" },
  { activity: "Gentle evening routine", duration: "15 min", category: "rest", difficulty: "easy" },
  { activity: "Afternoon power nap", duration: "20 min", category: "rest", difficulty: "easy" },
  { activity: "Digital detox hour", duration: "60 min", category: "rest", difficulty: "medium" },
  { activity: "Relaxing tea ceremony", duration: "10 min", category: "rest", difficulty: "easy" }
];

const allActivities: Activity[] = [
  ...mindfulnessActivities,
  ...exerciseActivities,
  ...socialActivities,
  ...creativeActivities,
  ...learningActivities,
  ...restActivities
];

const moodBasedTips: Record<string, string[]> = {
  anxious: [
    "Focus on breathing exercises when feeling overwhelmed",
    "Break large tasks into smaller, manageable steps",
    "Practice grounding techniques using your five senses",
    "Remember that anxiety is temporary and will pass"
  ],
  sad: [
    "Be gentle with yourself during difficult times",
    "Reach out to supportive friends or family",
    "Engage in activities that usually bring you joy",
    "Consider professional support if sadness persists"
  ],
  stressed: [
    "Prioritize tasks and let go of perfectionism",
    "Take regular breaks throughout your day",
    "Practice saying 'no' to additional commitments",
    "Use time management techniques like the Pomodoro method"
  ],
  happy: [
    "Share your positive energy with others",
    "Use this momentum to tackle challenging goals",
    "Practice gratitude to maintain your positive state",
    "Celebrate your achievements, both big and small"
  ],
  neutral: [
    "Use this stable time to build healthy habits",
    "Explore new activities or hobbies",
    "Focus on personal growth and self-improvement",
    "Prepare coping strategies for future challenges"
  ]
};

function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function selectActivitiesForMood(mood: string, preferences: string[]): Activity[] {
  let selectedActivities: Activity[] = [];

  selectedActivities.push(...getRandomItems(mindfulnessActivities, 2));

  switch (mood.toLowerCase()) {
    case 'anxious':
      selectedActivities.push(...getRandomItems(restActivities, 2));
      selectedActivities.push(...getRandomItems(exerciseActivities.filter(a => a.difficulty === 'easy'), 1));
      break;
    case 'sad':
      selectedActivities.push(...getRandomItems(socialActivities, 2));
      selectedActivities.push(...getRandomItems(creativeActivities, 1));
      break;
    case 'stressed':
      selectedActivities.push(...getRandomItems(restActivities, 2));
      selectedActivities.push(...getRandomItems(exerciseActivities, 1));
      break;
    case 'happy':
      selectedActivities.push(...getRandomItems(socialActivities, 1));
      selectedActivities.push(...getRandomItems(creativeActivities, 1));
      selectedActivities.push(...getRandomItems(exerciseActivities, 1));
      break;
    default:
      selectedActivities.push(...getRandomItems(allActivities, 3));
  }

  (preferences || []).forEach(pref => {
    switch (pref.toLowerCase()) {
      case 'exercise':
        selectedActivities.push(...getRandomItems(exerciseActivities, 1));
        break;
      case 'social':
        selectedActivities.push(...getRandomItems(socialActivities, 1));
        break;
      case 'creative':
        selectedActivities.push(...getRandomItems(creativeActivities, 1));
        break;
      case 'learning':
        selectedActivities.push(...getRandomItems(learningActivities, 1));
        break;
    }
  });

  return selectedActivities;
}

export function generateWeeklyPlan(request: PlanRequest): WeeklyPlan {
  const { mood, preferences = [] } = request;

  const activityPool = selectActivitiesForMood(mood, preferences);

  const days: DayPlan[] = [];
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  for (let i = 0; i < 7; i++) {
    const dailyTasks = getRandomItems(activityPool, Math.min(3, activityPool.length));
    if (i > 0) {
      const previousTasks = days[i - 1].tasks.map(task => task.activity);
      const filteredTasks = dailyTasks.filter(task => !previousTasks.includes(task.activity));
      if (filteredTasks.length >= 2) {
        dailyTasks.splice(0, dailyTasks.length, ...filteredTasks.slice(0, 3));
      }
    }
    days.push({
      tasks: dailyTasks,
      focus: `${daysOfWeek[i]} focus: ${dailyTasks[0]?.category || 'wellness'}`
    });
  }

  const theme = `Weekly ${mood} mood support plan`;
  const tipsPool = moodBasedTips[mood.toLowerCase()] || moodBasedTips.neutral;

  return {
    days,
    theme,
    tips: getRandomItems(tipsPool, 3),
    createdAt: new Date().toISOString()
  };
}
