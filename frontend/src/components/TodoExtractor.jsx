import { useState } from "react";
import { extractTodos } from "../services/api";
import { Loader2, Mic, ClipboardList } from "lucide-react";

const TodoExtractor = ({ onExtract }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleExtract = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError("");

    try {
      const result = await extractTodos(text);
      onExtract(result.todos, result.summary);
    } catch (err) {
      setError("Failed to extract todos.");
    } finally {
      setLoading(false);
    }
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }
    setError("");
    setIsListening(true);
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(" ");
      setText((prev) => prev + " " + transcript);
    };

    recognition.onerror = (event) => {
      setError("Speech recognition error: " + event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="p-8 bg-white/20 shadow-xl rounded-2xl w-full max-w-xl mx-auto backdrop-blur-md border border-white/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/20 blur-xl"></div>
      
      <h2 className="text-2xl font-bold text-white mb-6 relative z-10 flex items-center gap-2">
        <ClipboardList className="w-6 h-6 text-white" /> Extract Todos
      </h2>
      
      <div className="relative w-full">
        <textarea
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 text-gray-900 bg-white/80 relative z-10"
          rows="4"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter meeting transcript..."
        />
        <button
          onClick={startListening}
          className={`absolute bottom-3 right-3 p-2 rounded-full transition-all ${isListening ? 'bg-red-500' : 'bg-blue-500'} text-white shadow-lg z-20`}
        >
          <Mic className="w-5 h-5" />
        </button>
      </div>
      
      <button
        onClick={handleExtract}
        className="mt-4 w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 rounded-lg shadow-md transition-all disabled:opacity-50 relative z-10"
        disabled={loading}
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : "Extract Todos"}
      </button>
      
      {error && <p className="text-red-500 mt-3 text-sm font-medium relative z-10">{error}</p>}
    </div>
  );
};

export default TodoExtractor;
