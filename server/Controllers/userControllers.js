const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Model/userModel');

const signUp = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
       
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const isPasswordMatch = await bcrypt.compare(password, user.password);
  
      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      user.tokens = user.tokens.concat({ token });
      await user.save();
 
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
 

module.exports = { signUp, login };
