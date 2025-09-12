import { useTasks } from "@/hooks/useTasks";
import { FormEvent, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
interface CreateTaskProps {
  onClose: () => void;
}

const CreateTask = ({ onClose }: CreateTaskProps) => {
  const { createTask } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newTask = { title, description, status: "pending" };
    try {
      await createTask(newTask);
    } catch (error) {
      setError("Failed to create task: " + error);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="mb-4 text-xl font-bold">Create a New Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="block w-full mb-2 p-2 border rounded"
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="block w-full mb-2 p-2 border rounded"
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}></textarea>
          <div className="flex justify-end space-x-2">
            <button onClick={onClose} className="px-4 py-2 rounded" type="button">
              Close
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateTask;
