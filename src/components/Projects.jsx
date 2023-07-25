/* eslint-disable react/prop-types */
import Project from "./Project";
import { useState } from "react";
import { addProject } from "../redux/TaskSlice";
import { useDispatch, useSelector } from "react-redux";
import AddTask from "./AddTask";
import Tasks from "./Tasks";
import Modal from "./Modal";
import { RxCross1 } from "react-icons/rx";
import kanban from "../assets/kanban.png";
import { IoMdArrowDropdown } from "react-icons/io";

const Projects = ({ projects, toggleTheme, theme }) => {
  let [name, setName] = useState("");
  let data = useSelector((state) => state.TaskSlice);
  let [project, setProject] = useState(0);
  let [error, setError] = useState(false);
  let [addmodal, setAddmodal] = useState(false);
  let current_task = data[projects[project]] ?? [];
  let [hide, setHide] = useState(true);

  let names = projects;
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length <= 0) {
      setError(true);
    } else {
      if (!projects.includes(name)) {
        dispatch(addProject(name));
        setName("");
        setError(false);
        setAddmodal(false);
      } else {
        setError(true);
      }
    }
  };

  return (
    <>
      <div className="mt-10 flex justify-between mb-3">
        <div className="flex">
          <img src={kanban} alt="logo" className="w-9 h-9 ml-5" />
          <h1 className="text-3xl font-bold text-blue-500">Kanban</h1>
        </div>

        {projects.length != 0 && <AddTask project={projects[project]} />}
      </div>

      <div>
        <div className="container mx-auto">
          <div className="mb-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4">
            <div className="border-0 p-3">
              <button
                className={`text-lg font-bold text-gray-500 ml-3 mb-3`}
                onClick={() => setHide(!hide)}
              >
                <span>All Projects </span>({projects.length})
                <IoMdArrowDropdown className="inline font-bold text-3xl" />
              </button>
              {hide && (
                <div>
                  {projects.map((i, index) => (
                    <div
                      key={i}
                      className={`mb-2 flex flex-wrap items-center ${
                        project === index && "bg-blue-500 text-white"
                      }  p-4 rounded-r-3xl text-gray-500 `}
                    >
                      <Project
                        project={i}
                        changeProjectHover={setProject}
                        projects={names}
                      />
                      <button onClick={() => setProject(index)}>
                        <h1 className="text-lg font-semibold ml-5"> {i}</h1>
                      </button>
                    </div>
                  ))}
                  <button
                    className="rounded-xl text-gray-500 p-2 px-3 font-bold mb-3"
                    onClick={() => setAddmodal(!addmodal)}
                  >
                    +Create Project
                  </button>

                  <button
                    onClick={toggleTheme}
                    className="font-bold capitalize border-2 p-2 ml-3 rounded-3xl block"
                  >
                    {theme === "dark" ? "🌙 dark" : "🔆 light"} mode
                  </button>
                </div>
              )}

              {/* Add Project Modal */}

              {addmodal ? (
                <Modal>
                  <div id="myModal" className="modal">
                    <div className="modal-content">
                      {error && (
                        <div className="text-center text-red-500 mb-3">
                          Invalid Credential
                        </div>
                      )}
                      <div className="flex justify-between items-center mb-3">
                        <h1 className="text-xl font-bold text-gray-500">
                          Create Project
                        </h1>
                        <RxCross1
                          onClick={() => setAddmodal(false)}
                          className="cursor-pointer"
                        />
                      </div>
                      <form onSubmit={handleSubmit}>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="create project"
                          className="p-1 mr-3 border-2 mt-2 border-gray-500 rounded-xl"
                        />
                        <button
                          type="submit"
                          className="bg-blue-500 mt-2 text-white p-1 px-3 rounded-2xl"
                        >
                          Create Project
                        </button>
                      </form>
                    </div>
                  </div>
                </Modal>
              ) : null}
              {/* Add Project Modal */}
            </div>
            <Tasks
              task={current_task}
              project={projects[project]}
              theme={theme}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
