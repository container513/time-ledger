import React from "react";
import Task from "../../shared/task";
import "./TaskView.css";

const TaskView = (task: Task) => {
  return <div className="panel-task">{task.name}</div>;
};

export default TaskView;