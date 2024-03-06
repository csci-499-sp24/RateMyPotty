const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('postgres', process.env.USERNAME, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: "postgres"
});


async function connectSequelize(){
    try{
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }catch(error){
        console.error('Unable to connect to the database:', error);
    }
}

connectSequelize();


const Bathroom = sequelize.define('Bathroom', {
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

async function syncBathroom(){
    try {
        await Bathroom.sync()
        console.log('Successfully synced Bathroom');
    }catch(error){
        console.error('Unable to sync Bathroom', error);
    }
}

syncBathroom();


//install node.js: https://www.c-sharpcorner.com/blogs/how-to-create-packagejson-reactjs
//use command node bathroom.js to run this while in correct folder
