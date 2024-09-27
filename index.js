require('dotenv').config(); // Load environment variables at the top

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const connectToMongo = require('./db');

mongoose.set('strictQuery', false);

const { getUserData } = require('./controllers/getUserData');
const { dashboardData } = require('./controllers/dashboard');
const { registerUser, loginUser } = require('./controllers/auth');
const { saveSocials, saveProfile, saveLinks } = require('./controllers/saveItems');
const { loadLinks, loadSocials } = require('./controllers/loadPrevious');

app.use(cors());
app.use(express.json());

connectToMongo();

app.post('/api/register', registerUser);
app.post('/data/dashboard', dashboardData);
app.get('/get/:handle', getUserData);
app.post("/save/socials", saveSocials);
app.post("/save/profile", saveProfile);
app.post("/save/links", saveLinks);
app.post("/load/socials", loadSocials);
app.post("/load/links", loadLinks);
app.post('/api/login', loginUser);

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send(`Server is running on port ${port}`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
