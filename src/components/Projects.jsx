/* eslint-disable react/prop-types */
import Project from "./Project";
import { useState } from "react";
import { addProject } from "../redux/TaskSlice";
import { useDispatch, useSelector } from "react-redux";
import AddTask from "./AddTask";
import Tasks from "./Tasks";
import Modal from "./Modal";
import { RxCross1 } from "react-icons/rx";

const Projects = ({ projects }) => {
  let [name, setName] = useState("");
  let data = useSelector((state) => state.TaskSlice);
  let [project, setProject] = useState(0);
  let [addmodal, setAddmodal] = useState(false);
  let current_task = data[projects[project]] ?? [];

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProject(name));
    setName("");
  };

  return (
    <>
      <div className="mt-10 flex justify-between mb-3">
        <h1 className="text-3xl font-bold">Kanban</h1>
        {projects.length != 0 && <AddTask project={projects[project]} />}
      </div>

      <div>
        <div className="container mx-auto">
          <div className="mb-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4">
            <div className="border-2 p-3">
              <h1 className="text-lg font-bold text-gray-500 ml-3 mb-3">
                Projects ({projects.length})
              </h1>
              {projects.map((i, index) => (
                <div
                  key={i}
                  className={`mb-2 flex flex-wrap items-center ${
                    project === index && "bg-gray-500 text-white"
                  }  p-4 rounded-r-xl`}
                >
                  <Project project={i} />
                  <button onClick={() => setProject(index)}>
                    <h1 className="text-lg font-bold ml-5"> {i}</h1>
                  </button>
                </div>
              ))}

              {/* Add Project Modal */}
              <button
                className="rounded-xl text-gray-500 p-2 px-3 font-bold mb-3"
                onClick={() => setAddmodal(!addmodal)}
              >
                +Add Project
              </button>
              {addmodal ? (
                <Modal>
                  <div id="myModal" className="modal">
                    <div className="modal-content">
                      <div className="flex justify-between">
                        <h1 className="mb-3 text-xl font-bold text-gray-500">
                          Add Project
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
                    </div>
                  </div>
                </Modal>
              ) : null}
              {/* Add Project Modal */}
            </div>
            <Tasks task={current_task} project={projects[project]} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
