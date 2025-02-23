import { GoogleGenerativeAI } from "@google/generative-ai";
import Todo from "../models/TodoModel.js";
import dotenv from "dotenv";
import * as chrono from "chrono-node";
import mongoose from "mongoose"; 
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Extracts todos and a summary from a meeting conversation, then saves todos to MongoDB.
 */
export const extractTodosAndSummary = async (req, res) => {
  try {
    const { paragraph } = req.body;
    if (!paragraph) {
      return res.status(400).json({ error: "Paragraph is required!" });
    }

    // 🔹 Generate AI prompts for todos & summary
    const promptTodos = `
      Extract actionable tasks from the given meeting conversation and return a JSON array.
      Each task should include:
      - "task" (string describing the action item)
      - "status" (default: "pending")
      - "deadline" (YYYY-MM-DD format, inferred if not explicitly stated)

      Example:
      Input: "We need to finalize the budget report by April 5, call the vendor on March 30, and buy groceries tomorrow."
      Output:
      [
        { "task": "Finalize the budget report", "status": "pending", "deadline": "2025-04-05" },
        { "task": "Call the vendor", "status": "pending", "deadline": "2025-03-30" },
        { "task": "Buy groceries", "status": "pending", "deadline": "2025-02-21" }
      ]

      Now process this text: "${paragraph}"
    `;

    const promptSummary = `Summarize the key points of the following meeting conversation in a concise paragraph: "${paragraph}"`;

    // 🔥 Generate AI responses (Parallel Execution)
    const [resultTodos, resultSummary] = await Promise.all([
      model.generateContent({
        contents: [{ role: "user", parts: [{ text: promptTodos }] }],
        generationConfig: { maxOutputTokens: 500, temperature: 0.2 },
      }),
      model.generateContent({
        contents: [{ role: "user", parts: [{ text: promptSummary }] }],
        generationConfig: { maxOutputTokens: 300, temperature: 0.2 },
      }),
    ]);

    // ✅ Extract AI responses
    let todosJson = resultTodos.response?.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
    let summaryText = resultSummary.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No summary available.";

    todosJson = todosJson.replace(/```json|```/g, "").trim();

    let todos;
    try {
      todos = JSON.parse(todosJson);
    } catch (error) {
      console.error("❌ JSON Parsing Error:", error);
      return res.status(500).json({ error: "AI response JSON parsing failed." });
    }

    // ✅ Convert natural language deadlines to YYYY-MM-DD format
    todos = todos.map(todo => ({
      task: todo.task,
      status: todo.status || "pending",
      deadline: parseExactDate(todo.deadline),
    }));

    // ✅ Save as a single document (per your schema)
    const todoEntry = new Todo({
      summary: summaryText,
      tasks: todos,
    });

    await todoEntry.save();

    res.status(201).json({
      message: "Todos extracted, summary generated, and saved!",
      summary: summaryText,
      todos,
    });
  } catch (error) {
    console.error("❌ Error extracting todos and summary:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Parses a natural language date into an exact YYYY-MM-DD format.
 */
const parseExactDate = (dateString) => {
  if (!dateString) return null;
  const today = new Date();
  const parsedDate = chrono.parseDate(dateString, today);
  return parsedDate ? parsedDate.toISOString().split("T")[0] : null;
};
/**
 * Fetch all todos from MongoDB
 */
export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    console.error("❌ Error fetching todos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Delete all todos from MongoDB
 */
export const deleteAllTodos = async (req, res) => {
  try {
    await Todo.deleteMany({});
    res.status(200).json({ message: "All todos deleted successfully!" });
  } catch (error) {
    console.error("❌ Error deleting todos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteTaskById = async (req, res) => {
  try {
    const { summaryId, taskId } = req.params;

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(summaryId) || !mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid summary ID or task ID" });
    }

    // Find the summary and remove the task
    const updatedSummary = await Todo.findByIdAndUpdate(
      summaryId,
      { $pull: { tasks: { _id: taskId } } }, // Remove task from `tasks` array
      { new: true }
    );

    if (!updatedSummary) {
      return res.status(404).json({ message: "Summary or task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully", updatedSummary });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error: error.message });
  }
};