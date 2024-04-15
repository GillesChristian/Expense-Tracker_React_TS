interface Props {
  onSelectCategory: (category: string) => void;
}

const ExpenseFilter = ({ onSelectCategory }: Props) => {
  return (
    <select
      title="."
      className="form-control mb-4"
      onChange={(event) => onSelectCategory(event.target.value)}
    >
      <option value="">All Categories</option>
      <option>Drink</option>
      <option>Food</option>
      <option>Fruit</option>
    </select>
  );
};

export default ExpenseFilter;
