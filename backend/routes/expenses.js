const express = require('express');
const db = require('../config/db');
const auth = require('../middleware/auth');
const router = express.Router();

// Get expenses
router.get('/', auth, (req, res) => {
    const userId = req.user.id;
  db.query(
    'SELECT * FROM expenses WHERE user_id = ?',
    [userId],
    (err, results) => {
      if (err) 
        {
            console.error(err);
            return res.status(500).json({msg: 'Database error'});
        }
      res.json(results);
    }
  );
});

// Add expense
router.post('/', auth, (req, res) => {
  const { title, amount, type } = req.body;
  const userId = req.user.id;

  db.query(
    'INSERT INTO expenses (user_id, title, amount, type) VALUES (?,?,?,?)',
    [userId, title, amount, type],
    (err) => {
      if (err) 
        {
            console.error(err);
            return res.status(500).json({msg: 'Database error'});
        }
      res.json({ msg: 'Expense added' });
    }
  );
});


// Update expense
router.put('/:id', auth, (req, res) => {
  const { title, amount } = req.body;
  db.query('UPDATE expenses SET title=?, amount=? WHERE id=? AND user_id=?', [title, amount, req.params.id, req.user.id], (err) => {
    if (err) return res.status(400).json({ msg: 'Error updating expense' });
    res.json({ msg: 'Updated' });
  });
});

// Delete expense
router.delete('/:id', auth, (req, res) => {
  db.query('DELETE FROM expenses WHERE id=? AND user_id=?', [req.params.id, req.user.id], (err) => {
    if (err) return res.status(400).json({ msg: 'Error deleting expense' });
    res.json({ msg: 'Deleted' });
  });
});

module.exports = router;
