import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useStore from "../../../store";
import { useProjectData } from "../../hooks";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import requester from "../../../requester";
import { faFolder, faHSquare, faJoint, faLink, faPlay } from "@fortawesome/free-solid-svg-icons";

export default function Overview() {
  const currentSelectedProject = useStore(
    (state) => state.currentSelectedProject
  );
  const authToken = useStore((state) => state.authToken);

  const { data: ProjectDetailData } = useProjectData(
    currentSelectedProject || ""
  );

  const startPipeline = useMutation({
    mutationFn: async () => {
      toast.loading("Starting the pipeline", { id: "startPipeline" });
      return requester.post(
        `/api/orkes/${currentSelectedProject}`,
        {},
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
    },

    onSuccess: () => {
      toast.success("Pipeline started successfully");
    },
    onError: () => {
      toast.error("Failed to start the pipeline");
    },
    onSettled: () => {
      toast.dismiss("startPipeline");
      // queryClient.invalidateQueries("projectData");
    },
  });

  return (
    <div>
      <h2 className="text-2xl font-bold text-white">
        {ProjectDetailData?.projectName}
      </h2>
      <p className="text-gray-400">{ProjectDetailData?.projectDescription}</p>
      <div className="mt-4">
        <button
          className="bg-indigo-500 text-white rounded-full py-2 px-4 mb-2 flex justify-between items-center gap-x-2"
          onClick={() => startPipeline.mutate()}
        >
          <FontAwesomeIcon icon={faPlay} />
          <p>start the pipeline</p>
        </button>
      </div>
      <div className="flex gap-x-4 mt-4">
        <div className="max-w-md shadow-lg rounded-lg overflow-hidden">
          <div className=" py-4">
            <div className="font-bold text-xl mb-2">
              <FontAwesomeIcon
                icon={faGithub}
                className="text-xl pr-2 text-gray-300"
              />
              <a
                href={ProjectDetailData?.githubLink}
                target="_blank"
                rel="noreferrer"
                className="text-white"
              >
                GitHub
              </a>
            </div>
            <p className="text-gray-400 text-base">
              {ProjectDetailData?.githubLink}
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-x-4 mt-4">
        <div className=" shadow-lg rounded-lg overflow-hidden">
          <div className=" py-4">
            <div className="font-bold text-xl mb-2">
              <FontAwesomeIcon
                icon={faLink}
                className="text-xl pr-2 text-gray-300"
              />
              <a
                href={ProjectDetailData?.githubLink}
                target="_blank"
                rel="noreferrer"
                className="text-white"
              >
                Deployed Links
              </a>
            </div>
            {ProjectDetailData?.externalPorts?.map((port) => (
              <p
                className="text-gray-400 text-base w-full cursor-pointer"
                onClick={() => {
                  window.open(
                    `http://ec2-13-233-142-101.ap-south-1.compute.amazonaws.com:${port}`
                  );
                  navigator.clipboard.writeText(
                    `http://ec2-13-233-142-101.ap-south-1.compute.amazonaws.com:${port}`
                  );
                  toast.success("Copied to clipboard");
                }}
              >
                http://ec2-13-233-142-101.ap-south-1.compute.amazonaws.com:
                {port}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
