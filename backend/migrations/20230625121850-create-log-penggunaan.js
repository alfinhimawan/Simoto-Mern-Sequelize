"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("log_penggunaan", {
      id_log_penggunaan: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_kendaraan: {
        type: Sequelize.INTEGER,
        references: {
          model: "kendaraan",
          key: "id_kendaraan",
        },
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: "user",
          key: "id_user",
        },
      },
      nama_pengguna: {
        type: Sequelize.STRING,
      },
      tujuan: {
        type: Sequelize.STRING,
      },
      km_awal: {
        type: Sequelize.INTEGER,
      },
      km_akhir: {
        type: Sequelize.INTEGER,
      },
      bensin_awal: {
        type: Sequelize.ENUM("1", "2", "3", "4", "5", "6", "7"),
      },
      bensin_akhir: {
        type: Sequelize.ENUM("1", "2", "3", "4", "5", "6", "7"),
      },
      tgl_berangkat: {
        type: Sequelize.DATE,
      },
      jam_berangkat: {
        type: Sequelize.TIME,
      },
      tgl_kembali: {
        type: Sequelize.DATE,
      },
      jam_kembali: {
        type: Sequelize.TIME,
      },
      kondisi: {
        type: Sequelize.STRING,
      },
      keterangan: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM("menunggu", "ditolak", "telah_diacc"),
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
    await queryInterface.dropTable("log_penggunaan");
  },
};
