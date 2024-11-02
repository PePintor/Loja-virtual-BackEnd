const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 5000;
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const authMiddleware = require('./middleware/authMiddleware');

app.use(express.json());
app.use(cors());
app.use('/api/users', userRoutes);
app.use('/api/products', authMiddleware, productRoutes);
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});