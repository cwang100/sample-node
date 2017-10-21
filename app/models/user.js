var bcrypt   = require('bcrypt-nodejs');
var Sequelize= require('sequelize');
var mysql    = require('mysql2');
var configDB     = require('../../../database.js');

// configuration ===============================================================
var sequelize = new Sequelize(configDB.database, configDB.user, configDB.password, {
    host: configDB.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

var User = sequelize.define('user', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	username: {
		type: Sequelize.STRING
	},
	email: {
		type: Sequelize.STRING,
		unique: true
	},
	password: Sequelize.STRING,
	facebookId: Sequelize.STRING,
	facebookToken: Sequelize.STRING,
	twitterId: Sequelize.STRING,
	twitterToken: Sequelize.STRING,
	googleId: Sequelize.STRING,
	googleToken: Sequelize.STRING
})

User.generateHash = function(password) {
   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.validPassword = function(user, password) {
    return bcrypt.compareSync(password, user.password);
};

module.exports = User;
