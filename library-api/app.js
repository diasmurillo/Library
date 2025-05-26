const express = require('express');
const cors = require('cors'); 
const app = express();
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const rentalRoutes = require('./routes/rentalRoutes');

app.use(express.json());

app.use(cors()); 
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/rentals', rentalRoutes);

module.exports = app;