import { useSelector } from "react-redux";
import Projects from "./components/Projects";
import { useState, useEffect } from "react";
useState;

function App() {
  let data = useSelector((state) => state.TaskSlice);
  let keys = Object.keys(data);
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  return (
    <div className="container mx-auto mt-3">
      <Projects projects={keys} toggleTheme={toggleTheme} theme={theme} />
    </div>
  );
}

export default App;
