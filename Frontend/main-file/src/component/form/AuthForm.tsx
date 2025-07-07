import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

type Props = {
  login?: boolean;
};
type Inputs = {
  name: string;
  email: string;
  password: string;
};
const AuthForm = ({ login }: Props) => {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // Perform any additional actions before or after submitting data
    console.log(data);

    // Show a success toast
    toast.success(`${login ? "Logged In" : "Registered"}  successfully!`);

    // Reset the form to default values
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        id="login-username"
        placeholder="Username"
        type="text"
        {...register("name")}
        required
      />
      {!login && (
        <input
          id="register-email"
          placeholder="Email Address"
          type="email"
          {...register("email")}
          required
        />
      )}
      <input
        id="login-password"
        placeholder="Password"
        type="password"
        {...register("password")}
        required
      />
      <div className="sign-in-checkbox-container d-flex justify-content-between">
        {login && (
          <div className="stay-sign-in">
            <input
              id="sign-in-checkbox"
              type="checkbox"
              name="sign-in-checkbox"
            />
            <label htmlFor="sign-in-checkbox">Stay Logged in</label>
          </div>
        )}
        {login ? (
          <a className="password-recovery-btn" href="#">
            Forgot Your Password?
          </a>
        ) : (
          <div className="alternative-auth">
            <Link className="direct-to-login" to="/login">
              Click to Login
            </Link>
          </div>
        )}
      </div>
      <button type="submit" className="rv-1-banner-btn single-form-btn">
        {login ? "Log in" : "Register"}
      </button>
    </form>
  );
};

export default AuthForm;
