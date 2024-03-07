const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

class BathroomModel{
    static sequelize;
    static bathroom;

    static async connectToSequelize(username, password, host) {
        BathroomModel.sequelize = new Sequelize('postgres', username, password, {
            host: host,
            dialect: "postgres"
        });
        try{
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        }catch(error){
            console.error('Unable to connect to the database:', error);
        }
    }

    static defineBathroomModel() {
        BathroomModel.bathroom = BathroomModel.sequelize.define('Bathroom', {
            BathroomID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            Name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            Address: {
                type: DataTypes.STRING,
                allowNull: false
            },
            Longitude: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            Latitude: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            Rating: {
                type: DataTypes.FLOAT,
                allowNull: true,
            }
        });
    }

    static async connectBathroomModel(){
        try {
            await BathroomModel.bathroom.sync()
            console.log('Successfully synced Bathroom');
        }catch(error){
            console.error('Unable to sync Bathroom', error);
        }
    }
}

module.exports = { BathroomModel }



//install node.js: https://www.c-sharpcorner.com/blogs/how-to-create-packagejson-reactjs
//use command node bathroom.js to run this while in correct folder
