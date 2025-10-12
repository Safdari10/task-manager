const EditTask = () => {
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
        </form>
      </div>
    </div>
  );
};

export default EditTask;
