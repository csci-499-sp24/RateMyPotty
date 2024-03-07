const express = require("express");
const cors = require('cors')
const app = express();
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();


app.use(cors());

app.get("/api/home", (req, res) => {
    res.json({message: "Hello World!"});
});









app.get("/api/bathrooms", async (req, res) => {
    // Get the bathroom data from the database
     //SELECT * FROM Bathrooms;
     const bathrooms = await Bathroom.findAll();
     console.log('bathrooms?', bathrooms);
     // Respond back to the client with this data
     res.json({data: bathrooms})

});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

// Server trying to connect to the database using sequelize
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

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const Bathroom = sequelize.define('Bathroom', {
    BathroomID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Name: {
        type: Sequelize.STRING,
        require: true
    },
    Address: {
        type: Sequelize.STRING,
        require: true
    },
    Latitude: {
        type: Sequelize.FLOAT,
        require: true
    },
    Longitude: {
        type: Sequelize.FLOAT,
        require: true
    },
    Rating: {
        type: Sequelize.FLOAT,
        require: false,
        allowNull: true
    }
})

async function sync(){
    await User.sync();
    await Bathroom.sync();
}

sync();
