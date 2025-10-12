import React, { FormEvent, useState } from "react";
import { useTasks } from "@/hooks/useTasks";

interface EditTaskProps {
  task: {
    id: string;
    title: string;
    description: string;
    status: string;
    created_at: string;
    updated_at: string;
  } | null;
}

const EditTask = ({ task }: EditTaskProps) => {
  const { updateTask } = useTasks();
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "pending");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!task) return;

    const updatedTask = { ...task, title, description, status };
    try {
      await updateTask(updatedTask);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
        <form>
          <input
            type="text"
            placeholder="Task title"
            className="border border-gray-300 p-2 rounded-md w-full mb-4"
          />
          <textarea
            placeholder="Task description"
            className="border border-gray-300 p-2 rounded-md w-full mb-4"></textarea>
          <select className="border border-gray-300 p-2 rounded-md w-full mb-4">
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <div className="flex justify-end space-x-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
              Save
            </button>
            <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
