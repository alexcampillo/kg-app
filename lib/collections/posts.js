Posts = new Mongo.Collection('posts');

// Posts.allow({
//   insert: function(userId, doc) {
//     // only allow posting if you are logged in
//     return !! userId;
//   }
// });

Posts.allow({
  update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); },
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'url', 'title', 'when', 'time', 'where').length > 0);
  }
});

Posts.deny({
  update: function(userId, post, fieldNames, modifier) {
    var errors = validatePost(modifier.$set);
    return errors.title || errors.url;
  }
});

	validatePost = function (post) {
	  var errors = {};
	  if (!post.title)
	    errors.title = "Please fill in a headline";
	  if (!post.url)
	    errors.url =  "Please fill in a URL";
	  if (!post.style)
	    errors.style =  "Please fill in a class style";
	  if (!post.level)
	    errors.level =  "Please fill in a class level";
	  if (!post.when)
	    errors.when =  "Please fill in a class date";
	  if (!post.time)
	    errors.time =  "Please fill in a class time";
	  if (!post.where)
	    errors.where =  "Please fill in a class location";
	  return errors;
	}

Meteor.methods({
	postInsert: function(postAttributes) {
		check(Meteor.userId(), String);
		check(postAttributes, {
			title: String,
			url: String,
			style: String,
			level: String,
			when: String,
			where: String,
			time: String
		});

		var errors = validatePost(postAttributes);
	    if (errors.title || errors.url)
	      throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");

		// 	var postsWithSameLink = Posts.findOne({url: postAttributes.url});
		// 	if (postsWithSameLink) {
		// 		return {
		// 			postExists: true,
		// 			_id: postsWithSameLink._id
		// 		}
		// 	}

		var user = Meteor.user();
		var post = _.extend(postAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date(),
  			commentsCount: 0,
  			upvoters: [], 
  			votes: 0
		});

		var postId = Posts.insert(post);

		return {
			_id: postId
		};
	},
	upvote: function(postId) {
    check(this.username, String);
    check(postId, String);
    
    var affected = Posts.update({
      _id: postId, 
      upvoters: {$ne: this.userId}
    }, {
      $addToSet: {upvoters: this.username},
      $inc: {votes: 1}
    });
    
    if (! affected)
      throw new Meteor.Error('invalid', "You weren't able to upvote that post");
  }

});