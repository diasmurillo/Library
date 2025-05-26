const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  console.log('req.body:', req.body);
  const { name, email, password, birthDate, isAdmin } = req.body;

  const today = new Date();
  const birth = new Date(birthDate);

  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  const dayDiff = today.getDate() - birth.getDate();

  const isUnder15 =
    age < 15 ||
    (age === 15 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)));

  if (isUnder15) {
    return res.status(400).json({ error: 'You must be at least 15 years old.' });
  }

  try {
    const user = await User.create({
      name,
      email,
      password,
      birthDate,
      isAdmin
    });

    console.log('User created:', user);

    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
  res.json({ _id: user._id,
  token,
  name: user.name,
  email: user.email,
  isAdmin: user.isAdmin });
};

exports.profile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};

exports.updateProfile = async (req, res) => {
  const { birthDate } = req.body;
  const user = await User.findByIdAndUpdate(req.user.id, { birthDate }, { new: true }).select('-password');
  res.json(user);
};

exports.deleteAccount = async (req, res) => {
  await User.findByIdAndDelete(req.user.id);
  res.json({ message: 'User deleted' });
};

exports.getAllUsers = async (req, res) => {
  try {
    // Buscar todos usuários, excluindo a senha
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

