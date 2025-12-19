import React, { useState } from 'react';
import API from '../api';

function ExpenseForm({ fetchExpenses }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await API.post('/expenses', {
      title,
      amount: Number(amount),   // ✅ FIX
      type
    });

    setTitle('');
    setAmount('');
    fetchExpenses();

  } catch (err) {
    console.error(err.response?.data || err.message);
    alert('Failed to add expense');
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <input placeholder="Amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} required />
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
}

export default ExpenseForm;
