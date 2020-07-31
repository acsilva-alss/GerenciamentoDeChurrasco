const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const authenticationRoutes = require('./routes/authenticationRoutes');

require('dotenv/config.js');
require('./database');

const app = express();

app.use(cors());
app.use(express.json());
app.use(authenticationRoutes);
app.use(userRoutes);
app.use(eventRoutes);

app.listen(process.env.PORT);