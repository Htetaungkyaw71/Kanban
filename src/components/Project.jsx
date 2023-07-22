import { useDispatch } from "react-redux";
import { removeProject, renameProject } from "../redux/TaskSlice";
import { useState } from "react";

import { FaTrash } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import Modal from "./Modal";
import { RxCross1 } from "react-icons/rx";

/* eslint-disable react/prop-types */
const Project = ({ project, changeProjectHover }) => {
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState(false);
  const [rename, setRename] = useState(project);
  const dispatch = useDispatch();
  return (
    <>
      <div>
        <div className="flex justify-between mt-1">
          <FaTrash
            onClick={(e) => {
              e.preventDefault();
              dispatch(removeProject(project));
              changeProjectHover(0);
            }}
            className="text-lg cursor-pointer"
          />
          <BiEdit
            onClick={() => setToggle(!toggle)}
            className="text-xl ml-2 cursor-pointer"
          />
        </div>

        {toggle ? (
          <>
            <Modal>
              <div id="myModal" className="modal">
                <div className="modal-content">
                  <div className="flex justify-between">
                    <h1 className="mb-3 text-xl font-bold text-gray-500">
                      Edit Project Name
                    </h1>
                    <RxCross1
                      onClick={() => setToggle(false)}
                      className="cursor-pointer"
                    />
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (rename.length <= 0) {
                        setError(true);
                      } else {
                        dispatch(renameProject([project, rename]));
                        setToggle(false);
                        setError(false);
                      }
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
                  {error && <div>Invalid Credential</div>}
                </div>
              </div>
            </Modal>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Project;
