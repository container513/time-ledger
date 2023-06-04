import { useDrag } from "react-dnd";
import Task from "../../shared/task";
import { DragItemTypes } from "../../shared/DragItemTypes";
import "./TaskView.css";

const TaskView = (task: Task) => {
  const [, dragRef] = useDrag({
    type: DragItemTypes.Task,
    item: { type: DragItemTypes.Task, task },
  });

  return (
    <div className="panel-task" ref={dragRef}>
      {task.name}
    </div>
  );
};

export default TaskView;
