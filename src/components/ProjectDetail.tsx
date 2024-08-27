import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import React from "react";
import { Toaster } from "react-hot-toast";
import useStore from "../../store";
import Logs from "./projectDetailComponents/Logs";
import Overview from "./projectDetailComponents/Overview";
import Prev from "./projectDetailComponents/Prev";
import ProjectProgress from "./projectDetailComponents/ProjectProgress";
import Share from "./projectDetailComponents/Share";
import Settings from "./projectDetailComponents/Settings";

const tabs = [
  { name: "Overview", href: "#", current: true },
  { name: "Activity", href: "#", current: false },
  { name: "Previous Runs", href: "#", current: false },
  { name: "Collaborators", href: "#", current: false },
  { name: "Settings", href: "#", current: false },
];

export default function ProjectDetail() {
  const setSelectedProject = useStore(
    (state) => state.setCurrentSelectedProject
  );
  const deploymentId = useStore((state) => state.deploymentId);

  const [alltabs, setAllTabs] = React.useState(tabs);

  return (
    <div className="max-h-screen">
      <Toaster />
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
      <div></div>
      <div>
        <div className="mx-auto w-[70vw] pl-10">
          {alltabs.find((tab) => tab.current)?.name === "Overview" && (
            <Overview />
          )}
          {alltabs.find((tab) => tab.current)?.name === "Activity" && (
            <div>
              <h1 className="text-md font-bold text-gray-300 p-2">Deployment Id  : {deploymentId}</h1>
              <div className="bg-white/5 p-6 rounded-lg flex gap-x-2 justify-between flex-col">
                <ProjectProgress />
                <Logs />
              </div>
            </div>
          )}
          {alltabs.find((tab) => tab.current)?.name === "Collaborators" && (
            <Share />
          )}
          {alltabs.find((tab) => tab.current)?.name === "Previous Runs" && (
            <Prev
              seeLogsTab={() => {
                setAllTabs((prev) =>
                  prev.map((t) => ({
                    ...t,
                    current: t.name === "Activity",
                  }))
                );
              }}
            />
          )}
          {
            alltabs.find((tab) => tab.current)?.name === "Settings" && (
              <Settings />
            )
          }
        </div>
      </div>
    </div>
  );
}
