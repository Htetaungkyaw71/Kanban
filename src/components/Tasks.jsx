/* eslint-disable react/prop-types */
import Task from "./Task";

const Tasks = ({ task, project }) => {
  return (
    <div className="col-span-3 h-screen">
      <div>
        <Task task={task} project={project} />
      </div>
    </div>
  );
};

export default Tasks;
