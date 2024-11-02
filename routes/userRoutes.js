const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

// Rota de cadastro de usuário
router.post('/register', (req, res) => {
  const { nome, email, senha } = req.body;
  bcrypt.hash(senha, 10, (err, hash) => {
    if (err) throw err;
    const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    db.query(sql, [nome, email, hash], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Usuário registrado!' });
    });
  });
});

// Rota de login de usuário
router.post('/login', (req, res) => {
  const { email, senha } = req.body;
  const sql = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ error: 'Usuário não encontrado' });

    bcrypt.compare(senha, results[0].senha, (err, result) => {
      if (!result) return res.status(401).json({ error: 'Senha incorreta' });
      const token = jwt.sign({ id: results[0].id }, 'seu_segredo', { expiresIn: '1h' });
      res.json({ token });
    });
  });
});

module.exports = router;