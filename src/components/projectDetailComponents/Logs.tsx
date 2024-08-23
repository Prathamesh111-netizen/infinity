import React from "react";
import useStore from "../../../store";
import { useProjectData } from "../../hooks";

const LogsBuilder = () => {
  const currentSelectedProject = useStore(
    (state) => state.currentSelectedProject
  );

  const { data: ProjectDetailData } = useProjectData(
    currentSelectedProject || ""
  );

  const logs =
    ProjectDetailData?.previousDeployments &&
    ProjectDetailData?.previousDeployments[0]?.deploymentLogs;

  return (
    <div className="max-h-80 overflow-y-auto" >
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
    </ div>
  );
};

export default function Logs() {
  const [logs, setLogs] = React.useState<string[]>([]);
  React.useEffect(() => {
    // fetch logs from the server
    const tempLogs = "";
  }, []);
  return (
    <div className="">
      <h1 className="text-white font-bold">Logs</h1>
      <div className="bg-black px-4 py-6 sm:px-6 lg:px-8 text-gray-100 mt-4">
        <LogsBuilder />
      </div>
    </div>
  );
}
