import React from "react";
import { Toaster } from "react-hot-toast";
import CreateProjectModal from "./CreateProject";
import ProjectList from "./ProjectList";
import useStore from "../../store";
import ProjectDetail from "./ProjectDetail";

export default function Project() {
  const [createProjectModalOpen, setCreateProjectModalOpen] =
    React.useState(false);
  const currentSelectedProject = useStore(
    (state) => state.currentSelectedProject
  );
  console.log({currentSelectedProject});

  return (
    <>
      {!currentSelectedProject ? (
        <div>
          <Toaster />
          <CreateProjectModal
            open={createProjectModalOpen}
            close={() => setCreateProjectModalOpen(false)}
          />
          <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
          <button
            type="button"
            onClick={() => {
              setCreateProjectModalOpen(true);
            }}
            className="relative block w-96 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <div className="flex justify-center">
              <svg
                width="60px"
                height="60px"
                viewBox="0 0 512 512"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                fill="#9CA3AF"
                stroke="#9CA3AF"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <title>project-new</title>{" "}
                  <g
                    id="Page-1"
                    stroke-width="0.00512"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    {" "}
                    <g
                      id="Combined-Shape"
                      fill="#9CA3AF"
                      transform="translate(64.000000, 34.346667)"
                    >
                      {" "}
                      <path d="M192,-7.10542736e-15 L384,110.851252 L384,242.986 L341.333,242.986 L341.333,157.655 L213.333,231.555 L213.333,431.088 L192,443.405007 L0,332.553755 L0,110.851252 L192,-7.10542736e-15 Z M341.333333,264.32 L341.333,328.32 L405.333333,328.32 L405.333333,370.986667 L341.333,370.986 L341.333333,434.986667 L298.666667,434.986667 L298.666,370.986 L234.666667,370.986667 L234.666667,328.32 L298.666,328.32 L298.666667,264.32 L341.333333,264.32 Z M42.666,157.654 L42.6666667,307.920144 L170.666,381.82 L170.666,231.555 L42.666,157.654 Z M192,49.267223 L66.1333333,121.936377 L192,194.605531 L317.866667,121.936377 L192,49.267223 Z">
                        {" "}
                      </path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
            </div>
            <span className="mt-2 block text-lg font-semibold text-white">
              Create a new fresh project
            </span>
          </button>
          <div>
            <ProjectList />
          </div>
        </div>
      ) : (
        <ProjectDetail/>
      )}
    </>
  );
}
