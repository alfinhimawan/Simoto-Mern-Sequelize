'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.log_penggunaan,{
        foreignKey : 'id_user',as : "log_penggunaan"
      })
    }
  }
  user.init({
    id_user: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    departemen: DataTypes.STRING,
    nama_karyawan: DataTypes.STRING,
    role: DataTypes.ENUM('user', 'validator', 'admin'),
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
    tableName: 'user'
  });
  return user;
};