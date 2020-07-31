'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     return queryInterface.createTable('events', { 
       id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false,
        }, 
        event_name:{
          type: Sequelize.STRING,
          allowNull: false,
        },
        event_description:{
          type: Sequelize.STRING,
          allowNull: false,
        },
        event_date:{
          type: Sequelize.DATE,
          allowNull: false,
        },
        user_administrator: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'users', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        amount: {
          type: Sequelize.FLOAT,
          allowNull: false,
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
     return queryInterface.dropTable('events');
     
  }
};
