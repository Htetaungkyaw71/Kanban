import Card from "./Card";

/* eslint-disable react/prop-types */
const Task = ({ task, project, theme }) => {
  if (task.length === 0) {
    return (
      <div className="text-center pt-40 text-2xl font-bold text-gray-500">
        No Task
      </div>
    );
  }
  let todo = task.filter((t) => t.status === "todo");
  let doing = task.filter((t) => t.status === "doing");
  let done = task.filter((t) => t.status === "done");

  return (
    <div className="h-screen grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      <div className="p-3 border-2  sm:border-b-0 md:border-b-2 lg:border-b-2 xl:border-b-2">
        <h1 className="text-lg font-bold text-gray-500 ml-3 mb-3">
          Todo 📋 ({todo.length})
        </h1>
        {todo.map((t) => (
          <div key={t.id} className="mb-3">
            <Card data={t} project={project} theme={theme} />
          </div>
        ))}
      </div>
      <div className="p-3 border-2  sm:border-y-2 sm:border-x-2 md:border-r-2 md:border-l-0 lg:border-y-2 lg:border-x-0 xl:border-y-2 xl:border-x-0">
        <h1 className="text-lg font-bold text-gray-500 ml-3 mb-3">
          Doing 💪 ({doing.length})
        </h1>
        {doing.map((t) => (
          <div key={t.id} className="mb-3">
            <Card data={t} project={project} theme={theme} />
          </div>
        ))}
      </div>
      <div className="p-3 border-2 sm:border-2 sm:border-t-0 md:border-t-0 lg:border-2 xl:border-2">
        <h1 className="text-lg font-bold text-gray-500 ml-3 mb-3">
          Done 🎉 ({done.length})
        </h1>
        {done.map((t) => (
          <div key={t.id} className="mb-3">
            <Card data={t} project={project} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task;
