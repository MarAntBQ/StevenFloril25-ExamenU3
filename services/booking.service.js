const boom = require('boom');
const { models } = require('../libs/sequelize');

class BookingService {
  constructor() {}

  // Crear una reserva asociada a un evento
  async create(data) {
    const event = await models.Event.findByPk(data.event_id);
    if (!event) {
      throw boom.notFound('Event not found');
    }

    // Verificación adicional (opcional) para la capacidad del evento
    if (event.capacity <= 0) {
      throw boom.badRequest('Event is fully booked');
    }

    const newBooking = await models.Booking.create(data);
    return newBooking;
  }

  // Obtener todas las reservas
  async find() {
    const bookings = await models.Booking.findAll({
      include: ['event'],
    });
    return bookings;
  }

  // Obtener las reservas de un evento específico
  async findByEvent(event_id) {
    const event = await models.Event.findByPk(event_id);
    if (!event) {
      throw boom.notFound('Event not found');
    }
    const bookings = await models.Booking.findAll({
      where: { event_id },
    });
    return bookings;
  }
}

module.exports = BookingService;
