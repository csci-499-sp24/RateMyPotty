const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

class UserModel{
    static sequelize;
    static user;

    static async connectToSequelize(username, password, host) {
        UserModel.sequelize = new Sequelize('postgres', username, password, {
            host: host,
            dialect: "postgres"
        });
        try{
            await UserModel.sequelize.authenticate();
            console.log('User Model connection has been established successfully.');
        }catch(error){
            console.error('Unable to connect to the database:', error);
        }
    }

    static defineUserModel() {
        UserModel.user = UserModel.sequelize.define('User', {
            UserID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            Username: {
                type: DataTypes.STRING,
                allowNull: false
            },
            Email: {
                type: DataTypes.STRING,
                allowNull: false
            }
        });
    }


    static async connectUserModel(){
        try {
            await UserModel.user.sync()
            console.log('Successfully synced User');
        }catch(error){
            console.error('Unable to sync User', error);
        }
    }
}

module.exports = { UserModel }