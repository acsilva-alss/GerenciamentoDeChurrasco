const {Model, DataTypes} = require('sequelize');

class Event extends Model {
    static init(connection){
        super.init({
            event_name: DataTypes.STRING,
            event_description: DataTypes.STRING,
            event_date: DataTypes.DATE,
            amount: DataTypes.FLOAT,
        },{
            sequelize: connection
        })
    }

    static associate(models){
        this.belongsTo(models.User, { foreignKey: 'user_administrator', as: 'user_owner'});
        this.belongsToMany(models.User, { through: 'user_events', as: 'users' });
    }
}

module.exports = Event;