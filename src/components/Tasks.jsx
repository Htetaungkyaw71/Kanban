/* eslint-disable react/prop-types */
import Task from "./Task";

const Tasks = ({ task, project }) => {
  return (
    <div className="flex col-span-3 border-2">
      <div>
        <Task task={task} project={project} />
      </div>
    </div>
  );
};

export default Tasks;
