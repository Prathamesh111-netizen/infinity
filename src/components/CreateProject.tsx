import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import requester from "../../requester";
import { backendRoutes, queryKeys } from "../constants";
import { useUserData } from "../hooks";
import useStore from "../../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function CreateProjectModal({
  open,
  close,
}: {
  open: boolean;
  close: () => void;
}) {
  const queryClient = useQueryClient();
  const [name, setName] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [githubLink, setGithubLink] = React.useState("");
  const authToken = useStore((state) => state.authToken);
  const { data: userData, isLoading, isError } = useUserData();
  console.log({ userData, isLoading, isError });

  const createProject = useMutation({
    mutationFn: async () => {
      toast.loading("Creating project", { id: "create-project-loading" });
      if (!userData) throw new Error("User not found");
      if (!name || !desc) throw new Error("Name and description are required");

      return await requester.post(
        backendRoutes.createProject,
        {
          projectName: name,
          projectDescription: desc,
          ownerId: userData?._id,
          githubLink,
        },
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
    },
    onSuccess: () => {
      toast.dismiss("create-project-loading");
      toast.success("Project created successfully");
    },
    onError: () => {
      toast.dismiss("create-project-loading");
      toast.error("Failed to create project");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getUser],
      });
      close();
    },
  });

  return (
    <Dialog open={open} onClose={close} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              {/* <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckIcon
                  aria-hidden="true"
                  className="h-6 w-6 text-green-600"
                />
              </div> */}
              <div className=" text-center ">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold leading-6 text-gray-900"
                >
                  Create a new project
                </DialogTitle>
              </div>
            </div>
            <div>
              <div>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="github-link"
                    name="github-link"
                    type="text"
                    placeholder="Project Name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    id="comment"
                    name="comment"
                    rows={5}
                    placeholder="Detailed description of the project"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <FontAwesomeIcon icon={faGithub} />
                  </div>
                  <input
                    value={githubLink}
                    onChange={(e) => setGithubLink(e.target.value)}
                    id="github-link"
                    name="github-link"
                    type="text"
                    placeholder="https://github.com/<user>/<repo>.git"
                    className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                onClick={() => createProject.mutate()}
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <CheckCircleIcon className="h-5 w-5 mr-2" />
                {createProject.isPending
                  ? "Creating project..."
                  : "Create project"}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
