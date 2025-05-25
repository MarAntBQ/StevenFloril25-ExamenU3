# Sistema de Gestión de Eventos y Reservas

Este proyecto es una API REST para la gestión de eventos y reservas, construida con Node.js, Express y PostgreSQL (usando Sequelize como ORM).

## Requisitos previos

- Node.js (v14 o superior)
- Docker y Docker Compose
- PostgreSQL

## Configuración inicial

1. Clona este repositorio:
```bash
git clone [url-del-repositorio]
cd [nombre-del-directorio]
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
El archivo `.env` ya contiene la configuración básica:
```
PORT=
DB_USER=
DB_PASS=
DB_HOST=
DB_NAME=
DB_PORT=
```

4. Inicia la base de datos con Docker Compose:
```bash
docker-compose up -d
```

5. Ejecuta las migraciones:
```bash
npx sequelize-cli db:migrate
```

6. Inicia el servidor:
```bash
npm start
```

## Estructura del proyecto

```
├── config/             # Configuración de Sequelize
├── migrations/         # Migraciones de la base de datos
├── models/             # Modelos de Sequelize
├── routes/             # Rutas Express
├── services/           # Lógica de negocio
├── schemas/            # Esquemas de validación (Joi)
├── middlewares/        # Middlewares Express
├── libs/               # Utilidades y configuraciones
├── .env                # Variables de entorno
├── docker-compose.yml  # Configuración Docker
└── index.js            # Punto de entrada de la aplicación
```

## API Endpoints

### Eventos

#### Obtener todos los eventos
- **Método**: GET
- **URL**: `/api/v1/events`
- **Respuesta**: Lista de eventos

#### Obtener un evento por ID
- **Método**: GET
- **URL**: `/api/v1/events/:id`
- **Respuesta**: Detalles del evento con el ID especificado

#### Crear un nuevo evento
- **Método**: POST
- **URL**: `/api/v1/events`
- **Body**:
```json
{
  "name": "Nombre del evento",
  "description": "Descripción del evento",
  "date": "2025-04-15T18:00:00.000Z",
  "capacity": 500
}
```
- **Respuesta**: Evento creado con ID asignado

### Reservas

#### Obtener todas las reservas
- **Método**: GET
- **URL**: `/api/v1/bookings`
- **Respuesta**: Lista de todas las reservas

#### Obtener reservas por evento
- **Método**: GET
- **URL**: `/api/v1/bookings/event/:event_id`
- **Respuesta**: Lista de reservas para el evento especificado

#### Crear una nueva reserva
- **Método**: POST
- **URL**: `/api/v1/bookings`
- **Body**:
```json
{
  "event_id": "UUID-del-evento",
  "user_email": "usuario@ejemplo.com",
  "num_tickets": 2
}
```
- **Respuesta**: Reserva creada con ID asignado

## Modelos de datos

### Evento (Event)
- `id`: UUID, clave primaria
- `name`: String, nombre del evento
- `description`: Text, descripción del evento
- `date`: Date, fecha y hora del evento
- `capacity`: Integer, capacidad máxima del evento
- `created_at`: DateTime, fecha de creación del registro
- `updated_at`: DateTime, fecha de última actualización

### Reserva (Booking)
- `id`: UUID, clave primaria
- `event_id`: UUID, clave foránea referenciando a eventos
- `user_email`: String, email del usuario que reserva
- `num_tickets`: Integer, número de entradas reservadas
- `created_at`: DateTime, fecha de creación del registro
- `updated_at`: DateTime, fecha de última actualización

## Herramientas de administración

- **pgAdmin**: Disponible en `http://localhost:5050`
  - Email: espe@mail.com
  - Password: espe

## Solución de problemas comunes

- **No se pueden conectar los endpoints**: Verificar que el servidor esté corriendo y que las URLs sigan el formato `/api/v1/...`
- **Error en validaciones**: Revisar que los datos enviados cumplan con los esquemas definidos en Joi
- **Problemas con la base de datos**: Comprobar que los contenedores Docker estén funcionando correctamente
