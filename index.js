// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB (make sure MongoDB is running)
mongoose.connect('mongodb://localhost:27017/bugtracker')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.log(err));

// Routes
const bugRoutes = require('./routes/bugRoutes');
app.use('/bugs', bugRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(5000, () => console.log('🚀 Server running on port 5000'));