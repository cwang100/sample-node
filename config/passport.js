// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var User = require('../app/models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {

	// =========================================================================
	// passport session setup ==================================================
	// =========================================================================
	// required for persistent login sessions
	// passport needs ability to serialize and unserialize users out of session

	// used to serialize the user for the session
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// used to deserialize the user
	passport.deserializeUser(function(id, done) {
		User.findById(id).then(function(user) {
			console.log(user)
			done(null, user);
		})
	});

	// =========================================================================
	// LOCAL SIGNUP ============================================================
	// =========================================================================
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

	passport.use('local-signup', new LocalStrategy({
		// by default, local strategy uses username and password, we will override with email
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true // allows us to pass back the entire request to the callback
	},
	function(req, email, password, done) {
		// find a user whose email is the same as the forms email
		// we are checking to see if the user trying to login already exists
		User.findAll({
			where: {
				email: email
			}
		}).then(function(result) {
			if (result.length){
				return done(null, false, req.flash('signupMessage', 'This email is already taken.'));
			} else {
				User.create({
					username: "meow",
					email: email,
					password: User.generateHash(password)
				}).then(function(user) {
					console.log(user)
					return done(null, user);
				});
			}
		});
	}));
};