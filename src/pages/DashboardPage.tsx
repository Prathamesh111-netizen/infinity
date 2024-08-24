import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import {
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Navigate } from "@tanstack/react-router";
import clsx from "clsx";
import { ReactElement, useState } from "react";
import useStore from "../../store";
import { Routes } from "../constants";
import Project from "../components/Projects";
import PATs from "../components/PATs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.ComponentProps<"svg">>;
  current: boolean;
  component: ReactElement;
}

const navigation: NavigationItem[] = [
  {
    name: "Project management",
    href: "#",
    icon: FolderIcon,
    current: true,
    component: <Project />,
  },
  {
    name: "Services",
    href: "#",
    icon: ServerIcon,
    current: false,
    component: <></>,
  },
  {
    name: "Personal Access tokens",
    href: "#",
    icon: GlobeAltIcon,
    current: false,
    component: <></>,
  },
  {
    name: "Settings",
    href: "#",
    icon: Cog6ToothIcon,
    current: false,
    component: <></>,
  },
];

export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navigations, setNavigations] = useState(navigation);
  const user = useStore((state) => state.user);
  const authToken = useStore((state) => state.authToken);
  const setAuthToken = useStore((state) => state.setAuthToken);

  if (!authToken) {
    return <Navigate to={Routes.Home} />;
  }

  return (
    <>
    <Toaster />
      <div className="h-screen bg-gray-900">
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-50 xl:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10">
                <div className="flex h-16 shrink-0 items-center">
                  <img
                    alt="Your Company"
                    src="/logo.png"
                    className="h-8 w-auto"
                  />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigations.map((item) => (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className={clsx(
                                item.current
                                  ? "bg-gray-800 text-white"
                                  : "text-gray-400 hover:bg-gray-800 hover:text-white",
                                "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                              )}
                              onClick={() =>
                                setNavigations((prev) =>
                                  prev.map((nav) => ({
                                    ...nav,
                                    current: nav.name === item.name,
                                  }))
                                )
                              }
                            >
                              <item.icon
                                aria-hidden="true"
                                className="h-6 w-6 shrink-0"
                              />
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>

                    <li className="-mx-6 mt-auto">
                      <a
                        href="#"
                        className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                      >
                        <img
                          alt=""
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          className="h-8 w-8 rounded-full bg-gray-800"
                        />
                        <span className="sr-only">Your profile</span>
                        <span aria-hidden="true">Tom Cook</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5">
            <div className="flex h-16 shrink-0 items-center">
              <img alt="Your Company" src="/logo.png" className="h-8 w-auto" />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigations.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={clsx(
                            item.current
                              ? "bg-gray-800 text-white"
                              : "text-gray-400 hover:bg-gray-800 hover:text-white",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                          )}
                          onClick={() =>
                            setNavigations((prev) =>
                              prev.map((nav) => ({
                                ...nav,
                                current: nav.name === item.name,
                              }))
                            )
                          }
                        >
                          <item.icon
                            aria-hidden="true"
                            className="h-6 w-6 shrink-0"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  {/* <div className="text-xs font-semibold leading-6 text-gray-400">
                    Your teams
                  </div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <a
                          href={team.href}
                          className={clsx(
                            team.current
                              ? "bg-gray-800 text-white"
                              : "text-gray-400 hover:bg-gray-800 hover:text-white",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                          )}
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul> */}
                </li>
                <li className="-mx-6 mt-auto">
                  <a
                    href="#"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                  >
                    <img
                      alt=""
                      src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                      className="h-8 w-8 rounded-full bg-gray-800"
                    />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">{user && user.username}</span>
                  </a>
                </li>
                <li>
                  <div className="flex items-center gap-x-2 mx-3 cursor-pointer" onClick={()=>{
                    toast.loading("Logging out...", { id: "logout" });
                    setTimeout(() => {
                      setAuthToken("");
                      toast.dismiss("logout");
                      toast.success("Logged out successfully");
                    }, 1000);
                  }}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="h-6 w-6 text-white my-2" />
                    <span className="text-white ml-4">Logout</span>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="xl:pl-72">
          <main className="lg:pr-96">
            <h1 className="pl-8 p-4 text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
              {navigations.find((nav) => nav.current)?.name}{" "}
            </h1>
            <div className="pl-8">
              {navigations.find((nav) => nav.current)?.name ===
                "Project management" && <Project />}
              {navigations.find((nav) => nav.current)?.name ===
                "Personal Access tokens" && <PATs />}
            </div>
            {navigations.find((nav) => nav.current)?.name === "Services" && (
              <>
                <img src="/services.png" />
              </>
            )}
            {navigations.find((nav) => nav.current)?.name === "Settings" && (
              <></>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
