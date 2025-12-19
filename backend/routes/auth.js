const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const db = require('../config/db');
const router = express.Router();

// ----------------------
// REGISTER
// ----------------------
router.post(
  '/register',
  // Validation rules
  body('email').isEmail().withMessage('Invalid email'),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/).withMessage('Must contain at least one uppercase letter')
    .matches(/[a-z]/).withMessage('Must contain at least one lowercase letter')
    .matches(/\d/).withMessage('Must contain at least one number')
    .matches(/[\W_]/).withMessage('Must contain at least one special character'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;

    // Check if user already exists
    db.query('SELECT * FROM users WHERE email=?', [email], async (err, result) => {
      if (err) return res.status(500).json({ msg: 'Database error' });
      if (result.length > 0) return res.status(400).json({ msg: 'Email already registered' });

      // Hash password and save
      const hashed = await bcrypt.hash(password, 10);
      db.query('INSERT INTO users (name, email, password) VALUES (?,?,?)', [name, email, hashed], (err) => {
        if (err) return res.status(500).json({ msg: 'Error registering user' });
        res.json({ msg: 'Registered successfully' });
      });
    });
  }
);

// ----------------------
// LOGIN
// ----------------------
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email=?', [email], async (err, result) => {
    if (err) return res.status(500).json({ msg: 'Database error' });
    if (!result || result.length === 0) return res.status(400).json({ msg: 'User not found' });

    const valid = await bcrypt.compare(password, result[0].password);
    if (!valid) return res.status(400).json({ msg: 'Wrong password' });
    
    const token = jwt.sign(
  { id: result[0].id },
  process.env.JWT_SECRET,
  { expiresIn: '1d' }
);
    res.json({ token, name: result[0].name });
  });
});

module.exports = router;
