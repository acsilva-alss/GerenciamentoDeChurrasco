'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_events', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
       }, 
       user_id: {
         type: Sequelize.INTEGER,
         allowNull: false,
         references: { model: 'users', key: 'id'},
         onUpdate: 'CASCADE',
         onDelete: 'CASCADE',
       },
       event_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'events', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
       },
      amount_paid:{ 
        type: Sequelize.FLOAT
      },
      is_paid:{ 
        type: Sequelize.BOOLEAN,
      },
       created_at: {
         type: Sequelize.DATE,
         allowNull: false,
       },
       updated_at: {
         type: Sequelize.DATE,
         allowNull: false,
       },
     });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_events');
  }
};
