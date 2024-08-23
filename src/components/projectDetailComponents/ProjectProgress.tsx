import { CheckIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

const steps = [
  { name: 'Verify source code', description: 'fetch the github repository', href: '#', status: 'complete' },
  {
    name: 'Build the project',
    description: 'Build docker containers from source code.',
    href: '#',
    status: 'current',
  },
  { name: 'Testing', description: 'Run unit tests and integration tests', href: '#', status: 'upcoming' },
  { name: 'Deployment', description: 'Run and deploy the container', href: '#', status: 'upcoming' },
]

export default function ProjectProgress() {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="overflow-hidden">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={clsx(stepIdx !== steps.length - 1 ? 'pb-10' : '', 'relative')}>
            {step.status === 'complete' ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div aria-hidden="true" className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-900" />
                ) : null}
                <a href={step.href} className="group relative flex items-start">
                  <span className="flex h-9 items-center">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 group-hover:bg-gray-800">
                      <CheckIcon aria-hidden="true" className="h-5 w-5 text-white" />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col">
                    <span className="text-sm font-medium text-white">{step.name}</span>
                    <span className="text-sm text-gray-100">{step.description}</span>
                  </span>
                </a>
              </>
            ) : step.status === 'current' ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div aria-hidden="true" className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300" />
                ) : null}
                <a href={step.href} aria-current="step" className="group relative flex items-start">
                  <span aria-hidden="true" className="flex h-9 items-center">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-white">
                      <span className="h-2.5 w-2.5 rounded-full bg-white" />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col">
                    <span className="text-sm font-medium text-white">{step.name}</span>
                    <span className="text-sm text-gray-100">{step.description}</span>
                  </span>
                </a>
              </>
            ) : (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div aria-hidden="true" className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300" />
                ) : null}
                <a href={step.href} className="group relative flex items-start">
                  <span aria-hidden="true" className="flex h-9 items-center">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                      <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col">
                    <span className="text-sm font-medium text-gray-100">{step.name}</span>
                    <span className="text-sm text-gray-100">{step.description}</span>
                  </span>
                </a>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
