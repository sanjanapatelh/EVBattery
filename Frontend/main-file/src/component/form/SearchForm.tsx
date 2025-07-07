import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
type Input = {
  searchTag: string;
};

const SearchForm = () => {
  const { register, handleSubmit, reset } = useForm<Input>();
  const onSubmit: SubmitHandler<Input> = (data) => {
    // Perform any additional actions before or after submitting data
    console.log(data);

    // Show a success toast
    toast.success("Searching Product!");

    // Reset the form to default values
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="search"
        id="rv-search-modal-input"
        placeholder="Search Here"
        required
        {...register("searchTag")}
      />
      <button type="submit">
        <i className="fa-regular fa-magnifying-glass"></i>
      </button>
    </form>
  );
};

export default SearchForm;
