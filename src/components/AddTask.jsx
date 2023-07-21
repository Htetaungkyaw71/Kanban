/* eslint-disable react/prop-types */
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { addTask } from "../redux/TaskSlice";
import { useDispatch } from "react-redux";

const AddTask = ({ project }) => {
  console.log(project);
  const dispatch = useDispatch();

  const [error, setError] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = new FormData(e.target);
    let formdata = {
      id: uuidv4(),
      name: project,
      title: obj.get("title") ?? "",
      description: obj.get("description") ?? "",
      status: obj.get("status") ?? "",
    };
    if (formdata.title.length <= 0 || formdata.description.length <= 0) {
      setError(true);
    } else {
      dispatch(addTask(formdata));
      setError(false);
    }
  };

  return (
    <div className="mb-5">
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          type="text"
          placeholder="text"
          className="p-1 mr-3 border-2 border-gray-500 rounded-sm"
        />
        <input
          name="description"
          type="text"
          placeholder="text"
          className="p-1 mr-3 border-2 border-gray-500 rounded-sm"
        />
        <select
          name="status"
          className="p-1 mr-3 border-2 border-gray-500 rounded-sm"
        >
          <option value="todo">Todo</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
        <button
          type="submit"
          className="bg-gray-500 text-white p-1 px-2 rounded-sm"
        >
          submit
        </button>
      </form>
      {error ? <div>Invalid Credential</div> : <div></div>}
    </div>
  );
};

export default AddTask;
