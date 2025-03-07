'use strict';
const { Sequelize, Model, DataTypes } = require('sequelize');

class Booking extends Model {
  // Método de asociación
  static associate(models) {
    // Relación: Una reserva pertenece a un evento
    this.belongsTo(models.Event, {
      as: 'event',
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
        defaultValue: DataTypes.UUIDV4,
      },
      event_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      user_email: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      num_tickets: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn('NOW'),
      }
    }, {
      sequelize,
      modelName: 'Booking',
      tableName: 'bookings',
      timestamps: true,  // Esto maneja `created_at` y `updated_at` automáticamente
      underscored: true,  // Convierte los campos a snake_case
    });
  }
}

module.exports = Booking;
