import { useDispatch } from "react-redux";
import { removeProject, renameProject } from "../redux/TaskSlice";
import { useState } from "react";

import { FaTrash } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";

/* eslint-disable react/prop-types */
const Project = ({ project }) => {
  const [toggle, setToggle] = useState(false);
  const [rename, setRename] = useState(project);
  const dispatch = useDispatch();
  return (
    <>
      <div>
        <div className="flex items-center">
          <div className="flex justify-between mt-1">
            <FaTrash
              onClick={(e) => {
                e.preventDefault();
                dispatch(removeProject(project));
              }}
              className="text-lg"
            />
            <BiEdit
              onClick={() => setToggle(!toggle)}
              className="text-xl ml-2"
            />
          </div>

          <h1 className="text-2xl font-bold text-cyan-800 ml-5"> {project}</h1>
        </div>

        {toggle ? (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(renameProject([project, rename]));
              }}
              className="mt-2"
            >
              <input
                type="text"
                value={rename}
                onChange={(e) => setRename(e.target.value)}
                className="p-1 mr-3 border-2 border-gray-500 rounded-sm"
              />
              <button
                type="submit"
                className="bg-gray-500 text-white p-1 px-2 rounded-sm"
              >
                rename
              </button>
            </form>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Project;
