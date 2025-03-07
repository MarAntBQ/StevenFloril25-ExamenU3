const express = require('express');

const BookingService = require('../services/booking.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createBookingSchema,
  getBookingSchema,
  getBookingsByEventSchema,
} = require('../schemas/booking.schema');

const router = express.Router();
const service = new BookingService();

// Obtener lista de todas las reservas
router.get('/', async (req, res, next) => {
  try {
    const bookings = await service.find();
    res.json(bookings);
  } catch (error) {
    next(error);
  }
});

// Obtener las reservas de un evento específico
router.get(
  '/event/:event_id',
  validatorHandler(getBookingsByEventSchema, 'params'),
  async (req, res, next) => {
    try {
      const { event_id } = req.params;
      const bookings = await service.findByEvent(event_id);
      res.json(bookings);
    } catch (error) {
      next(error);
    }
  }
);

// Crear una reserva asociada a un evento
router.post(
  '/',
  validatorHandler(createBookingSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newBooking = await service.create(body);
      res.status(201).json(newBooking);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
