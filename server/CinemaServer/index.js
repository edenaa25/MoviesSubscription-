const express = require('express');
const cors = require('cors');
const path = require('path');

const authenticateToken = require('./middleware/authenticateToken');
const userLogInController = require('./controllers/authController');
const usersController = require("./controllers/usersController");
const moviesController = require("./controllers/movieController")
const subscriptionsController = require("./controllers/subscriptionsController")

const app = express();
const PORT = 8001;

require('./DBconfigs/dadabase')

app.use(express.json());
app.use(cors());

app.use('/login', userLogInController);
app.use('/users', authenticateToken, usersController);
app.use('/movies', authenticateToken, moviesController);
app.use('/subscriptions', authenticateToken, subscriptionsController);

app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
});