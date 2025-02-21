import { useState } from "react";
import TodoExtractor from "../components/TodoExtractor";
import TodoList from "../components/TodoList";

const Home = () => {
  const [extractedTodos, setExtractedTodos] = useState([]);
  const [summary, setSummary] = useState("");

  const handleExtract = (todos, summaryText) => {
    setExtractedTodos(todos);
    setSummary(summaryText);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 flex flex-col items-center p-6">
      <div className="w-full max-w-3xl bg-white/30 backdrop-blur-lg shadow-2xl rounded-2xl p-8 transition-all hover:shadow-blue-500/50">
        <h1 className="text-3xl font-extrabold text-white text-center mb-6 animate-fadeIn">
          🚀 Meeting Todo Manager
        </h1>
        <TodoExtractor onExtract={handleExtract} />
        <div className="mt-8">
          <TodoList extractedTodos={extractedTodos} summary={summary} />
        </div>
      </div>
    </div>
  );
};

export default Home;
