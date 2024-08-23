import React from "react";
import useStore from "../../store";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { useProjectData } from "../hooks";
import ProjectProgress from "./projectDetailComponents/ProjectProgress";
import Logs from "./projectDetailComponents/Logs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Overview from "./projectDetailComponents/Overview";
import Share from "./projectDetailComponents/Share";
import Prev from "./projectDetailComponents/Prev";
import { useMutation } from "@tanstack/react-query";
import requester from "../../requester";
import toast from "react-hot-toast";

const tabs = [
  { name: "Overview", href: "#", current: true },
  { name: "Activity", href: "#", current: false },
  { name: "Previous Runs", href: "#", current: false },
  { name: "Collaborators", href: "#", current: false },
  { name: "Notifications", href: "#", current: false },
];

export default function ProjectDetail() {
  const currentSelectedProject = useStore(
    (state) => state.currentSelectedProject
  );
  const authToken = useStore((state) => state.authToken);
  const setSelectedProject = useStore(
    (state) => state.setCurrentSelectedProject
  );

  const { data: ProjectDetailData } = useProjectData(
    currentSelectedProject || ""
  );

  const [alltabs, setAllTabs] = React.useState(tabs);

  const startPipeline = useMutation({
    mutationFn: async () => {
      toast.loading("Starting the pipeline");
      return requester.post(`/api/orkes/${currentSelectedProject}`, {
      }, {
        headers: {
          Authorization: authToken,
        },
      });
    },

    onSuccess: () => {
      toast.success("Pipeline started successfully");
    },
    onError: () => {
      toast.error("Failed to start the pipeline");
    },
    onSettled: () => {
      // queryClient.invalidateQueries("projectData");
    },
  });

  return (
    <div>
      <button
        onClick={() => setSelectedProject(null)}
        className="py-2 text-white rounded-full flex justify-center gap-x-2 items-center"
      >
        <ChevronLeftIcon className="h-6 w-6" />
        Return to all Projects
      </button>
      <div className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Select a tab
            </label>
            <select
              id="tabs"
              name="tabs"
              defaultValue={alltabs.find((tab) => tab.current)?.name}
              className="block w-full rounded-md border-none bg-white/5 py-2 pl-3 pr-10 text-base text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm"
            >
              {alltabs.map((tab) => (
                <option
                  key={tab.name}
                  onClick={() => {
                    setAllTabs((prev) =>
                      prev.map((t) => ({
                        ...t,
                        current: t.name === tab.name,
                      }))
                    );
                  }}
                >
                  {tab.name}
                </option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <nav className="flex border-b border-white/10 py-4">
              <ul
                role="list"
                className="flex min-w-full flex-none gap-x-6 px-2 text-sm font-semibold leading-6 text-gray-400"
              >
                {alltabs.map((tab) => (
                  <li key={tab.name}>
                    <a
                      href={tab.href}
                      className={
                        tab.current
                          ? "text-indigo-400 bg-gray-800 p-2 rounded-md"
                          : ""
                      }
                      onClick={() => {
                        console.log("clicked");
                        setAllTabs((prev) =>
                          prev.map((t) => ({
                            ...t,
                            current: t.name === tab.name,
                          }))
                        );
                      }}
                    >
                      {tab.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-2xl font-bold text-white">
              Deployment
            </h1>
            <p className="text-white">{"http://ec2-13-233-142-101.ap-south-1.compute.amazonaws.com:81/"}</p>
          </div>
        </div>
      </div>
      <div>
        <div className="mx-auto w-[70vw] pl-10">
          {alltabs.find((tab) => tab.current)?.name === "Overview" && (
            <Overview />
          )}
          {alltabs.find((tab) => tab.current)?.name === "Activity" && (
            <div>
              <button className="bg-indigo-500 text-white rounded-full py-2 px-4 mb-2 flex justify-between items-center gap-x-2" onClick={()=>startPipeline.mutate()}>
                <FontAwesomeIcon icon={faPlay} />
                <p>start the pipeline</p>
              </button>
              <div className="bg-white/5 p-6 rounded-lg flex gap-x-2 justify-between">
                <div className="w-1/2">
                  <ProjectProgress />
                </div>
                <div className="w-1/2">
                  <Logs />
                </div>
              </div>
            </div>
          )}
          {alltabs.find((tab) => tab.current)?.name === "Collaborators" && <Share />}
          {alltabs.find((tab) => tab.current)?.name === "Previous Runs" && <Prev />}
        </div>
      </div>
    </div>
  );
}
