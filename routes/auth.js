const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ message: 'Usuário criado com sucesso' });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ message: 'Email ou senha inválidos' });
    }
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(400).send({ message: 'Email ou senha inválidos' });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.send({ token });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;