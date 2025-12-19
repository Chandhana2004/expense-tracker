import React, { useState, useEffect } from 'react';
import API from '../api';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [dark, setDark] = useState(false);

  const fetchExpenses = async () => {
    const res = await API.get('/expenses');
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const income = expenses
    .filter(e => e.type === 'income')
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const expense = expenses
    .filter(e => e.type === 'expense')
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const total = income - expense;

  return (
    <div className={dark ? 'dark' : ''}>
      {/* NAVBAR */}
      <div className="navbar">
        <h3>Expense Tracker</h3>
        <div>
          <button onClick={() => setDark(!dark)}>🌙</button>
          <button className="logout" onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="container dashboard">
        {/* SUMMARY CARDS */}
        <div className="cards">
          <div className="card total">
            <h4>Total</h4>
            <p>₹ {total}</p>
          </div>
          <div className="card income">
            <h4>Income</h4>
            <p>₹ {income}</p>
          </div>
          <div className="card expense">
            <h4>Expense</h4>
            <p>₹ {expense}</p>
          </div>
        </div>

        <ExpenseForm fetchExpenses={fetchExpenses} />
        <ExpenseList expenses={expenses} fetchExpenses={fetchExpenses} />
      </div>
    </div>
  );
}

export default Dashboard;
