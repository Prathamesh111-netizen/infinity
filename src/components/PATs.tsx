import clsx from "clsx";
import { useUserData } from "../hooks";
import React from "react";
import CreatePATModal from "./CreatePAT";

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

export default function PATs() {
  const [open, setOpen] = React.useState(false);
  const { data: userData } = useUserData();
  console.log({ userData });

  return (
    <div className="bg-gray-900 py-10">
      <CreatePATModal open={open} close={() => setOpen(false)} />
      <div className="flex items-center justify-between px-4 py-4 mb-6 bg-gray-800 rounded-md">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-x-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-600 focus:ring-opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 12a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16z"
              clipRule="evenodd"
            />
          </svg>
          <span>Create a new Personal Access token to access Github</span>
        </button>
      </div>
      {userData && userData.pats && userData.pats.length > 0 && (
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
                ID
              </th>
              <th
                scope="col"
                className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell"
              >
                Personal Access Token
              </th>
              <th
                scope="col"
                className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20"
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
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {userData.pats.map((item, index) => (
              <tr key={item._id}>
                <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                  <div className="flex items-center gap-x-4">
                    <div
                      className={clsx(
                        "h-8 w-8 rounded-full ",
                        randomColors[index % randomColors.length]
                      )}
                    />
                    <div className="truncate text-sm font-medium leading-6 text-white">
                      {item._id}
                    </div>
                  </div>
                </td>
                <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8 max-w-56 scroll-m-4">
                  <div className="truncate font-mono text-sm leading-6 text-gray-400 ">
                    {item.token.substring(0, 50)}
                  </div>
                </td>
                <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8 max-w-56 scroll-m-4">
                  <div className="truncate font-mono text-sm leading-6 text-gray-400 ">
                    {item.desc.substring(0, 50)}
                  </div>
                </td>

                <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                  <div className="flex items-center justify-end gap-x-2 sm:justify-start">
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
                <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20 W-40">
                  {/* {item.duration} */}
                  <div className="flex items-center justify-center gap-x-2 ">
                    <button
                      className="text-white hover:text-indigo-400 bg-red-500 px-3 py-2 rounded-lg"
                      onClick={() => setOpen(true)}
                    >
                      delete the PAT
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
