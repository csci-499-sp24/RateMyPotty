const express = require("express");
const cors = require('cors')
const app = express();
require('dotenv').config();
const Sequelize = require('sequelize');



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
