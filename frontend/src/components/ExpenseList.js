import React from 'react';
import API from '../api';

function ExpenseList({ expenses, fetchExpenses }) {
  const handleDelete = async (id) => {
    await API.delete(`/expenses/${id}`);
    fetchExpenses();
  };

  return (
    <div>
      <h3>Transactions</h3>

      {expenses.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666' }}>
          No transactions yet
        </p>
      )}

      {expenses.map(exp => (
        <div
          key={exp.id}
          className={`expense-item ${exp.type}`}
        >
          <div>
            <strong>{exp.title}</strong>
            <div style={{ fontSize: '14px', color: '#555' }}>
              {exp.type.toUpperCase()}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <strong>₹ {exp.amount}</strong>
            <br />
            <button
              onClick={() => handleDelete(exp.id)}
              style={{
                background: '#dc2626',
                marginTop: '5px',
                padding: '4px 8px',
                fontSize: '12px'
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;
