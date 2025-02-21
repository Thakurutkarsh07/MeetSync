import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    summary: { 
      type: String, 
      trim: true // Kept optional for flexibility
    },
    tasks: [
      {
        task: { 
          type: String, 
          required: [true, "Task description is required!"], 
          trim: true 
        },
        status: { 
          type: String, 
          enum: ["pending", "in-progress", "completed"], 
          lowercase: true, // ✅ Auto-converts "PENDING" -> "pending"
          default: "pending" 
        },
        deadline: { 
          type: Date // ✅ Allows null (if needed)
        }
      }
    ]
  },
  { timestamps: true } // ✅ Adds createdAt & updatedAt automatically
);

const Todo = mongoose.model("Todo", TodoSchema);
export default Todo;
