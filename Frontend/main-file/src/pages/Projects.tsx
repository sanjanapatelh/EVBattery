import BreadcrumbSection from "../component/breadcrumb/BreadcrumbSection";
import CtaSection from "../component/cta/CtaSection";
import InnerLayout from "../component/layout/InnerLayout";
import ProjectSection3 from "../component/project/ProjectSection3";

const Projects = () => {
  return (
    <main>
      <InnerLayout>
        <BreadcrumbSection title="Projects" />
        <ProjectSection3 />
        <CtaSection inner />
      </InnerLayout>
    </main>
  );
};

export default Projects;
