const express = require("express");
const cors = require('cors')
const app = express();
const { Sequelize, DataTypes } = require('sequelize');
const { BathroomModel } = require('./models/bathroom');
const { UserModel } = require('./models/user');
const { FavoritesModel } = require('./models/favorites');
const { ReviewModel } = require('./models/review');
require('dotenv').config();

app.use(cors());
app.use(express.json());


app.get("/api/home", (req, res) => {
    res.json({ message: "Hello World!" });
});

function connectModelsToSequelize() {
    if (process.env.USERNAME && process.env.PASSWORD && process.env.HOST) {
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
BathroomModel.bathroom.belongsToMany(UserModel.user, { through: FavoritesModel.favorites, foreignKey: 'BathroomID' });
UserModel.user.belongsToMany(BathroomModel.bathroom, { through: FavoritesModel.favorites, foreignKey: 'UserID' });
BathroomModel.bathroom.belongsToMany(UserModel.user, { through: ReviewModel.reviews });
UserModel.user.belongsToMany(BathroomModel.bathroom, { through: ReviewModel.reviews });

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
    res.json({ data: bathrooms })

});

// endpoint to allow a user to favorite a bathroom
app.post("/api/favorites", async (req, res) => {
    // grab BathroomId and UserID from request
    const UserID = req.body.UserID;
    const BathroomID = req.body.BathroomID;
    console.log(UserID, BathroomID)
    const fakeName = 'some-name';

    // Create and store this new favorite in our database
    const favorite = await FavoritesModel.favorites.create({
        UserID,
        BathroomID,
        Name: fakeName
    })

    res.json({ data: favorite, message: 'successfully created bathroom' })
});

app.get("/api/favorites", async (req, res) => {

    const favorites = await FavoritesModel.favorites.findAll({ UserID: 'f398c2c3-ffb0-46f5-816f-25e854d80b59' });
    console.log('favorites?', favorites);
    res.json({ data: favorites })
});

app.delete("/api/favorites", async (req, res) => {

    // grab BathroomId and UserID from request
    const UserID = req.body.UserID;
    const BathroomID = req.body.BathroomID;
    console.log(UserID, BathroomID)


    // Create and store this new favorite in our database
    const favorite = await FavoritesModel.favorites.destroy({
        where: {
            UserID,
            BathroomID
        }
    })

    res.json({ message: 'successfully deleted bathroom' })
});

//Need 4 different endpoints (post, get, delete, put) for review functiionality 
// 1. post (create a review in database)
// 2. get (all reviews of a bathroom)
// 3. delete (a review)
// 4. put (edit an existing review)

//first step would be to step this up app.get("/api/review", async (req, res) => { 

// Server trying to connect to the database using sequelize
let sequelize;

if (process.env.USERNAME && process.env.PASSWORD && process.env.HOST) {
    sequelize = new Sequelize('postgres', process.env.USERNAME, process.env.PASSWORD, {
        host: process.env.HOST,
        dialect: "postgres"
    });
}

async function connectSequelize() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connectSequelize();

