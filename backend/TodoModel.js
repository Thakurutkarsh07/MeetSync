import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  status: { type: String, default: "pending" },
});

const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;
