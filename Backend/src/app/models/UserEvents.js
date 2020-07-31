const { Model, DataTypes} = require('sequelize');
const User = require('../models/User');
const Event = require('../models/Event');

module.exports = (sequelize) => {
    const UserEvents = sequelize.define('user_events', {
        amount_paid: DataTypes.FLOAT,
        is_paid: DataTypes.BOOLEAN,
    });
    User.belongsToMany(Event, { through: UserEvents });
    Event.belongsToMany(User, { through: UserEvents });
    
    return UserEvents;
}