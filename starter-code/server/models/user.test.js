const { UserModel } = require('./user'); // adjust the path as needed
const { Sequelize, DataTypes } = require('sequelize');

// Mock Sequelize
jest.mock('sequelize', () => {
  const mSequelize = { define: jest.fn(), authenticate: jest.fn(), sync: jest.fn() };
  const actualSequelize = jest.requireActual('sequelize');
  return { Sequelize: jest.fn(() => mSequelize), DataTypes: actualSequelize.DataTypes };
});

describe('UserModel', () => {
  beforeEach(() => {
    // Reset the mock before each test
    Sequelize.mockClear();
    // Set up the Sequelize instance
    UserModel.sequelize = new Sequelize();
    // Define the User model
    UserModel.defineUserModel();
  });

  it('connects to Sequelize', async () => {
    // Call the method under test
    await UserModel.connectToSequelize('username', 'password', 'host');
    // Add your assertions here
  });

  // Add more test cases here if needed
});