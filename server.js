const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./routes/auth');
const exploitRoutes = require('./routes/exploit');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

//DataBase Connection
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});

app.use('/api/exploit', exploitRoutes);//Exploit Routes

app.use(express.json());
app.use('/api/auth', authRoutes);//Auth Routes

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
