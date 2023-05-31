import React from "react";
import Task from "../../shared/task";

const TaskView = (task: Task) => {
  return <div>{task.name}</div>;
};

export default TaskView;