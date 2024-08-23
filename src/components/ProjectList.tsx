import clsx from "clsx";
import { useUserData } from "../hooks";
import React from "react";
import ProjectDetail from "./ProjectDetail";
import useStore from "../../store";

// const statuses = {
//   Completed: "text-green-400 bg-green-400/10",
//   Error: "text-rose-400 bg-rose-400/10",
// };

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

export default function Example() {
  const { data: userData } = useUserData();
  const setSelectedProject = useStore(
    (state) => state.setCurrentSelectedProject
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
                  className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20"
                >
                  Latest Commit
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
              {userData.projectsMeta.map((item, index) => (
                <tr
                  key={item._id}
                  className="hover:bg-slate-800 hover:cursor-pointer"
                  onClick={() => setSelectedProject(item._id)}
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
                        {item.name}
                      </div>
                    </div>
                  </td>
                  <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8 max-w-56 scroll-m-4">
                    <div className="truncate font-mono text-sm leading-6 text-gray-400 ">
                      {item.desc.substring(0, 50)}
                    </div>
                  </td>
                  <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                    <div className="flex gap-x-3">
                      <div className="font-mono text-sm leading-6 text-gray-400">
                        {item.name}
                      </div>
                      <div className="rounded-md bg-gray-700/40 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-white/10">
                        {item.name}
                      </div>
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
                          "text-green-400 bg-green-400/10",
                          "flex-none rounded-full p-1"
                        )}
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-current" />
                      </div>
                      <div className="hidden text-white sm:block">
                        {/* {item.status} */}
                        Completed
                      </div>
                    </div>
                  </td>
                  <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20">
                    {/* {item.duration} */}
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
