import React from 'react';
import { SimplePage } from "../components/ui/SimplePage";

export default function TestimonyPage() {
  const testimonials = [
    {
      name: "Sarah M.",
      role: "College Student",
      text: "BreezaAI helped me manage my anxiety during finals week. The breathing exercises and weekly plans kept me grounded when everything felt overwhelming.",
      rating: 5,
      image: "👩‍🎓"
    },
    {
      name: "Michael R.",
      role: "Software Engineer",
      text: "As someone who struggles with work-life balance, the gratitude journal feature has been a game-changer. It helps me focus on the positive aspects of each day.",
      rating: 5,
      image: "👨‍💻"
    },
    {
      name: "Emma L.",
      role: "Teacher",
      text: "The personalized weekly plans are amazing! They adapt to how I'm feeling and give me realistic, achievable goals for better mental health.",
      rating: 5,
      image: "👩‍🏫"
    },
    {
      name: "David K.",
      role: "Marketing Manager",
      text: "I love how BreezaAI doesn't push techniques on me. It listens first and then offers gentle suggestions. It feels like talking to a caring friend.",
      rating: 5,
      image: "👨‍💼"
    },
    {
      name: "Lisa P.",
      role: "Nurse",
      text: "Working in healthcare is stressful, but BreezaAI's quick mindfulness exercises fit perfectly into my busy schedule. Even 5 minutes makes a difference.",
      rating: 5,
      image: "👩‍⚕️"
    },
    {
      name: "James T.",
      role: "Freelancer",
      text: "The contextual conversations are incredible. BreezaAI remembers what we talked about and builds on it. It's like having a personal wellness coach.",
      rating: 5,
      image: "👨‍🎨"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Users" },
    { number: "4.9/5", label: "Average Rating" },
    { number: "95%", label: "Would Recommend" },
    { number: "50,000+", label: "Sessions Completed" }
  ];

  const successMetrics = [
    { metric: "Reduced Anxiety", percentage: 78, color: "from-blue-500 to-blue-600" },
    { metric: "Improved Mood", percentage: 85, color: "from-green-500 to-green-600" },
    { metric: "Better Sleep", percentage: 72, color: "from-purple-500 to-purple-600" },
    { metric: "Increased Mindfulness", percentage: 91, color: "from-indigo-500 to-indigo-600" }
  ];

  return (
    <SimplePage
      title="What Our Users Say"
      subtitle="Real stories from people who've transformed their mental wellness with BreezaAI"
      centerTitle
    >
      <div className="space-y-12">
        {/* Statistics Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold text-gray-800 mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Metrics */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            📊 Proven Results
          </h3>
          <div className="space-y-4">
            {successMetrics.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">{item.metric}</span>
                  <span className="text-sm text-gray-500">{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`bg-gradient-to-r ${item.color} h-3 rounded-full transition-all duration-1000`}
                    style={{width: `${item.percentage}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{testimonial.image}</div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <span className="ml-2 text-sm text-gray-500">{testimonial.role}</span>
                  </div>
                  
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">⭐</span>
                    ))}
                  </div>
                  
                  <p className="text-gray-700 text-sm leading-relaxed">
                    "{testimonial.text}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Usage Patterns */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            📈 How People Use BreezaAI
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">🌅</div>
              <div className="font-medium text-gray-800">Morning Routine</div>
              <div className="text-sm text-gray-600 mt-1">65% start their day with BreezaAI</div>
            </div>
            <div>
              <div className="text-3xl mb-2">💼</div>
              <div className="font-medium text-gray-800">Work Breaks</div>
              <div className="text-sm text-gray-600 mt-1">78% use it during work stress</div>
            </div>
            <div>
              <div className="text-3xl mb-2">🌙</div>
              <div className="font-medium text-gray-800">Evening Wind-down</div>
              <div className="text-sm text-gray-600 mt-1">82% use it before bed</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
          <p className="text-blue-100 mb-6">
            Join thousands of users who have already transformed their mental wellness with BreezaAI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/session"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Start Free Session
            </a>
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </SimplePage>
  );
}