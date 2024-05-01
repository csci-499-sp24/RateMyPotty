const { UserModel } = require('./user');
const { Sequelize, DataTypes } = require('sequelize');

// Mock Sequelize, documention on blackboard 
jest.mock('sequelize', () => {
  const mSequelize = { define: jest.fn(), authenticate: jest.fn(), sync: jest.fn() };
  const actualSequelize = jest.requireActual('sequelize');
  return { Sequelize: jest.fn(() => mSequelize), DataTypes: actualSequelize.DataTypes };
});

describe('UserModel', () => {
  beforeEach(() => {
    // reset the mock before each test, will create a fresh mock https://jestjs.io/docs/mock-functions
    Sequelize.mockClear();
    // setting up the sequelize instance
    UserModel.sequelize = new Sequelize();
    // defining the User model
    UserModel.defineUserModel();
  });

  it('connects to Sequelize', async () => {
    await UserModel.connectToSequelize('username', 'password', 'host')
    expect(UserModel.sequelize.authenticate).toHaveBeenCalled();
    /*just adding call assertion for now which passes, to test
      type npx jest user.test.js */
  });

});