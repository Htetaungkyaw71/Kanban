import Card from "./Card";

/* eslint-disable react/prop-types */
const Task = ({ task, project }) => {
  //   const [data, setData] = useState({
  //     id: null,
  //     name: project,
  //     title: "",
  //     description: "",
  //     status: "",
  //   });
  if (task.length === 0) {
    return <div>no task</div>;
  }
  let todo = task.filter((t) => t.status === "todo");
  let doing = task.filter((t) => t.status === "doing");
  let done = task.filter((t) => t.status === "done");

  //   const handleChange = (e) => {
  //     const value = e.target.value;
  //     setData({
  //       ...data,
  //       [e.target.name]: value,
  //     });
  //     console.log(data);
  //   };
  return (
    <div className="grid grid-cols-3">
      <div className="border-2 p-3">
        <h1 className="text-lg font-bold text-gray-500 ml-3">
          Todo {todo.length}
        </h1>
        {todo.map((t) => (
          <div key={t.id} className="mb-3">
            <Card data={t} project={project} />
          </div>
        ))}
      </div>
      <div className="border-2 p-3">
        <h1 className="text-lg font-bold text-gray-500 ml-3">
          Doing {doing.length}
        </h1>
        {doing.map((t) => (
          <div key={t.id} className="mb-3">
            <Card data={t} project={project} />
          </div>
        ))}
      </div>
      <div className="border-2 p-3">
        <h1 className="text-lg font-bold text-gray-500 ml-3">
          Done {done.length}
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
