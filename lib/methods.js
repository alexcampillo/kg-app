Meteor.methods({
  follow: function(params, callback) {
    // if(Meteor.userId() !== params.userId) return false
    // if(params.userId === params.userToFollow) return false
    check(params, { username: String, userToFollow: String })

    Meteor.users.update(
      { username: params.username },
      { $addToSet: { 'profile.following': params.userToFollow }}
    );

    Meteor.users.update(
      { username: params.userToFollow },
      { $addToSet: { 'profile.followers': params.username }}//,
      // function() {
      //   callback.call(null);
      // }
    );
  },

  unfollow: function(params) {
    if(Meteor.user().username !== params.username) return false;
    check(params, { username: String, userToUnfollow: String })

    Meteor.users.update(
      { username: params.username },
      { $pull: { 'profile.following': params.userToUnfollow }}
    );

    Meteor.users.update(
      { username: params.userToUnfollow },
      { $pull: { 'profile.followers': params.username }}
    );
  }
});