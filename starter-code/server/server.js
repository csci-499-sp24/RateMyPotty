const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const { Sequelize, DataTypes } = require('sequelize');
const { BathroomModel } = require('./models/bathroom');
const { UserModel } = require('./models/user');
const { FavoritesModel } = require('./models/favorites');
const { ReviewModel } = require('./models/review');
require('dotenv').config();

// create application/json parser
const jsonParser = bodyParser.json();

app.use(cors());

app.get("/api/home", (req, res) => {
    res.json({message: "Hello World!"});
});

function connectModelsToSequelize(){
    if(process.env.USERNAME && process.env.PASSWORD && process.env.HOST){
        BathroomModel.connectToSequelize(process.env.USERNAME, process.env.PASSWORD, process.env.HOST);
        UserModel.connectToSequelize(process.env.USERNAME, process.env.PASSWORD, process.env.HOST);
        FavoritesModel.connectToSequelize(process.env.USERNAME, process.env.PASSWORD, process.env.HOST);
        ReviewModel.connectToSequelize(process.env.USERNAME, process.env.PASSWORD, process.env.HOST);
    } else {
    console.log('Could not find the username/password/host info.');
    }   
}

connectModelsToSequelize();
BathroomModel.defineBathroomModel();
UserModel.defineUserModel();
FavoritesModel.defineFavoritesModel();
ReviewModel.defineReviewModel();
BathroomModel.bathroom.belongsToMany(UserModel.user, {through: FavoritesModel.favorites });
UserModel.user.belongsToMany(BathroomModel.bathroom, {through: FavoritesModel.favorites });
BathroomModel.bathroom.belongsToMany(UserModel.user, {through: ReviewModel.reviews });
UserModel.user.belongsToMany(BathroomModel.bathroom, {through: ReviewModel.reviews });


/*
DO NOT REMOVE MIGHT NEED LATER.
This only needs to be done once to set up the tables on supabase but I am keeping this code here incase our database gets messed up somehow and we need to remake everything.

BathroomModel.defineBathroomModel();
BathroomModel.connectBathroomModel();
UserModel.defineUserModel();
UserModel.connectUserModel();
FavoritesModel.defineFavoritesModel();
FavoritesModel.connectFavoritesModel();
ReviewModel.defineReviewModel();
ReviewModel.connectReviewModel();

//Setting up Associations. This is a Many to Many assocation.
BathroomModel.bathroom.belongsToMany(UserModel.user, {through: FavoritesModel.favorites });
UserModel.user.belongsToMany(BathroomModel.bathroom, {through: FavoritesModel.favorites });
*/


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

app.put("/api/rate/:id", jsonParser, async (req, res) => {
    const bathroom_id = req.params.id;
    const rating = req.body.rating;

    const bathroom = await BathroomModel.bathroom.findByPk(bathroom_id)

    let totalRatings = bathroom.TotalRatings;
    let originalRating = bathroom.AverageRating === null ? 0.0 : bathroom.AverageRating;

    bathroom.AverageRating = (originalRating + rating) / (totalRatings + 1);
    bathroom.TotalRatings = totalRatings + 1;

    await bathroom.save();

    res.json({data: bathroom});
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

