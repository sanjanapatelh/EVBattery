import AuthSection from "../component/auth/AuthSection";
import BreadcrumbSection from "../component/breadcrumb/BreadcrumbSection";
import InnerLayout from "../component/layout/InnerLayout";

const SignUp = () => {
  return (
    <main>
      <InnerLayout>
        <BreadcrumbSection title="Sign Up" />
        <AuthSection />
      </InnerLayout>
    </main>
  );
};

export default SignUp;
