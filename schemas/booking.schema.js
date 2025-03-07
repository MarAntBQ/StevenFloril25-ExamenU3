const Joi = require('joi');

const id = Joi.string().uuid();
const event_id = Joi.string().uuid().required();
const user_email = Joi.string().email().max(100).required();
const num_tickets = Joi.number().integer().min(1).required();

const createBookingSchema = Joi.object({
  event_id,
  user_email,
  num_tickets,
});

const getBookingSchema = Joi.object({
  id: id.required(),
});

const getBookingsByEventSchema = Joi.object({
  event_id: event_id.required(),
});

module.exports = {
  createBookingSchema,
  getBookingSchema,
  getBookingsByEventSchema,
};
