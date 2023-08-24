"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("kendaraan", {
      id_kendaraan: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nopol: {
        type: Sequelize.STRING,
      },
      alias_name: {
        type: Sequelize.STRING,
      },
      merk: {
        type: Sequelize.STRING,
      },
      jenis: {
        type: Sequelize.STRING,
      },
      tanggal_pajak: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.ENUM("dipakai", "tidak_dipakai"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("kendaraan");
  },
};
