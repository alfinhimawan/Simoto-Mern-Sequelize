'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class log_penggunaan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user,{
        foreignKey : 'id_user', as: 'user'
      })
      this.belongsTo(models.kendaraan,{
        foreignKey : 'id_kendaraan', as: 'kendaraan'
      })
    }
  }
  log_penggunaan.init({
    id_log_penggunaan:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_kendaraan: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    nama_pengguna: DataTypes.STRING,
    tujuan: DataTypes.STRING,
    km_awal: DataTypes.INTEGER,
    km_akhir: DataTypes.INTEGER,
    bensin_awal: DataTypes.ENUM('1', '2', '3', '4', '5', '6', '7'),
    bensin_akhir: DataTypes.ENUM('1', '2', '3', '4', '5', '6', '7'),
    tgl_berangkat: DataTypes.DATE,
    jam_berangkat: DataTypes.TIME,
    tgl_kembali: DataTypes.DATE,
    jam_kembali: DataTypes.TIME,
    kondisi: DataTypes.STRING,
    keterangan: DataTypes.STRING,
    status: DataTypes.ENUM('menunggu', 'ditolak', 'telah_diacc')
  }, {
    sequelize,
    modelName: 'log_penggunaan',
    tableName: 'log_penggunaan'
  });
  return log_penggunaan;
};