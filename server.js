const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions'); // Importe as rotas de transações

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/auth', authRoutes);
app.use('/transactions', transactionRoutes); // Use as rotas de transações

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});