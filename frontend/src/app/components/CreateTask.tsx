import { useTasks } from "@/hooks/useTasks";
import { FormEvent } from "react";
interface CreateTaskProps {
  onClose: () => void;
}

const CreateTask = ({ onClose }: CreateTaskProps) => {
  const { addTask } = useTasks();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Logic to create a new task and add it using addTask from context
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
          />
          <textarea
            className="block w-full mb-2 p-2 border rounded"
            placeholder="Task description"></textarea>
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
