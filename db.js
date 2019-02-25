const Sequelize = require("sequelize");
const faker = require("faker");

// const db = new Sequelize(process.env.DATABASE_URL, {logging: false})

// For cloud9 db
const db = new Sequelize('acme_companies_db', 'ubuntu', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

const Company = db.define('company', {
  name: Sequelize.STRING
});

Company.createFake = function() {
  this.create({name: faker.company.companyName()});
};

const companyNames = (count = 5) => {
  const _names = [];
  while (_names.length < count) {
    _names.push(faker.company.companyName());
  };
  return _names;
}

const syncAndSeed = () => {
  return db.sync({ force: true })
    .then(() => console.log('databse synced'))
    .then(() => companyNames())
    .then(names => Promise.all(names.map(name => Company.create({ name }))))
    .then(() => Company.createFake())
};

module.exports = {
  syncAndSeed,
  Company
}
