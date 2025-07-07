import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
type Inputs = {
  email: string;
  checkbox: boolean;
};

const NewsletterForm2 = () => {
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
      className="rv-6-footer-nwsltr__form  rv-8-footer-nwsltr__form rv-inner-footer-nwsltr__form"
    >
      <div className="nwsltr-top">
        <input
          type="email"
          {...register("email")}
          id="rv-8-subs-form"
          placeholder="Enter your Email..."
          required
        />
        <button>
          <i className="fa-light fa-arrow-right"></i>
        </button>
      </div>
      <div className="rv-6-footer-nwsltr__checkbox">
        <input
          type="checkbox"
          id="footer-nwsltr-checkbox"
          value="1"
          {...register("checkbox")}
        />
        <label htmlFor="nwsltr-checkbox">
          {" "}
          I agree to the <a href="#">Privacy Policy</a>.
        </label>
      </div>
    </form>
  );
};

export default NewsletterForm2;
