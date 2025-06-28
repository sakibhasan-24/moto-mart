import { Bike, Megaphone, Wrench } from "lucide-react";

export const blogs = [
  {
    id: "electric-vs-petrol",
    title: "Electric vs Petrol Bikes: Which One Should You Buy in 2025?",
    author: "Alex Rider",
    date: "2025-06-20",
    readTime: "6 min read",
    icon: <Bike size={32} className="text-cyan-400" />,
    content: [
      {
        heading: "Introduction",
        paragraph:
          "Electric and petrol bikes are two popular options for riders. While petrol bikes have been the norm, electric bikes are gaining momentum in 2025 due to their eco-friendliness and low maintenance.",
      },
      {
        heading: "Performance",
        paragraph:
          "Electric bikes provide instant torque and smooth rides, ideal for city traffic. Petrol bikes, however, still lead in long-distance performance and high-speed power.",
      },
      {
        heading: "Cost & Maintenance",
        paragraph:
          "Electric bikes cost more upfront but require less maintenance. Petrol bikes need regular engine checkups and fuel, increasing their total ownership cost.",
      },
      {
        heading: "Environment",
        paragraph:
          "Electric bikes are environmentally friendly with zero emissions. Petrol bikes still contribute to pollution, especially in urban areas.",
      },
      {
        heading: "Conclusion",
        paragraph:
          "For daily commuting and eco-conscious users, electric bikes are the better choice. Petrol bikes are still ideal for riders who value performance and long-range travel.",
      },
    ],
  },
  {
    id: "bmw-launch-2025",
    title: "BMW Launches AI-Powered Smart Bike in Germany",
    author: "Jordan Clark",
    date: "2025-06-22",
    readTime: "4 min read",
    icon: <Megaphone size={32} className="text-yellow-400" />,
    content: [
      {
        heading: "AI Meets Bikes",
        paragraph:
          "BMW unveils its new AI-enabled motorcycle featuring predictive route planning, real-time hazard detection, and voice assistant integration.",
      },
      {
        heading: "Smart Features",
        paragraph:
          "The bike includes adaptive cruise control, smart braking systems, and personalized riding modes powered by machine learning.",
      },
    ],
  },
  {
    id: "bike-maintenance",
    title: "10 Essential Bike Maintenance Tips",
    author: "Morgan Lee",
    date: "2025-06-18",
    readTime: "5 min read",
    icon: <Wrench size={32} className="text-green-400" />,
    content: [
      {
        heading: "Why Maintenance Matters",
        paragraph:
          "Regular maintenance improves safety, extends the life of your bike, and ensures better performance.",
      },
      {
        heading: "Top 5 Daily Checks",
        paragraph:
          "1. Tire pressure\n2. Chain tension\n3. Brake condition\n4. Headlight and indicator\n5. Fuel or battery level",
      },
    ],
  },
];
