'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('riwayat_service', {
      id_riwayat_service: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER

      },
      alias_name: {
        type: Sequelize.STRING
      },
      tempat_service: {
        type: Sequelize.STRING
      },
      tgl_service_awal: {
        type: Sequelize.DATE
      },
      tgl_service_selesai: {
        type: Sequelize.DATE
      },
      detail_service: {
        type: Sequelize.STRING
      },
      pic: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('riwayat_service');
  }
};