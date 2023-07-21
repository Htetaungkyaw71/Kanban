import { useDispatch } from "react-redux";
import { removeTask } from "../redux/TaskSlice";

/* eslint-disable react/prop-types */
const Task = ({ task, project }) => {
  const dispatch = useDispatch();
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

  //   const handleChange = (e) => {
  //     const value = e.target.value;
  //     setData({
  //       ...data,
  //       [e.target.name]: value,
  //     });
  //     console.log(data);
  //   };
  return (
    <div>
      {task.map((t) => (
        <div key={t.id}>
          <h1>{t.title}</h1>
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(removeTask([project, t]));
            }}
          >
            Delete
          </button>
          {/* <form
            onSubmit={(e) => {
              e.preventDefault();
              data.id = task.id;
              updateTask([project, data]);
            }}
          >
            <input
              name="title"
              type="text"
              placeholder="title"
              value={data.title}
              onChange={handleChange}
            />
            <input
              name="description"
              type="text"
              placeholder="description"
              value={data.description}
              onChange={handleChange}
            />
            <select name="status" value={data.status} onChange={handleChange}>
              <option value="todo">Todo</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
            <button type="submit">rename</button>
          </form> */}
        </div>
      ))}
    </div>
  );
};

export default Task;
