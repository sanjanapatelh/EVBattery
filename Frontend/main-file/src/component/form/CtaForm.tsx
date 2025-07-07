import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
type Inputs = {
  email: string;
  checkbox: boolean;
};

const CtaForm = () => {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // Perform any additional actions before or after submitting data
    console.log(data);

    // Show a success toast
    toast.success("Subscribed successfully!");

    // Reset the form to default values
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rv-6-footer-nwsltr__form rv-14-nwsltr__form"
    >
      <div className="nwsltr-left">
        <input
          type="email"
          placeholder="Enter your Email..."
          required
          {...register("email")}
        />
        <div className="rv-6-footer-nwsltr__checkbox rv-14-nwsltr__checkbox">
          <input
            type="checkbox"
            id="nwsltr-checkbox"
            value="1"
            {...register("checkbox")}
          />
          <label htmlFor="nwsltr-checkbox">
            {" "}
            I agree to the <a href="#">Privacy Policy</a>.
          </label>
        </div>
      </div>
      <button>
        <i className="fa-light fa-paper-plane"></i>{" "}
        <span className="txt">Subscribe</span>
      </button>
    </form>
  );
};

export default CtaForm;
