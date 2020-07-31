const express = require('express');
const AuthenticationController = require('../app/controllers/authenticationController');

const authenticationRoutes = express.Router();

authenticationRoutes.post('/register', AuthenticationController.register);
authenticationRoutes.post('/authenticate', AuthenticationController.authenticate);

module.exports = authenticationRoutes;