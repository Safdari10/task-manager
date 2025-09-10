import React from "react";

const CreateTask = () => {
  return (
    <div>
      <h2>Create a New Task</h2>
      <form>
        <input type="text" placeholder="Task title" />
        <textarea placeholder="Task description"></textarea>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default CreateTask;
