'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kendaraan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.log_penggunaan, {
        foreignKey: 'id_kendaraan', as: "log_penggunaan"
      })

    }
  }
  kendaraan.init({
    id_kendaraan:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nopol: DataTypes.STRING,
    alias_name: DataTypes.STRING,
    merk: DataTypes.STRING,
    jenis: DataTypes.STRING,
    tanggal_pajak: DataTypes.DATE,
    status: DataTypes.ENUM('dipakai', 'tidak_dipakai')
  }, {
    sequelize,
    modelName: 'kendaraan',
    tableName: 'kendaraan'
  });
  return kendaraan;
};