import clsx from "clsx";
import useStore from "../../../store";
import { useProjectData, useUserData } from "../../hooks";

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

export default function Prev() {
  const { data: userData } = useUserData();
  const currentSelectedProject = useStore(
    (state) => state.currentSelectedProject
  );
  const setSelectedProject = useStore(
    (state) => state.setCurrentSelectedProject
  );

  const { data: ProjectDetailData } = useProjectData(
    currentSelectedProject || ""
  );

  return (
    <div className="bg-gray-900 py-10">
      {userData &&
        userData.projectsMeta &&
        userData.projectsMeta.length > 0 && (
          <table className="mt-6 w-full whitespace-nowrap text-left">
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
                  Project
                </th>
                <th
                  scope="col"
                  className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8"
                >
                  Deployed at
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {ProjectDetailData && ProjectDetailData.previousDeployments?.map((item, index) => (
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
                  <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8 max-w-56 scroll-m-4">
                    <div className="truncate font-mono text-sm leading-6 text-gray-400 ">
                      {item.deploymentLogs.substring(0, 50)}
                    </div>
                  </td>

                  <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                    <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                      {/* <time
                        dateTime={item.desc}
                        className="text-gray-400 sm:hidden"
                      >
                        {item.date}
                      </time> */}
                      <div
                        className={clsx(
                          // todo`
                          item.deploymentStatus === "Success" ? "bg-green-400" : "bg-red-400",
                          "flex-none rounded-full p-1"
                        )}
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-current" />
                      </div>
                      <div className="hidden text-white sm:block">
                        {/* {item.status} */}
                        {item.deploymentStatus}
                      </div>
                    </div>
                  </td>
                  <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20">
                    {new Date().toISOString()}
                  </td>
                  <td className="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-400 sm:table-cell sm:pr-6 lg:pr-8">
                    {/* <time dateTime={item.dateTime}>{item.date}</time> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </div>
  );
}
