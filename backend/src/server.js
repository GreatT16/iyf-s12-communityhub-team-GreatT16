const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => res.json({ message: 'CommunityHub IYF S12 - GreatT16 API Running!' }));
app.use('/auth', authRoutes);
app.get('/posts', async (req, res) => {
  try {
    const Post = require('./models/Post');
    const posts = await Post.find().populate('author', 'name').sort({ createdAt: -1 });
    res.json(posts);
  } catch(e) { res.status(500).json({ error: e.message }); }
});
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/communityhub')
  .then(() => {
    console.log('MongoDB Connected - GreatT16');
    app.listen(PORT, () => console.log(`Server on ${PORT}`));
  })
  .catch(err => console.error(err));
