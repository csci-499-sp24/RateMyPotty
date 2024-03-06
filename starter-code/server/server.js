const express = require("express");
const cors = require('cors')
const app = express();
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();


app.use(cors());

app.get("/api/home", (req, res) => {
    res.json({message: "Hello World!"});
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

let sequelize;

if(process.env.USERNAME && process.env.PASSWORD && process.env.HOST){
    sequelize = new Sequelize('postgres', process.env.USERNAME, process.env.PASSWORD, {
        host: process.env.HOST,
        dialect: "postgres"
    });
}

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
    Address_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Street_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    City_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    State_name: {
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

async function sync(){
    await Bathroom.sync();
}

sync();
