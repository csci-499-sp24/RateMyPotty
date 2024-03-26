const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

class FavoritesModel{
    static sequelize;
    static favorite;

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
        FavoritesModel.favorite = FavoritesModel.sequelize.define('Favorites', {
            BathroomID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            
            },
            UserID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            Name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        });
    }

    static async connectFavoritesModel(){
        try {
            await FavoritesModel.favorite.sync()
            console.log('Successfully synced favorite');
        }catch(error){
            console.error('Unable to sync User', error);
        }
    }
}

module.exports = { FavoritesModel }