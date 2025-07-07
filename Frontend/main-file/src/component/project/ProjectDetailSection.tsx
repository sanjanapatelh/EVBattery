import { projectData3 } from "../../data/Data";
import ProjectDetailSlider from "./ProjectDetailSlider";
import ProjectDetailText from "./ProjectDetailText";
import ProjectDetailFeature from "./ProjectDetailFeature";
import ProjectDetailBottomSection from "./ProjectDetailBottomSection";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";
import VideoSection2 from "../video/VideoSection2";
import { Link } from "react-router-dom";
type Props = {
  title: string;
  id: number;
};
const ProjectDetailSection = ({ title, id }: Props) => {
  const prevProject = projectData3.find((item) => item.id === id - 1);
  const nextProject = projectData3.find((item) => item.id === id + 1);
  return (
    <section className="rv-project-details rv-section-spacing">
      <div className="container">
        <ProjectDetailSlider />

        <ProjectDetailText title={title} />

        <ProjectDetailFeature />
      </div>

      <VideoSection2 innerPage />

      <div className="container">
        <ProjectDetailBottomSection />
      </div>

      <div className="container">
        <DivAnimateYAxis className="rv-project-details-bottom-navs mt-30">
          <div className="row gy-0">
            <div className="col-md-6 col-12">
              <Link
                to={prevProject ? `/projects/${prevProject.slug}` : "#"}
                className="rv-project-details-bottom-nav"
              >
                <span
                  className={`rv-project-details-bottom-nav-arrow ${
                    prevProject ? "" : "disabled-icon"
                  }`}
                >
                  <i className="fa-sharp fa-regular fa-arrow-left"></i>
                </span>
                <div className="rv-project-details-bottom-nav-txt">
                  <span className="rv-project-details-bottom-nav-subtitle">
                    Prev Project
                  </span>
                  <h4 className="rv-project-details-bottom-nav-title">
                    {prevProject ? prevProject.title : "No Prev Project"}
                  </h4>
                </div>
              </Link>
            </div>
            <div className="col-md-6 col-12 text-end">
              <Link
                to={nextProject ? `/projects/${nextProject.slug}` : "#"}
                className="rv-project-details-bottom-nav rv-project-details-bottom-nav-next justify-content-end"
              >
                <div className="rv-project-details-bottom-nav-txt">
                  <span className="rv-project-details-bottom-nav-subtitle">
                    Next Project
                  </span>
                  <h4 className="rv-project-details-bottom-nav-title">
                    {nextProject ? nextProject.title : "No Next Project"}
                  </h4>
                </div>
                <span className="rv-project-details-bottom-nav-arrow">
                  <i className="fa-sharp fa-regular fa-arrow-right"></i>
                </span>
              </Link>
            </div>
          </div>
        </DivAnimateYAxis>
      </div>
    </section>
  );
};

export default ProjectDetailSection;
