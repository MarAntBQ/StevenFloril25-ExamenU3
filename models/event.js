'use strict';
const { Sequelize, Model, DataTypes } = require('sequelize');

class Event extends Model {
  // Método de asociación
  static associate(models) {
    // Relación: Un evento tiene muchas reservas
    this.hasMany(models.Booking, {
      as: 'bookings',
      foreignKey: 'event_id'
    });
  }
  
  // Método init para inicializar el modelo
  static init(sequelize) {
    super.init({
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    }, {
      sequelize,
      modelName: 'Event',
      tableName: 'events',
      timestamps: true, // Esto maneja createdAt y updatedAt automáticamente
      underscored: true // Convierte camelCase a snake_case en la base de datos
    });
  }
}

module.exports = Event;
