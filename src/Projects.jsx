/* eslint-disable react/prop-types */
import Project from "./Project";

const Projects = ({ projects }) => {
  return (
    <div>
      {projects.map((i) => (
        <div key={i}>
          <Project project={i} />
        </div>
      ))}
    </div>
  );
};

export default Projects;
