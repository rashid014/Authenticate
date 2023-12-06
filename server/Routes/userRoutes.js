const express = require('express');
const { signUp, login } = require('../Controllers/userControllers');
const authMiddleware = require('../Middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.get('/userdetails', authMiddleware, (req, res) => {
  res.json(req.user);
});

module.exports = router;