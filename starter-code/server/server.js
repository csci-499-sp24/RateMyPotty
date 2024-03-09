const express = require("express");
const cors = require('cors')
const app = express();
const { Sequelize, DataTypes } = require('sequelize');
const { BathroomModel } = require('./models/bathroom');
require('dotenv').config();

app.use(cors());

app.get("/api/home", (req, res) => {
    res.json({message: "Hello World!"});
});

if(process.env.USERNAME && process.env.PASSWORD && process.env.HOST){
    BathroomModel.connectToSequelize(process.env.USERNAME, process.env.PASSWORD, process.env.HOST);
} else {
    console.log('Could not find the username/password/host info.');
}
BathroomModel.defineBathroomModel();

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

app.get("/api/bathrooms", async (req, res) => {
    // Get the bathroom data from the database
     //SELECT * FROM Bathrooms;
     
     const bathrooms = await BathroomModel.bathroom.findAll();
     console.log('bathrooms?', bathrooms);
     // Respond back to the client with this data
     res.json({data: bathrooms})

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

