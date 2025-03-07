const express = require('express');

const EventService = require('../services/event.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createEventSchema,
  getEventSchema,
} = require('../schemas/event.schema');

const router = express.Router();
const service = new EventService();

// Obtener lista de eventos
router.get('/', async (req, res, next) => {
  try {
    const events = await service.find();
    res.json(events);
  } catch (error) {
    next(error);
  }
});

// Obtener un evento por ID
router.get(
  '/:id',
  validatorHandler(getEventSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const event = await service.findOne(id);
      res.json(event);
    } catch (error) {
      next(error);
    }
  }
);

// Crear un evento
router.post(
  '/',
  validatorHandler(createEventSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newEvent = await service.create(body);
      res.status(201).json(newEvent);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
