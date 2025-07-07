import BreadcrumbSection from "../component/breadcrumb/BreadcrumbSection";
import CtaSection from "../component/cta/CtaSection";
import InnerLayout from "../component/layout/InnerLayout";
import TeamSection3 from "../component/team/TeamSection3";

const TeamMembers = () => {
  return (
    <main>
      <InnerLayout>
        <BreadcrumbSection title="Team Members" />
        <TeamSection3 />
        <CtaSection inner />
      </InnerLayout>
    </main>
  );
};

export default TeamMembers;
