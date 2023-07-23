/* eslint-disable react/prop-types */
import Task from "./Task";

const Tasks = ({ task, project, theme }) => {
  return (
    <div className="col-span-3 h-screen">
      <div>
        <Task task={task} project={project} theme={theme} />
      </div>
    </div>
  );
};

export default Tasks;
