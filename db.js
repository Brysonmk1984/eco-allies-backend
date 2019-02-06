const Sequelize = require('sequelize');
const UserModel = require('./models/user.js');
const RetrievalCodeModel = require('./models/retrievalCode.js');
const SimpleTokenModel = require('./models/simpleToken.js');

let db;
// PRODUCTION or Locally running backend through PROXY
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'proxy'){
  db = new Sequelize(process.env.SQL_DATABASE, process.env.SQL_USER, process.env.SQL_PASSWORD, {
    dialect: 'postgres',
    protocol: 'postgres',
    storage: "./session.postgres",
    operatorsAliases: false,
    host: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
    //dialectOptions : { ssl: true },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  });
  
// DEVELOPMENT
}else{
  const sequelizeSettings = {
    dialect: 'postgres',
    protocol: 'postgres',
    storage: "./session.postgres",
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
  const dbUrl = process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : "postgres://admin:admin@localhost/ecoAllies";
  db = new Sequelize(dbUrl, sequelizeSettings);
}

db.sync();


const User = UserModel(db, Sequelize);
const RetrievalCode = RetrievalCodeModel(db, Sequelize);
const SimpleToken = SimpleTokenModel(db, Sequelize);

module.exports = { User, RetrievalCode, SimpleToken, db }