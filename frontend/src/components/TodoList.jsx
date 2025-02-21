import { useEffect, useState } from "react";
import { fetchTodos, deleteAllTodos, deleteTodo } from "../services/api";
import { Loader2, Trash, CheckCircle, X } from "lucide-react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [error, setError] = useState(null);
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTodos();
      setTodos(data);
    } catch (err) {
      setError("Failed to fetch todos. Please try again.");
    }
    setLoading(false);
  };

  const handleDeleteAll = async () => {
    if (deleting) return;
    setDeleting(true);
    setError(null);
    try {
      await deleteAllTodos();
      setTodos([]);
    } catch (err) {
      setError("Error deleting todos. Please try again.");
    }
    setDeleting(false);
  };

  const handleTaskCompletion = async (summaryId, taskId) => {
    if (deletingTaskId) return;
    setDeletingTaskId(taskId);
    setError(null);

    try {
      await deleteTodo(summaryId, taskId);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === summaryId
            ? { ...todo, tasks: todo.tasks.filter((task) => task._id !== taskId) }
            : todo
        )
      );

      setSelectedTodo((prevSelected) => {
        if (!prevSelected) return null;
        const updatedTasks = prevSelected.tasks.filter((task) => task._id !== taskId);
        return updatedTasks.length === 0 ? null : { ...prevSelected, tasks: updatedTasks };
      });
    } catch (err) {
      setError("Error completing task. Please try again.");
    }
    setDeletingTaskId(null);
  };

  return (
    <div className="mt-6 p-6 bg-white/30 shadow-lg rounded-2xl w-full max-w-2xl mx-auto backdrop-blur-lg border border-white/40">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        📌 Meeting Summaries
      </h2>

      {error && <p className="text-red-400">{error}</p>}

      {loading ? (
        <p className="text-gray-300">Loading...</p>
      ) : todos.length === 0 ? (
        <p className="text-gray-300">No meeting summaries available.</p>
      ) : (
        <div className="space-y-3">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className="p-4 bg-gray-900/40 rounded-lg shadow-md cursor-pointer hover:bg-gray-900/60 transition-all"
              onClick={() => setSelectedTodo(todo)}
            >
              <p className="text-white font-semibold">{todo.summary}</p>
              <p className="text-gray-400 text-sm">🗓 {new Date(todo.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleDeleteAll}
        className={`mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-lg font-semibold transition-all shadow-md text-white
          ${deleting ? "bg-gray-500 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`}
        disabled={deleting}
      >
        {deleting ? <Loader2 className="animate-spin w-5 h-5" /> : <Trash className="w-5 h-5" />}
        {deleting ? "Deleting..." : "Delete All Summaries"}
      </button>

      {/* Popup Modal for Details */}
      {selectedTodo && (
        <div className="fixed inset-0 flex justify-center rounded-lg items-center bg-black/60 p-4">
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-lg max-w-lg w-full border border-gray-300 relative">
            <button
              className="absolute top-3 right-3 text-gray-800 hover:text-gray-600"
              onClick={() => setSelectedTodo(null)}
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-xl font-bold text-gray-900 mb-2">Meeting Details</h2>
            <p className="text-gray-800 mb-1">{selectedTodo.summary}</p>
            <p className="text-gray-600 text-sm mb-4">
              🕒 Created: {new Date(selectedTodo.createdAt).toLocaleString()}
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tasks:</h3>
            <ul className="space-y-2">
              {selectedTodo.tasks.length === 0 ? (
                <p className="text-gray-700">✅ All tasks completed!</p>
              ) : (
                selectedTodo.tasks.map((task) => (
                  <li
                    key={task._id}
                    className="flex justify-between items-center bg-gray-100 p-3 rounded-md shadow-sm text-gray-900"
                  >
                    <span>
                      📌 {task.task} – <span className="text-gray-600">
  {new Date(task.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
</span>

                    </span>
                    <button
                      className={`px-3 py-1 rounded-md transition-all flex items-center gap-2
                        ${deletingTaskId === task._id ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"}`}
                      onClick={() => handleTaskCompletion(selectedTodo._id, task._id)}
                      disabled={deletingTaskId === task._id}
                    >
                      {deletingTaskId === task._id ? <Loader2 className="animate-spin w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                      {deletingTaskId === task._id ? "Processing..." : "Done"}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
