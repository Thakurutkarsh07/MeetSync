import { useEffect, useState } from "react";
import { fetchTodos, deleteTodo } from "../services/api";
import AnimatedButton from "../components/AnimatedButton";
import { motion } from "framer-motion";

export default function TodosPage() {
  const [todosList, setTodosList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  useEffect(() => {
    async function loadTodos() {
      const todos = await fetchTodos();
      setTodosList(todos);
      setLoading(false);
    }
    loadTodos();
  }, []);

  // Function to delete a task (Mark as Done)
  const markTaskAsDone = async (summaryId, taskId) => {
    setDeletingTaskId(taskId);
    try {
      await deleteTodo(summaryId, taskId);
      setTodosList((prevTodos) =>
        prevTodos
          .map((todo) =>
            todo._id === summaryId
              ? { ...todo, tasks: todo.tasks.filter((task) => task._id !== taskId) }
              : todo
          )
          .filter((todo) => todo.tasks.length > 0) // Remove empty summaries
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    }
    setDeletingTaskId(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <div className="animate-pulse bg-gray-300 h-6 w-32 rounded-md"></div>
      </div>
    );
  }

  if (todosList.length === 0) {
    return <p className="text-center mt-5 text-red-500 font-medium">No todos available</p>;
  }

  return (
    <div className="container mx-auto p-12 space-y-6">
      {todosList.map((todo) => (
        <motion.div
          key={todo._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="bg-white shadow-xl rounded-2xl p-6 transition-all hover:shadow-2xl"
        >
          {/* Summary */}
          <h2 className="text-xl font-bold text-blue-600 mb-2 flex items-center">📌 Meeting Summary</h2>
          <p className="text-gray-700">{todo.summary}</p>

          {/* Task List */}
          <h2 className="text-lg font-bold text-blue-500 mt-4">📝 Tasks</h2>
          <ul className="space-y-4">
            {todo.tasks.map((task) => (
              <motion.li
                key={task._id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-between items-center p-4 border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition-all"
              >
                <div>
                  <p className="font-semibold text-gray-800">{task.task}</p>
                  <p className="text-sm text-gray-500">📅 Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
                </div>

                {/* Done Button (Delete Task) */}
                <AnimatedButton
                  onClick={() => markTaskAsDone(todo._id, task._id)}
                  isLoading={deletingTaskId === task._id}
                  label="Done"
                />
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
