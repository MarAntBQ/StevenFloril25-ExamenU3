const express = require('express');
const eventsRouter = require('./events.router'); // Asegúrate de que esto esté correctamente importado
const bookingsRouter = require('./bookings.router'); // Asegúrate de que esto esté correctamente importado

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router); // Asegúrate de que la base URL sea "/api/v1"
  router.use('/events', eventsRouter); // Asegúrate de que la ruta de los eventos esté correcta
  router.use('/bookings', bookingsRouter); // Asegúrate de que la ruta de las reservas esté correcta
}

module.exports = routerApi;
