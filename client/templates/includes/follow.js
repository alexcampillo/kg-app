Template.followButton.events({
  'click .follow-btn': function(e,t) {
    var state = $(e.currentTarget).text();
    console.log(state);
    if(state === 'Reach')
      Meteor.call('follow', { username: Meteor.user().username, userToFollow: this.username }, function() {
        toastr.success("You're now following " + this.username + "!");
      }.bind(this));
    if(state === 'Reached')
      Meteor.call('unfollow', { username: Meteor.user().username, userToUnfollow: this.username }, function() {
        toastr.success("You just left " + this.username);
      }.bind(this));
  },
  'click #editProfile': function() {
    Modal.show('editProfileModal');
  }
});