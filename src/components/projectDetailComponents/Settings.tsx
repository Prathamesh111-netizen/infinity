import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faSave, faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import requester from "../../../requester";
import useStore from "../../../store";
import { useProjectData, useUserData } from "../../hooks";
import { queryKeys } from "../../constants";

export default function Settings() {
  const queryClient = useQueryClient();
  const currentSelectedProject = useStore(
    (state) => state.currentSelectedProject
  );

  const { data: ProjectDetailData } = useProjectData(
    currentSelectedProject || ""
  );

  const [newProjectName, setNewProjectName] = React.useState(
    ProjectDetailData?.projectName || ""
  );
  const [newProjectDescription, setNewProjectDescription] = React.useState(
    ProjectDetailData?.projectDescription || ""
  );
  const [newGithubLink, setNewGithubLink] = React.useState(
    ProjectDetailData?.githubLink || ""
  );
  const [newPersonalAccessToken, setNewPersonalAccessToken] = React.useState(
    ProjectDetailData?.patAttached || ""
  );
  const { data: user } = useUserData();

  const updateTheProject = useMutation({
    mutationFn: async () => {
      toast.loading("Updating the project", { id: "updateTheProject" });
      console.log("Updating the project");
      console.log({
        newProjectName,
        newProjectDescription,
        newGithubLink,
        newPersonalAccessToken,
      });

      return await requester.put(
        `/api/project/edit/${currentSelectedProject}`,
        {
          newProjectName,
          newProjectDescription,
          newGithubLink,
          newPersonalAccessToken,
        },
        {
          headers: {
            Authorization: useStore.getState().authToken,
          },
        }
      );
    },
    onSuccess: () => {
      toast.success("Project updated successfully");
    },
    onError: () => {
      toast.error("Failed to update the project");
    },
    onSettled: () => {
      toast.dismiss("updateTheProject");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getProject, currentSelectedProject],
      });
    },
  });

  return (
    <div>
      <Toaster />
      <div className="flex items-baseline gap-x-8">
        <h1 className="text-2xl font-bold text-white">Edit the settings</h1>
        <button
          className="bg-indigo-500 text-white rounded-md py-2 px-2 mb-2 flex items-center gap-x-2"
          onClick={() => updateTheProject.mutate()}
        >
          <FontAwesomeIcon icon={faSave} />
          <p>Save the changes</p>
        </button>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-bold text-gray-300">Project Name</h2>
        <input
          className="bg-inherit text-white rounded-md border-0"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-bold text-gray-300">Project Description</h2>
        <textarea
          className="bg-inherit text-white rounded-md border-0 w-full"
          value={newProjectDescription}
          onChange={(e) => setNewProjectDescription(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-x-2">
          <FontAwesomeIcon icon={faGithub} className="text-gray-300" />
          <h2 className="text-lg font-bold text-gray-300">Github Link</h2>
        </div>
        <input
          className="bg-inherit text-white rounded-md border-0 w-full"
          value={newGithubLink}
          onChange={(e) => setNewGithubLink(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-x-2">
          <FontAwesomeIcon icon={faUserSecret} className="text-gray-300" />
          <h2 className="text-lg font-bold text-gray-300">
            Personal Access token
          </h2>
        </div>
        <div>
          <select
            value={newPersonalAccessToken || ""}
            onChange={(e) => setNewPersonalAccessToken(e.target.value)}
            className="mt-2 block w-64 rounded-md border-0 py-1.5 pl-3 pr-10 text-white ring-1 ring-inset ring-gray-300 focus:ring-2 bg-inherit sm:text-sm sm:leading-6"
          >
            {user?.pats?.map((pat, index) => (
              <option key={index} value={pat.token} className="text-gray-900">
                {pat.desc}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
