const express = require('express');
const UserController = require('../app/controllers/userController');
const authMiddleware = require('../app/middlewares/auth');

const userRoutes = express.Router();

userRoutes.get('/users/queryAll', authMiddleware, UserController.queryAll);
userRoutes.get('/users/query', authMiddleware, UserController.query);
userRoutes.put('/users/edit', authMiddleware, UserController.edit);
userRoutes.post('/users/store', authMiddleware, UserController.store);
userRoutes.delete('/user/delete', authMiddleware, UserController.delete);

module.exports = userRoutes;