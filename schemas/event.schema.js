const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().max(100).required();
const description = Joi.string().required();
const date = Joi.date().required();
const capacity = Joi.number().integer().min(1).required();

const createEventSchema = Joi.object({
  name,
  description,
  date,
  capacity,
});

const getEventSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createEventSchema,
  getEventSchema,
};
