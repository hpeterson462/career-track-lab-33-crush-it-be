const Route = require('../lib/models/route');
const User = require('../lib/models/user');
const chance = require('chance').Chance();

const seed = async ({ count = 3 } = {}) => {
  const usersToCreate = [...Array(count)].map(() => ({
    email: chance.email()
  }))

  const routesToCreate = [...Array(count)].map(() => ({
    userId: chance.integer(),
    location: chance.locale(),
    name: chance.word(),
    rating: chance.integer(),
    notes: chance.sentence()
  }));

  await Promise.all(usersToCreate.map(user => User.insert(user)));
  await Promise.all(routesToCreate.map(route => Route.insert(route)
  ));
};

module.exports = {
  seed
};
