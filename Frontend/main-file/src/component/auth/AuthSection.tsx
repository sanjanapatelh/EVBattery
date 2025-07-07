import DivAnimateYAxis from "../utils/DivAnimateYAxis";
import AuthForm from "../form/AuthForm";
type Props = {
  login?: boolean;
};
const AuthSection = ({ login }: Props) => {
  return (
    <section className="rv-account-form-section">
      <DivAnimateYAxis className="container">
        <div className="row justify-content-center">
          <div className="col-12 auth-container">
            <h3 className="single-form-title">
              {login ? "Log In" : "Register"}
            </h3>
            <AuthForm login={login} />
            <div className="other-option">
              <p>Or continue with</p>
              <div className="social-box d-flex justify-content-center gap-20">
                <a href="#">
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a href="#">
                  <i className="fa-brands fa-twitter"></i>
                </a>
                <a href="#">
                  <i className="fa-brands fa-google"></i>
                </a>
                <a href="#">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </DivAnimateYAxis>
    </section>
  );
};

export default AuthSection;
