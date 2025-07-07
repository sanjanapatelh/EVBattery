import AuthSection from "../component/auth/AuthSection";
import BreadcrumbSection from "../component/breadcrumb/BreadcrumbSection";
import InnerLayout from "../component/layout/InnerLayout";

const SignIn = () => {
  return (
    <main>
      <InnerLayout>
        <BreadcrumbSection title="Sign In" />
        <AuthSection login />
      </InnerLayout>
    </main>
  );
};

export default SignIn;
