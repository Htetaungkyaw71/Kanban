/* eslint-disable react/prop-types */
import Project from "./Project";
import { useState } from "react";
import { addProject } from "../redux/TaskSlice";
import { useDispatch, useSelector } from "react-redux";
import AddTask from "./AddTask";
import Tasks from "./Tasks";

const Projects = ({ projects }) => {
  let [name, setName] = useState("");
  let data = useSelector((state) => state.TaskSlice);
  let [project, setProject] = useState(0);
  let current_task = data[projects[project]] ?? [];

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProject(name));
    setName("");
  };

  return (
    <>
      <div className="mt-10 flex justify-between">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="add project"
            className="p-1 mr-3 border-2 border-gray-500 rounded-sm"
          />
          <button
            type="submit"
            className="bg-gray-500 text-white p-1 px-2 rounded-sm"
          >
            submit
          </button>
        </form>

        {projects.length != 0 && <AddTask project={projects[project]} />}
      </div>

      <div>
        <div className="container mx-auto">
          <div className="mb-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4">
            <div className="border-2">
              {projects.map((i, index) => (
                <div key={i} className="mb-10 flex flex-wrap">
                  <Project project={i} />
                  <button onClick={() => setProject(index)}>
                    <h1 className="text-2xl font-bold text-cyan-800 ml-5">
                      {" "}
                      {i}
                    </h1>
                  </button>
                </div>
              ))}
            </div>
            <Tasks task={current_task} project={projects[project]} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
