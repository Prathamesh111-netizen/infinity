import { CheckIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import React from "react";
import useStore from "../../../store";

const steps = [
  {
    id: 1,
    name: "Verify source code",
    description: "fetch the github repository",
    href: "#",
    status: "current",
    type: "Source",
  },
  {
    id: 2,
    name: "Check for dependencies",
    description: "Build docker containers or kubernetes pods",
    href: "#",
    status: "current",
    type: "TYPECHECK",
  },
  {
    id: 3,
    name: "Deployment",
    description: "Run and deploy the container",
    href: "#",
    status: "upcoming",
    type: "Deploy",
  },
];

export default function ProjectProgress() {
  const [allSteps, setAllSteps] = React.useState(steps);
  const setDeploymentLogs = useStore((state) => state.setDeploymentLogs);

  return (
    <div className="lg:border-b lg:border-t lg:border-gray-200">
      <nav
        aria-label="Progress"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <ol
          role="list"
          className="overflow-hidden rounded-md lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200"
        >
          {allSteps.map((step, stepIdx) => (
            <li
              key={step.id}
              className="relative overflow-hidden lg:flex-1"
              onClick={() => {
                if (
                  step.type === "Deploy" ||
                  step.type === "TYPECHECK" ||
                  step.type === "Source"
                )
                  setDeploymentLogs(step.type);

                setAllSteps((prev) =>
                  prev.map((s) => ({
                    ...s,
                    status:
                      s.id < step.id
                        ? "complete"
                        : s.id === step.id
                        ? "current"
                        : "upcoming",
                  })
                ));
              }}
            >
              <div
                className={clsx(
                  stepIdx === 0 ? "rounded-t-md border-b-0" : "",
                  stepIdx === steps.length - 1 ? "rounded-b-md border-t-0" : "",
                  "overflow-hidden border border-gray-200 lg:border-0"
                )}
              >
                {step.status === "complete" ? (
                  <a href={step.href} className="group">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                    />
                    <span
                      className={clsx(
                        stepIdx !== 0 ? "lg:pl-9" : "",
                        "flex items-start px-6 py-5 text-sm font-medium"
                      )}
                    >
                      <span className="flex-shrink-0">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600">
                          <CheckIcon
                            aria-hidden="true"
                            className="h-6 w-6 text-white"
                          />
                        </span>
                      </span>
                      <span className="ml-4 mt-0.5 flex min-w-0 flex-col">
                        <span className="text-sm font-medium text-white">
                          {step.name}
                        </span>
                        <span className="text-sm font-medium text-gray-500">
                          {step.description}
                        </span>
                      </span>
                    </span>
                  </a>
                ) : step.status === "current" ? (
                  <a href={step.href} aria-current="step">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-0 h-full w-1 bg-indigo-600 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                    />
                    <span
                      className={clsx(
                        stepIdx !== 0 ? "lg:pl-9" : "",
                        "flex items-start px-6 py-5 text-sm font-medium"
                      )}
                    >
                      <span className="flex-shrink-0">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-indigo-600">
                          <span className="text-white">{step.id}</span>
                        </span>
                      </span>
                      <span className="ml-4 mt-0.5 flex min-w-0 flex-col">
                        <span className="text-sm font-medium text-white">
                          {step.name}
                        </span>
                        <span className="text-sm font-medium text-gray-500">
                          {step.description}
                        </span>
                      </span>
                    </span>
                  </a>
                ) : (
                  <a href={step.href} className="group">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                    />
                    <span
                      className={clsx(
                        stepIdx !== 0 ? "lg:pl-9" : "",
                        "flex items-start px-6 py-5 text-sm font-medium"
                      )}
                    >
                      <span className="flex-shrink-0">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300">
                          <span className="text-white">{step.id}</span>
                        </span>
                      </span>
                      <span className="ml-4 mt-0.5 flex min-w-0 flex-col">
                        <span className="text-sm font-medium text-white">
                          {step.name}
                        </span>
                        <span className="text-sm font-medium text-gray-500">
                          {step.description}
                        </span>
                      </span>
                    </span>
                  </a>
                )}

                {stepIdx !== 0 ? (
                  <>
                    {/* Separator */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 left-0 top-0 hidden w-3 lg:block"
                    >
                      <svg
                        fill="none"
                        viewBox="0 0 12 82"
                        preserveAspectRatio="none"
                        className="h-full w-full text-gray-500"
                      >
                        <path
                          d="M0.5 0V31L10.5 41L0.5 51V82"
                          stroke="currentcolor"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    </div>
                  </>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
