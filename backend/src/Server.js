const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', process.env.FRONTEND_URL],
  credentials: true
}));

app.use(express.json());

app.get('/', (req,res) => res.json({ message: 'CommunityHub API - Team GreatT16 Running' }));
app.get('/api/health', (req,res) => res.json({ status: 'OK', team: 'GreatT16' }));

const PORT = process.env.PORT || 3000;
const MONGO = process.env.MONGODB_URI || 'mongodb://localhost';

if(process.env.NODE_ENV !== 'test') {
  mongoose.connect(MONGO)
    .then(() => app.listen(PORT, () => console.log(`Server on ${PORT}`)))
    .catch(err => console.log('DB Error - will still run for deploy', err.message));
}

module.exports = app;
