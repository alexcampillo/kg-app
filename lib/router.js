Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [Meteor.subscribe('notifications')];
  }
});

// Router.route('/', {name: 'postsList'});


Router.route('/posts/:_id', {
  name: 'postPage',
  waitOn: function() {
    return [
      Meteor.subscribe('singlePost', this.params._id),
      Meteor.subscribe('comments', this.params._id)
    ];
  },
  data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/posts/:_id/edit', {
  name: 'postEdit',
  waitOn: function() { 
    return Meteor.subscribe('singlePost', this.params._id);
  },
  data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/submit', { name: 'postSubmit' });

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.route('/search', {
  name: 'search',
  waitOn: function() { return Meteor.subscribe('users') },
  data: {
      users: Meteor.users.find()
  }
});

Router.route('/allUsers', {
	name: 'allUsers',
	waitOn: function() { return Meteor.subscribe('users') },
  data: {
    	users: Meteor.users.find()
  	},
});

Router.route('/:username', {
  name: 'profile',
  waitOn: function() {
    console.log('user profile subscription')
    check(this.params.username, String)
    var params = { username: this.params.username, following: [] }
    return [
      Meteor.subscribe('userProfile', this.params.username),
      // Meteor.subscribe('userStream', params)
    ]
  },
  data: function() { return {
      user: Meteor.users.findOne({ username: this.params.username }),
      // posts: Posts.find({ username: this.params.username }, { sort: { date: -1 }})
    }
  }
});

Router.route('/:username/:type', {
  name: 'followlist',
  waitOn: function() {
    return Meteor.subscribe('relatedUsers', _.pick(this.params, 'username', 'type'));
  },
  data: function() {
    var that = this;
    var options = { username: { $ne: that.params.username }};

    return {
      users: function() { return Meteor.users.find(options) },
      usersCount: function() { return Meteor.users.find(options).count() },
      type: function() { return that.params.type.capitalize() }
    }
  }
});

Router.route('/profileEdit', {
  name: 'profileEdit',
  data: function() { 
    return Meteor.users.findOne(this.params._id); 
  }
});


Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});

