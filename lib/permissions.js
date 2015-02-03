// check that the userId specified owns the documents
ownsDocument = function(userId, doc) {
  return doc && doc.userId === userId;
};

isCurrentUser = function() {
  var user = this
  return user.username === Meteor.user().username
};