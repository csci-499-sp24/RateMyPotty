const { Sequelize, DataTypes } = require('sequelize');
const { BathroomModel } = require('./bathroom');
const { UserModel } = require('./user');
require('dotenv').config();

class ReviewModel{
    static sequelize;
    static reviews;

    static async connectToSequelize(username, password, host) {
        ReviewModel.sequelize = new Sequelize('postgres', username, password, {
            host: host,
            dialect: "postgres"
        });
        try{
            await ReviewModel.sequelize.authenticate();
            console.log('Review Model connection has been established successfully.');
        }catch(error){
            console.error('Unable to connect to the database:', error);
        }
    }

    static defineReviewModel() {
        ReviewModel.reviews = ReviewModel.sequelize.define('Review', {
        // NOTE: Deleted because sequalize creates these fields for us when we define the relationships        
        //    BathroomID: {
        //        type: DataTypes.INTEGER,
        //        allowNull: false,
        //        primaryKey: true,
        //       references: {
        //            model: BathroomModel.bathroom,
        //            key: 'BathroomID'
        //        }
        //    },
        //    UserID: {
        //        type: DataTypes.UUID,
        //        allowNull: false,
        //        primaryKey: true,
        //       references: {
        //            model: UserModel.user,
        //            key: 'UserID'
        //        }
        //    },
            Name: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        });
    }

    static async connectReviewModel(){
        try {
            await ReviewModel.reviews.sync()
            console.log('Successfully synced review');
        }catch(error){
            console.error('Unable to sync review', error);
        }
    }
}

module.exports = { ReviewModel }