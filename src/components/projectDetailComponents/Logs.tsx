import useStore from "../../../store";
import { useProjectData } from "../../hooks";

const LogsBuilder = () => {
  const currentSelectedProject = useStore(
    (state) => state.currentSelectedProject
  );

  const { data: ProjectDetailData } = useProjectData(
    currentSelectedProject || ""
  );

  const deploymentId = useStore((state) => state.deploymentId);
  const deploymentLogs = useStore((state) => state.deploymentLogs);

  const logs =
    ProjectDetailData?.previousDeployments &&
    ProjectDetailData.previousDeployments.find(
      (deployment) =>
        deployment.deploymentId === deploymentId &&
        deployment.deploymentType.replace("\\", "") === deploymentLogs
    )?.deploymentLogs;

  return (
    <div className="max-h-80 overflow-y-auto">
      {logs &&
        logs.split("\n").map((log, index) => {
          return (
            <>
              <p key={index} className="text-gray-400">
                {log}
              </p>
              <br />
            </>
          );
        })}
    </div>
  );
};

export default function Logs() {
  return (
    <div className="">
      <div className="bg-black px-4 py-6 sm:px-6 lg:px-8 text-gray-100 mt-4">
        <LogsBuilder />
      </div>
    </div>
  );
}
