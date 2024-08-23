import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useStore from "../../../store";
import { useProjectData } from "../../hooks";

export default function Overview() {
  const currentSelectedProject = useStore(
    (state) => state.currentSelectedProject
  );

  const { data: ProjectDetailData } = useProjectData(
    currentSelectedProject || ""
  );

  return (
    <div>
      <h2 className="text-2xl font-bold text-white">
        {ProjectDetailData?.projectName}
      </h2>
      <p className="text-gray-400">{ProjectDetailData?.projectDescription}</p>
      <div className="flex gap-x-4 mt-4">
        <div className="max-w-md shadow-lg rounded-lg overflow-hidden">
          <div className=" py-4">
            <div className="font-bold text-xl mb-2">
              <FontAwesomeIcon icon={faGithub} className="text-xl pr-2" />
              <a
                href={ProjectDetailData?.githubLink}
                target="_blank"
                rel="noreferrer"
                className="text-white"
              >
                GitHub
              </a>
            </div>

            <p className="text-gray-400 text-base">
              {ProjectDetailData?.githubLink}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
