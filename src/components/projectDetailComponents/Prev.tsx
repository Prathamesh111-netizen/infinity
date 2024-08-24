import clsx from "clsx";
import useStore from "../../../store";
import { useProjectData, useUserData } from "../../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../constants";
import toast from "react-hot-toast";

const randomColors = [
  "bg-red-400",
  "bg-yellow-400",
  "bg-green-400",
  "bg-blue-400",
  "bg-indigo-400",
  "bg-purple-400",
  "bg-pink-400",
  "bg-gray-400",
  "bg-red-500",
  "bg-yellow-500",
];

export default function Prev({ seeLogsTab }: { seeLogsTab: () => void }) {
  const queryClient = useQueryClient();
  const { data: userData } = useUserData();
  const currentSelectedProject = useStore(
    (state) => state.currentSelectedProject
  );
  const setDeploymentId = useStore((state) => state.setDeploymentId);
  const setDeploymentLogs = useStore((state) => state.setDeploymentLogs);

  const { data: ProjectDetailData } = useProjectData(
    currentSelectedProject || ""
  );

  const prevDeployments: {
    deploymentId: string;
    sourceStage: string;
    typeCheckStage: string;
    deploymentStatus: string;
    updatedAt: Date;
  }[] = [];

  ProjectDetailData?.previousDeployments?.forEach((deployment) => {
    const prevRecord = prevDeployments.find(
      (prev) => prev.deploymentId === deployment.deploymentId
    );
    if (prevRecord) {
      if (deployment.deploymentType === "Source") {
        prevRecord.sourceStage = deployment.deploymentStatus;
      } else if (deployment.deploymentType === "TYPECHECK") {
        prevRecord.typeCheckStage = deployment.deploymentStatus;
      } else if (deployment.deploymentType === "Deploy") {
        prevRecord.deploymentStatus = deployment.deploymentStatus;
      }
      prevRecord.updatedAt =
        deployment.updatedAt > prevRecord.updatedAt
          ? deployment.updatedAt
          : prevRecord.updatedAt;
    } else {
      prevDeployments.push({
        deploymentId: deployment.deploymentId,
        sourceStage:
          deployment.deploymentType === "Source"
            ? deployment.deploymentStatus
            : "",
        typeCheckStage:
          deployment.deploymentType === "TYPECHECK"
            ? deployment.deploymentStatus
            : "",
        deploymentStatus:
          deployment.deploymentType === "Deploy"
            ? deployment.deploymentStatus
            : "",
        updatedAt: deployment.updatedAt,
      });
    }
  });

  return (
    <div className="bg-gray-900 py-10">
      <div>
        <button
          className="bg-green-400 text-black p-2 rounded-md ml-2"
          onClick={() => {
            toast.loading("Refreshing Data", { id: "refreshingData" });
            queryClient.invalidateQueries({
              queryKey: [queryKeys.getProject],
            });
            setTimeout(() => {
              toast.dismiss("refreshingData");
              toast.success("Data Refreshed");
            }, 1000);
          }}
        >
          <FontAwesomeIcon icon={faSync} className="mr-2" />
          Refresh Data
        </button>
      </div>
      {userData &&
        userData.projectsMeta &&
        userData.projectsMeta.length > 0 && (
          <div className="overflow-y-auto max-h-96">
            <table className="mt-6 w-full whitespace-nowrap text-left ">
              <colgroup>
                <col className="w-full sm:w-4/12" />
                <col className="lg:w-4/12" />
                <col className="lg:w-2/12" />
                <col className="lg:w-1/12" />
                <col className="lg:w-1/12" />
              </colgroup>
              <thead className="border-b border-white/10 text-sm leading-6 text-white">
                <tr>
                  <th
                    scope="col"
                    className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8"
                  >
                    Deployment Id
                  </th>
                  <th
                    scope="col"
                    className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell"
                  >
                    Source Stage
                  </th>
                  <th
                    scope="col"
                    className="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20"
                  >
                    Dependencies stage
                  </th>
                  <th
                    scope="col"
                    className="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8"
                  >
                    Deployment Stage
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {prevDeployments
                  .reverse()
                  .map((item, index) => (
                    <tr
                      key={item.deploymentId}
                      className="hover:bg-slate-800 hover:cursor-pointer"
                    >
                      <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                        <div className="flex items-center gap-x-4">
                          <div
                            className={clsx(
                              "h-8 w-8 rounded-full ",
                              randomColors[index % randomColors.length]
                            )}
                          />
                          <div className="truncate text-sm font-medium leading-6 text-white">
                            {item.deploymentId}
                          </div>
                        </div>
                      </td>

                      <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                        <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                          <div
                            className={clsx(
                              // todo`
                              item.sourceStage === "Success"
                                ? "bg-green-400"
                                : "bg-red-400",
                              "flex-none rounded-full p-1"
                            )}
                          >
                            <div className="h-1.5 w-1.5 rounded-full bg-current" />
                          </div>
                          <div className="hidden text-white sm:block">
                            {/* {item.status} */}
                            {item.sourceStage ? item.sourceStage : "Failed / NA"}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                        <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                          <div
                            className={clsx(
                              // todo`
                              item.typeCheckStage === "Success"
                                ? "bg-green-400"
                                : "bg-red-400",
                              "flex-none rounded-full p-1"
                            )}
                          >
                            <div className="h-1.5 w-1.5 rounded-full bg-current" />
                          </div>
                          <div className="hidden text-white sm:block">
                            {/* {item.status} */}
                            {item.typeCheckStage
                              ? item.typeCheckStage
                              : "Failure / NA"}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                        <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                          <div
                            className={clsx(
                              // todo`
                              item.deploymentStatus === "Success"
                                ? "bg-green-400"
                                : "bg-red-400",
                              "flex-none rounded-full p-1"
                            )}
                          >
                            <div className="h-1.5 w-1.5 rounded-full bg-current" />
                          </div>
                          <div className="hidden text-white sm:block">
                            {item.deploymentStatus
                              ? item.deploymentStatus
                              : "Failure / NA"}
                          </div>
                        </div>
                      </td>
                      <td className="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-400 sm:table-cell sm:pr-6 lg:pr-8">
                        {item.updatedAt
                          ? item.updatedAt.toLocaleString()
                          : new Date().toLocaleString()}
                        <button
                          className="bg-green-400 text-black p-2 rounded-md ml-2"
                          onClick={() => {
                            setDeploymentId(item.deploymentId);
                            setDeploymentLogs("Source");
                            seeLogsTab();
                          }}
                        >
                          See Logs
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
    </div>
  );
}
