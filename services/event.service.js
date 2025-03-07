const boom = require('boom');
const { models } = require('../libs/sequelize');

class EventService {
  constructor() {}

  // Crear un evento
  async create(data) {
    const newEvent = await models.Event.create(data);
    return newEvent;
  }

  // Obtener todos los eventos
  async find() {
    const events = await models.Event.findAll();
    return events;
  }

  // Obtener un evento por ID
  async findOne(id, includeBookings = false) {
    const options = includeBookings ? { include: ['bookings'] } : {};  // Opcionalmente incluir reservas
    const event = await models.Event.findByPk(id, options);

    if (!event) {
      throw boom.notFound('Event not found');
    }
    return event;
  }
}

module.exports = EventService;
