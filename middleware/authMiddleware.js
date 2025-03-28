const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findOne({ _id: decoded._id });
    if (!req.user) {
      throw new Error();
    }
    next();
  } catch (error) {
    res.status(401).send({ message: 'Por favor, autentique-se' });
  }
};

module.exports = authMiddleware;