import { useState } from "react";
import { addProject, removeProject } from "./redux/TaskSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  let [name, setName] = useState("");
  let data = useSelector((state) => state.TaskSlice);
  let keys = Object.keys(data);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProject(name));
  };
  console.log(data);
  return (
    <>
      <h1 className="text-red-500 text-2xl">Hello world</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="text"
        />
        <button type="submit">submit</button>
      </form>
      <div>
        {keys.map((i) => (
          <div key={i}>
            {i}
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(removeProject(i));
                console.log(data);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
