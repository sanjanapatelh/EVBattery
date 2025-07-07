import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

type Inputs = {
  name: string;
  email: string;
  website: string;
  comment: string;
  save: boolean;
};
const CommentForm = () => {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // Perform any additional actions before or after submitting data
    console.log(data);

    // Show a success toast
    toast.success("Comment submitted successfully!");

    // Reset the form to default values
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rv-comment-form">
      <div className="row g-30">
        <div className="col-sm-6">
          <input
            type="text"
            {...register("name")}
            id="rv-commenter-name-field"
            placeholder="Name"
            required
          />
        </div>

        <div className="col-sm-6">
          <input
            type="email"
            {...register("email")}
            id="rv-commenter-email-field"
            placeholder="E-mail"
            required
          />
        </div>

        <div className="col-12">
          <input
            type="url"
            {...register("website")}
            id="rv-commenter-website"
            placeholder="Website"
            required
          />
        </div>

        <div className="col-12">
          <textarea
            {...register("comment")}
            id="rv-commenter-txt-field"
            rows={10}
            placeholder="Type your comment here"
            required
          ></textarea>
        </div>

        <div className="col-12">
          <div className="rv-comment-form__checkbox">
            <input
              type="checkbox"
              {...register("save")}
              id="rv-commenter-save-info"
            />
            <label htmlFor="rv-commenter-save-info">
              Save my name, email, and website in this browser for the next time
              I comment.
            </label>
          </div>
        </div>

        <div className="col-12">
          <button type="submit" className="rv-3-def-btn rv-inner-btn">
            Post Comment
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
