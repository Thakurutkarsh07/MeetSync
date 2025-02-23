import { Briefcase, Code, Mic, ClipboardCheck } from "lucide-react";
import { ListCheck } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "AI-Powered Summaries",
      icon: <ClipboardCheck size={28} className="text-blue-400" />, 
      description: "Generate concise and accurate meeting summaries using AI, saving you time and effort."
    },
    {
      title: "Smart Task Management",
      icon: <ListCheck size={28} className="text-green-400" />, 
      description: "Automatically extract actionable tasks from your meetings and manage them seamlessly."
    },
    {
      title: "Voice Recognition",
      icon: <Mic size={28} className="text-purple-400" />, 
      description: "Use advanced speech-to-text technology to transcribe and analyze meetings in real-time."
    },
    {
      title: "Custom Integrations",
      icon: <Code size={28} className="text-yellow-400" />, 
      description: "Easily integrate with your favorite productivity tools like Slack, Trello, and Notion."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-4 text-center">Our Services</h1>
      <p className="text-lg text-gray-300 max-w-2xl text-center mb-8">
        We offer AI-driven solutions to enhance your workflow and productivity.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-4xl">
        {services.map((service, index) => (
          <div key={index} className="p-6 bg-white/20 backdrop-blur-lg rounded-xl shadow-lg flex flex-col items-center text-center transition-transform transform hover:scale-105">
            <div className="mb-3">{service.icon}</div>
            <h2 className="text-2xl font-semibold text-white">{service.title}</h2>
            <p className="text-gray-300 mt-2">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}