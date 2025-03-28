const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

router.post('/', async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).send(transaction);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const { tipo, status, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (tipo) {
      filter.tipo = tipo;
    }
    if (status) {
      filter.status = status;
    }
    const transactions = await Transaction.find(filter)
      .populate('celebridade_id', 'nome')
      .skip((page - 1) * limit)
      .limit(limit);
    res.send(transactions);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;