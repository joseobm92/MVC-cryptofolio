const { User } = require('../models');

const userData = [
  {
    id: 1,
    name: 'Jane Doe',
    email: 'jane@doe.com',
    passoword: 'password123',
  },
  {
    id: 1,
    name: 'Sam Smith',
    email: 'sam@dsmith.com',
    passoword: 'password123',
  },
];

const seedUser = () => User.bulkCreate(userData);