# BreezaAI + Kiro Integration Guide

## 🎯 Overview

BreezaAI is fully integrated with Kiro AI to provide intelligent, empathetic mental wellness support. This integration uses Kiro's prompt system, steering configuration, and hooks to deliver contextual responses.

## 📁 Kiro Structure

```
.kiro/
├── prompts/
│   ├── breathing_relaxation.txt    # Breathing & relaxation guidance
│   ├── emotional_checkin.txt       # Initial emotional assessment
│   ├── emotional_support.txt       # Deep emotional support
│   ├── positive_redirect.txt       # Uplifting & motivational
│   └── wellbeing_lessons.txt       # Educational micro-lessons
├── hooks.json                      # Automated triggers
├── specs.json                      # AI behavior specifications
├── steering.json                   # Response style & language
└── settings/
    └── mcp.json                    # Model Context Protocol config
```

## 🤖 AI Behavior

### Prompt Selection Logic
The system automatically selects appropriate Kiro prompts based on:

1. **Message Content Analysis**
   - Keywords: breathing, anxiety, stress → `breathing_relaxation.txt`
   - Keywords: sad, depressed, hurt → `emotional_support.txt`
   - Keywords: learn, explain, what is → `wellbeing_lessons.txt`
   - Keywords: hopeless, can't, give up → `positive_redirect.txt`

2. **Conversation Context**
   - New conversations → `emotional_checkin.txt`
   - Ongoing support → `emotional_support.txt`

3. **Mood Detection**
   - Extracted from conversation history
   - Influences response tone and suggestions

### Response Characteristics
- **Empathetic & Non-judgmental**
- **Concise** (3-7 sentences max)
- **Actionable** (offers specific next steps)
- **Multilingual** (English & Spanish support)
- **Follow-up Questions** (keeps conversation flowing)

## 🔧 Configuration

### Specs (`.kiro/specs.json`)
```json
{
  "name": "MindBuddy AI Spec",
  "goals": [
    "Provide empathetic responses for mental wellness",
    "Offer short mindfulness tips",
    "Guide breathing and relaxation exercises",
    "Support both English and Spanish"
  ],
  "context": "AI assistant for anxiety, stress, and mindfulness practices"
}
```

### Steering (`.kiro/steering.json`)
```json
{
  "style": "empathetic",
  "language": "multilingual (English & Spanish)",
  "followup": "Always ask a short follow-up question"
}
```

### Hooks (`.kiro/hooks.json`)
```json
{
  "hooks": [
    {
      "name": "breathing_exercise",
      "description": "Triggers 4-7-8 breathing when user feels anxious"
    },
    {
      "name": "mindfulness_tip", 
      "description": "Provides short mindfulness practice"
    }
  ]
}
```

## 🔄 Integration Flow

1. **User Message** → Frontend (React)
2. **API Call** → Backend (Express)
3. **Context Analysis** → Extract mood, topic, history
4. **Prompt Selection** → Choose appropriate Kiro prompt
5. **Response Generation** → Apply prompt guidance
6. **Contextual Enhancement** → Add follow-up questions
7. **Response Delivery** → Back to frontend

## 🛠️ Development

### Adding New Prompts
1. Create new `.txt` file in `.kiro/prompts/`
2. Add prompt constant to `backend/utils/kiroPrompts.js`
3. Update selection logic in `getContextualPrompt()`
4. Test with various user inputs

### Modifying AI Behavior
1. Update `.kiro/specs.json` for goals/context
2. Modify `.kiro/steering.json` for style/language
3. Adjust prompt files for specific responses
4. Restart backend to reload configuration

### Testing Integration
```bash
# Test prompt loading
node -e "console.log(require('./backend/utils/kiroPrompts.js').loadKiroPrompt('emotional_checkin'))"

# Test response generation
node -e "console.log(require('./backend/utils/kiroPrompts.js').generateKiroResponse('I feel anxious', 'anxious', []))"
```

## 📊 Features Powered by Kiro

### 💬 Chat System
- **Contextual Responses** using prompt selection
- **Mood-based Adaptation** from conversation analysis
- **Empathetic Language** following steering guidelines
- **Educational Content** from wellbeing lessons

### 📅 Weekly Plans
- **Mood-based Activity Selection**
- **Personalized Recommendations**
- **Progress Tracking Integration**

### 🧘 Mindfulness Tools
- **Guided Breathing Exercises**
- **Gratitude Journal Prompts**
- **Meditation Guidance**

## 🚀 Deployment

The Kiro integration is designed to work in any environment:

1. **Development:** Uses local prompt files
2. **Production:** Prompts bundled with application
3. **Kiro Cloud:** Can connect to Kiro's cloud services

## 🔍 Troubleshooting

### Common Issues

**Prompts not loading:**
```bash
# Check file permissions
ls -la .kiro/prompts/

# Verify file content
cat .kiro/prompts/emotional_checkin.txt
```

**Responses seem generic:**
- Check if Kiro config files are properly formatted
- Verify prompt selection logic in `kiroPrompts.js`
- Ensure conversation history is being passed correctly

**Integration not working:**
- Confirm `.kiro` directory structure
- Check backend logs for prompt loading errors
- Verify MCP configuration in `.kiro/settings/mcp.json`

## 📈 Analytics & Monitoring

The system tracks:
- **Prompt Usage** - Which prompts are most effective
- **Conversation Flow** - How users interact with AI
- **Mood Patterns** - Emotional trends over time
- **Feature Adoption** - Which tools users prefer

This data helps improve the Kiro integration and user experience.

---

**For more information about Kiro AI, visit:** [Kiro Documentation](https://kiro.ai/docs)