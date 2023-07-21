/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { removeTask } from "../redux/TaskSlice";

const Card = ({ data, project }) => {
  const dispatch = useDispatch();
  return (
    <div className="border-2 rounded-lg p-3">
      <h1>{data.title}</h1>
      <button
        onClick={(e) => {
          e.preventDefault();
          dispatch(removeTask([project, data]));
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default Card;

{
  /* <form
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
  </form> */
}
