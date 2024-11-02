const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('../db');

const upload = multer({ storage: multer.memoryStorage() });

// Rota para adicionar um produto
router.post('/products', upload.single('imagem'), (req, res) => {
  const { nome, descricao, valor, quantidade } = req.body;
  const imagem = req.file.buffer;
  const sql = 'INSERT INTO produtos (nome, descricao, imagem, valor, quantidade) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [nome, descricao, imagem, valor, quantidade], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Produto adicionado!' });
  });
});

// Rota para listar todos os produtos
router.get('/products', (req, res) => {
  const sql = 'SELECT * FROM produtos';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

module.exports = router;
