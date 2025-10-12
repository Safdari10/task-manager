const EditTask = () => {
  return (
    <div>
      <div>
        <h2>Edit Task</h2>
        <form>
          <input type="text" placeholder="Task title" />
          <textarea placeholder="Task description"></textarea>
          <select>
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
