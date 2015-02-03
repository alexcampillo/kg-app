Template.profileEdit.events({

  'submit form': function(e) {
    e.preventDefault();

    var currentProfileId = this._id;

    // var profileProperties = {
      var newTitle = $(e.target).find('[name=displayTitle]').val();
      var newBio = $(e.target).find('[name=displayBio]').val();
      var newName = $(e.target).find('[name=displayName]').val();
    // }

    Meteor.users.update({_id: Meteor.user()._id}, {$set: {"profile.displayTitle": newTitle, "profile.displayBio": newBio, "profile.displayName": newName} }, function(error) {
      if (error) {
        // display the error to the user
        alert(error.reason);
      } else {
        Modal.hide('profileEditModal');
      }
    });
  }


});