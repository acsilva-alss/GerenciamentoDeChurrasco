const express = require('express');
const EventController = require('../app/controllers/eventController');
const authMiddleware = require('../app/middlewares/auth');

const eventRoutes = express.Router();

eventRoutes.get('/events/queryByAdministrator', authMiddleware, EventController.queryByAdministrator);
eventRoutes.get('/events/queryAll', authMiddleware, EventController.queryAll);
eventRoutes.get('/events/:eventId/query', authMiddleware, EventController.query)
eventRoutes.post('/events/store', authMiddleware, EventController.store);
eventRoutes.put('/events/:eventId/edit', authMiddleware, EventController.edit);
eventRoutes.delete('/events/:eventId/delete', authMiddleware, EventController.delete);

module.exports = eventRoutes;