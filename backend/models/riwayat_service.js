'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class riwayat_service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  riwayat_service.init({
    id_riwayat_service: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    alias_name: DataTypes.STRING,
    tempat_service: DataTypes.STRING,
    tgl_service_awal: DataTypes.DATE,
    tgl_service_selesai: DataTypes.DATE,
    detail_service: DataTypes.STRING,
    pic: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'riwayat_service',
    tableName: 'riwayat_service'
  });
  return riwayat_service;
};