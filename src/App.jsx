import { useState } from "react";
import { addProject } from "./redux/TaskSlice";
import { useDispatch, useSelector } from "react-redux";
import Projects from "./Projects";
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
      <Projects projects={keys} />
    </>
  );
}

export default App;
