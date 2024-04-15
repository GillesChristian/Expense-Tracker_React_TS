import "./App.css";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import { useState } from "react";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState([
    { id: 1, description: "Milk", amount: 500, category: "Drink" },
    { id: 2, description: "Bread", amount: 300, category: "Food" },
    { id: 3, description: "Apples", amount: 200, category: "Fruit" },
    { id: 4, description: "Pepsi", amount: 600, category: "Drink" },
    { id: 5, description: "Eggs", amount: 250, category: "Food" },
  ]);
  const handleDelete = (id: number) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };
  const visibleExpenses = selectedCategory
    ? expenses.filter((exp) => selectedCategory === exp.category)
    : expenses;
  return (
    <>
      <NavBar />
      <div className="app">
        <div className="app-content">
          <div className="expense-form">
            <ExpenseForm
              onSubmit={(newExpense) =>
                setExpenses([
                  ...expenses,
                  { ...newExpense, id: expenses.length + 1 },
                ])
              }
            />
          </div>
          <div className="expense-list">
            <ExpenseFilter
              onSelectCategory={(category) => setSelectedCategory(category)}
            />
            <ExpenseList expenses={visibleExpenses} onDelete={handleDelete} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
