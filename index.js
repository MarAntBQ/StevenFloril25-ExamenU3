const express = require('express');
const { logErrors, boomErrorHandler, errorHandler } = require('./middlewares/error.handler');
const routerApi = require('./routes'); // Importa la función routerApi

const app = express();
const port = process.env.PORT ? process.env.PORT : 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Hola, servidor de gestión de eventos y reservas');
});

// Configurar rutas usando routerApi
routerApi(app);

// Middlewares de errores
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// Levantar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});