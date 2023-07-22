import { useSelector } from "react-redux";
import Projects from "./components/Projects";

function App() {
  let data = useSelector((state) => state.TaskSlice);
  let keys = Object.keys(data);

  return (
    <div className="container mx-auto mt-3">
      <Projects projects={keys} />
    </div>
  );
}

export default App;
