UI.registerHelper('pluralize', function(n, thing) {
  // fairly stupid pluralizer
  if (n === 1) {
    return '1 ' + thing;
  } else {
    return n + ' ' + thing + 's';
  }
});

Template.registerHelper('isCurrentUser', function() {
  var user = this;
  return user._id === Meteor.user()._id;
});

Template.registerHelper('isFollowed', function() {
  if(Meteor.user()) {
    var user = this;
    return _.contains(Meteor.user().profile.following, user.username);
  } else {
  	return false;
  }
});