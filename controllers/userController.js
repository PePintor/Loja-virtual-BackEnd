const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const SECRET_KEY = '12345'; // Chave secreta do token JWT

// Função de login
exports.loginUser = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !bcrypt.compareSync(senha, user.senha)) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Gera o token JWT
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login', error });
  }
};
