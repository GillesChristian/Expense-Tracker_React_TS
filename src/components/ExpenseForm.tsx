import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categories } from "../categories";

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description should be of at least 3 characters." })
    .max(50),
  amount: z
    .number({ invalid_type_error: "Amount is required." })
    .min(100.0, { message: "Amount should be at 100 cfa." }),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Category is required." }),
  }),
});
type ExpenseFormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: ExpenseFormData) => void;
}
const ExpenseForm = ({ onSubmit }: Props) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });
  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
      className="mb-5"
    >
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          id="description"
          type="text"
          className="form-control"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="Amount" className="form-label">
          Amount
        </label>
        <input
          id="Amount"
          type="number"
          className="form-control"
          {...register("amount", { valueAsNumber: true })}
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Categories
        </label>
        <select id="category" className="form-select" {...register("category")}>
          <option value=""></option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>
      <button className="btn btn-primary" type="submit">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
