export default function () {
  return (
    <div className="pl-8">
      <hr className="border-gray-800" />
      <div className="my-4">
        <h2 className="text-2xl font-semibold text-gray-100">Step 1</h2>
        <p className="text-gray-400">
          Create a new project by clicking on the 'Create Project' button.
        </p>
      </div>
      <div className="my-4">
        <h2 className="text-xl font-semibold text-gray-100">Step 1 (optional)</h2>
        <p className="text-gray-400">
          If github repository is private, create a personal access token
        </p>
      </div>
      <div className="my-4">
        <h2 className="text-xl font-semibold text-gray-100">Step 1 (optional)</h2>
        <p className="text-gray-400">
          Attach the personal access token to the project
        </p>
      </div>
      <hr className="border-gray-800" />
      <div className="my-4">
        <h2 className="text-xl font-semibold text-gray-100">Pipeline </h2>
        <p className="text-gray-400">
            Start the pipeline by clicking on the 'Start Pipeline' button.
        </p>
      </div>
      <div className="my-4">
        <h2 className="text-xl font-semibold text-gray-100">Docker </h2>
        <p className="text-gray-400">
            Ensure that the docker image is built successfully.
        </p>
      </div>
    </div>
  );
}
