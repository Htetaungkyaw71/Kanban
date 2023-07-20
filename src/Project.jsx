import { useDispatch } from "react-redux";
import { removeProject, renameProject } from "./redux/TaskSlice";
import { useState } from "react";

/* eslint-disable react/prop-types */
const Project = ({ project }) => {
  const [rename, setRename] = useState(project);
  const dispatch = useDispatch();
  return (
    <div>
      {" "}
      {project}
      <button
        onClick={(e) => {
          e.preventDefault();
          dispatch(removeProject(project));
        }}
      >
        Delete
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(renameProject([project, rename]));
        }}
      >
        <input
          type="text"
          value={rename}
          onChange={(e) => setRename(e.target.value)}
        />
        <button type="submit">rename</button>
      </form>
    </div>
  );
};

export default Project;
