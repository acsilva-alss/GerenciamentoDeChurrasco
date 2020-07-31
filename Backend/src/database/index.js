const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const User = require('../app/models/User');
const Event = require('../app/models/Event');
const UserEvents = require('../app/models/UserEvents');
const bcrypt = require('bcryptjs');
const connection = new Sequelize(dbConfig);

User.init(connection);
User.beforeCreate((user, options) => {

    return bcrypt.hash(user.password, 10)
        .then(hash => {
            user.password = hash;
        })
        .catch(err => { 
            throw new Error(); 
        });
});

Event.init(connection);
UserEvents(connection)

User.associate(connection.models);
Event.associate(connection.models);

module.exports = connection;