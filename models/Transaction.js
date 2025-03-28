const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  celebridade_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Celebridade', // Referência à coleção de celebridades
    required: true,
  },
  tipo: {
    type: String,
    enum: ['recebimento', 'saque'],
    required: true,
  },
  valor: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pendente', 'aprovado', 'recusado'],
    required: true,
  },
  data_transacao: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Transaction', transactionSchema);