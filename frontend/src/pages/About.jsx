import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6">
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="max-w-2xl bg-white/20 backdrop-blur-lg shadow-lg rounded-xl p-8 border border-white/30"
      >
        <h1 className="text-4xl font-bold text-center mb-4">About MeetSync</h1>
        <p className="text-lg text-gray-200 text-center">
          MeetSync is your AI-powered meeting assistant that extracts action items and summaries
          from conversations. Our mission is to simplify collaboration, keep teams on track, and 
          enhance productivity effortlessly.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-white/30 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">✨ AI-Powered Summaries</h3>
            <p className="text-gray-100">Extract key takeaways and action items automatically.</p>
          </div>
          <div className="p-4 bg-white/30 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">📅 Task Management</h3>
            <p className="text-gray-100">Track and complete tasks seamlessly.</p>
          </div>
          <div className="p-4 bg-white/30 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">🎙 Voice Integration</h3>
            <p className="text-gray-100">Capture notes via real-time transcription.</p>
          </div>
          <div className="p-4 bg-white/30 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">📩 Email Reminders</h3>
            <p className="text-gray-100">Get notified about upcoming deadlines.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}