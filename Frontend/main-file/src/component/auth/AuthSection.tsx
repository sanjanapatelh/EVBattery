import DivAnimateYAxis from "../utils/DivAnimateYAxis";
import AuthForm from "../form/AuthForm";
import { useState } from "react";

type Props = {
  login?: boolean;
};

const AuthSection = ({ login }: Props) => {
  const [userType, setUserType] = useState("");

  return (
    <section className="rv-account-form-section">
      <DivAnimateYAxis className="container">
        <div className="row justify-content-center">
          <div className="col-12 auth-container">
            <h3 className="single-form-title">
              {login ? "Log In" : "Register"}
            </h3>
            
            {!login && (
              <div className="user-type-selection mb-3">
                <select
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  className="form-select user-type-dropdown"
                  required
                >
                  <option value="">Select User Type</option>
                  <option value="ev-manufacturer">EV Manufacturer</option>
                  <option value="battery-manufacturer">Battery Manufacturer</option>
                  <option value="ev-consumer">EV Consumer</option>
                  <option value="recycler">Recycler</option>
                </select>
              </div>
            )}
            
            <AuthForm login={login} userType={userType} />
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
