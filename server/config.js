Meteor.startup(function() {
	AccountsEntry.config({
		homeRoute: '/',
		dashboardRoute: '/'
	});

	Accounts.onCreateUser(function(options, user) {
		if (options.profile)
    		user.profile = options.profile;
  		else
    		user.profile = {};

	    user.username = user.username.toLowerCase();
	    user.profile.followers = new Array();
	    user.profile.following = new Array();
  
	    return user;
	});
});