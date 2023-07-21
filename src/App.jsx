import { useSelector } from "react-redux";
import Projects from "./components/Projects";

function App() {
  let data = useSelector((state) => state.TaskSlice);
  console.log(data);
  let keys = Object.keys(data);

  return (
    <div className="container mx-auto mt-3">
      <h1 className="text-3xl font-bold">Kanban</h1>

      <Projects projects={keys} />
    </div>
  );
}

export default App;
