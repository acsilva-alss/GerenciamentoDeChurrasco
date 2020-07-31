const {Model, DataTypes} = require('sequelize');

class User extends Model {
    static init(connection){
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
        },{
            sequelize: connection
        })
    }

    static associate(models){
        this.hasMany(models.Event, { foreignKey: 'user_administrator', as: 'users_owner'});
        this.belongsToMany(models.Event, { through: 'user_events', as: 'events' });
    }
}

module.exports = User;