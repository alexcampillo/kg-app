Template.postSubmit.rendered=function() {
  $('#my-datepicker').datepicker();
}

Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
    	url: $(e.target).find('[name=url]').val(),
		title: $(e.target).find('[name=title]').val(),
		style: $(e.target).find('[name=style]').val(),
		level: $(e.target).find('[name=level]').val(),
		when: $(e.target).find('[name=when]').val(),
		where: $(e.target).find('[name=where]').val(),
		time: moment($(e.target).find('[name=time]').val()).format('h:mm a')

    };

    var errors = validatePost(post);
    if (errors.title || errors.url)
      return Session.set('postSubmitErrors', errors);

    // post._id = Posts.insert(post);
    // Router.go('postPage', post);

    Meteor.call('postInsert', post, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);
      Router.go('postPage', {_id: result._id});  
    });
  }
});

Template.postSubmit.created = function() {
  Session.set('postSubmitErrors', {});
}

Template.postSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('postSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
  }
});

