const { FavoritesModel } = require('./favorites');//importing respective model

//Mock defintion and returning the data typesm .fn() is a mock function 
jest.mock('sequelize', () => {
  const mSequelize = { define: jest.fn(), authenticate: jest.fn(), sync: jest.fn() };
  const actualSequelize = jest.requireActual('sequelize');
  return { Sequelize: jest.fn(() => mSequelize), DataTypes: actualSequelize.DataTypes };
});

const { Sequelize } = require('sequelize');

//test suite definitions
describe('FavoritesModel', () => {
  beforeEach(() => {
    FavoritesModel.sequelize = new Sequelize();
    FavoritesModel.defineFavoritesModel();
  });
  
  //assertions, just going to make a call to see if sequelized connected correctly
  it('connects to Sequelize', async () => {
    await FavoritesModel.connectToSequelize('username', 'password', 'host')
    //expected result is it should be called
    expect(FavoritesModel.sequelize.authenticate).toHaveBeenCalled();
  });
});