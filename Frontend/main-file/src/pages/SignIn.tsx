import React from 'react';
import LoginForm from "../component/auth/LoginForm";
import BreadcrumbSection from "../component/breadcrumb/BreadcrumbSection";
import InnerLayout from "../component/layout/InnerLayout";

const SignIn = () => {
  return (
    <main>
      <InnerLayout>
        <BreadcrumbSection title="Sign In" />
        <div className="signin-container">
          <LoginForm />
        </div>
      </InnerLayout>
    </main>
  );
};

export default SignIn;
