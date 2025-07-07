import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
type Input = {
  coupon: string;
};

const CouponForm = () => {
  const { register, handleSubmit, reset } = useForm<Input>();
  const onSubmit: SubmitHandler<Input> = (data) => {
    // Perform any additional actions before or after submitting data
    console.log(data);

    // Show a success toast
    toast.success("Cuopon applied successfully!");

    // Reset the form to default values
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="cart-coupon-form">
      <input
        type="text"
        id="cart-coupon-input"
        placeholder="Enter Your Coupon Code"
        required
        {...register("coupon")}
      />
      <button type="submit" className="rv-1-banner-btn coupon-apply-btn">
        Apply Coupon
      </button>
    </form>
  );
};

export default CouponForm;
