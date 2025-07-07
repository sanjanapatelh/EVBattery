import { useParams } from "react-router-dom";
import BreadcrumbSection from "../component/breadcrumb/BreadcrumbSection";
import ErrorSection from "../component/error/ErrorSection";
import InnerLayout from "../component/layout/InnerLayout";
import VideoModal from "../component/modal/VideoModal";
import ProjectDetailSection from "../component/project/ProjectDetailSection";
import { projectData3 } from "../data/Data";

const ProjectDetailsPage = () => {
  const { projectSlug } = useParams();

  const projectInfo = projectData3.find((item) => item.slug === projectSlug);

  return (
    <main className="rv-14-body">
      <InnerLayout>
        {projectInfo ? (
          <>
            <BreadcrumbSection title="Project Details" />
            <ProjectDetailSection
              title={projectInfo.title}
              id={projectInfo.id}
            />
            <VideoModal videoUrl="https://www.youtube.com/embed/CVHj7Wxhvdo?si=oQhiG-Z_KJ6S7Bd3" />
          </>
        ) : (
          <ErrorSection />
        )}
      </InnerLayout>
    </main>
  );
};

export default ProjectDetailsPage;
