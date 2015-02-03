Template.profile.helpers({
	ownPost: function() {
    	return this.userId == Meteor.userId();
  	},
  	ownsThisProfile: function() {
  		return Meteor.user().username
  	}
});

Template.profile.events({
	'click #followers': function() {
    	Modal.show('followers');
  	},
  	'click #following': function() {
    	Modal.show('following');
  	}
});

Template.followers.helpers({
	user: function() {
		return Meteor.users.find({username: this.username}, {fields: {username: true, emails: true, profile: true}});
	}
});

Template.following.helpers({
	user: function() {
		return Meteor.users.find({}, {fields: {"profile.following": true}});
	}
});