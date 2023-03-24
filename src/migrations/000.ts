/**
 * This is just a dummy migrations file to prevent not initialized error in sequelize
 */

import Sequel, { QueryInterface } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof Sequel) {},

  async down(queryInterface: QueryInterface, Sequelize: typeof Sequel) {},
};
