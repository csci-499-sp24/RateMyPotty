const { Sequelize, DataTypes } = require('sequelize');
const { BathroomModel } = require('./bathroom');
const { UserModel } = require('./user');
require('dotenv').config();

class FavoritesModel{
    static sequelize;
    static favorites;

    static async connectToSequelize(username, password, host) {
        FavoritesModel.sequelize = new Sequelize('postgres', username, password, {
            host: host,
            dialect: "postgres"
        });
        try{
            await FavoritesModel.sequelize.authenticate();
            console.log('Favorite Model connection has been established successfully.');
        }catch(error){
            console.error('Unable to connect to the database:', error);
        }
    }

    static defineFavoritesModel() {
        FavoritesModel.favorites = FavoritesModel.sequelize.define('Favorites', {
            BathroomID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: BathroomModel.bathroom,
                    key: 'BathroomID'
                }
            },
            UserID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: UserModel.user,
                    key: 'UserID'
                }
            },
            Name: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        });
    }

    static async connectFavoritesModel(){
        try {
            await FavoritesModel.favorites.sync()
            console.log('Successfully synced favorite');
        }catch(error){
            console.error('Unable to sync Favorites', error);
        }
    }
}

module.exports = { FavoritesModel }