const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
      validate: {
        len: [0,15]
      }
    },
    image: {
      type: DataTypes.STRING(2000),
      allowNull: true,
      validate:{isUrl: true},
      defaultValue: 'https://media.vandal.net/i/1200x630/10-2021/2021105724573_1.jpg'
    },

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true
    },

    hp: { 
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 999
      }
    },

    atack: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1, 
        max: 999
      }
    },

    defense: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1, 
        max: 999
      }
    },

    speed: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1, 
        max: 999
      }
    },

    atack: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1, 
        max: 999
      }
    },

    weight: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 999
      }
    },

    height: {
      type: DataTypes.INTEGER,
      validate: { 
        min: 1,
        max: 999
      }
    }
    
  },
  {
    timestamps: false
  });
};
