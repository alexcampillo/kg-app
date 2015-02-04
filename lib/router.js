/*============================================
  CONFIGURE IS DEFAULT SETTING FOR APP
  EX: GENERAL DEFAULT LAYOUT, DATA LOADED ON EVERY PAGE.
==============================================*/
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [Meteor.subscribe('notifications')];
  }
});

// Router.route('/', {name: 'postsList'});

/*============================================
  /POSTS/:_ID
  ':' MEANS THE FOLLOWING PATH IS AN ITERATOR. THERE ARE MULTIPLE POSTS, SO THIS WILL ITERATE OVER ALL OF THEM BASED ON THE POST ID
  'NAME' DEFINES THE TEMPLATE THAT IS LOADED IN THE LAYOUT.
  'WAITON' IS DELIVERING SPECIFIC DATA TO EACH POST SUCH AS USER WHO POSTED, HOW MANY ATTENDING, COMMENTS, ETC.
==============================================*/
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

/*============================================
  /POSTS/:_ID/EDIT
  DEFINES A PATH ON EACH POST TO EDIT THE SELECTED POST
==============================================*/
Router.route('/posts/:_id/edit', {
  name: 'postEdit',
  waitOn: function() { 
    return Meteor.subscribe('singlePost', this.params._id);
  },
  data: function() { return Posts.findOne(this.params._id); }
});

/*============================================
  /SUBMIT
  PATH TO FORM FOR CREATING NEW POST
==============================================*/
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

/*============================================
  /SEARCH
  SEARCH FOR USERS

  *TO ADD*
      SEARCH ALL POSTS
==============================================*/
Router.route('/search', {
  name: 'search',
  waitOn: function() { return Meteor.subscribe('users') },
  data: {
      users: Meteor.users.find()
  }
});

/*============================================
  /ALLUSERS
  LOADS ALLUSERS TEMPLATE.
  GETS DATA FOR ALL USERS ON APP
==============================================*/
Router.route('/allUsers', {
	name: 'allUsers',
	waitOn: function() { return Meteor.subscribe('users') },
  data: {
    	users: Meteor.users.find()
  	},
});

/*============================================
  /:USERNAME
  ITERATES OVER EACH USER PROFILE, DELIVERS DATA FOR SPECIFIC USER

  *TO ADD*
      DELIVER POST DATA ASSOCIATED WITH USER
==============================================*/
Router.route('/:username', {
  name: 'profile',
  waitOn: function() {
    console.log('user profile subscription')
    check(this.params.username, String)
    var params = { username: this.params.username, following: [] }
    return [
      Meteor.subscribe('userProfile', this.params.username),
      // Meteor.subscribe('userStream', this.params.username)
    ]
  },
  data: function() { return {
      user: Meteor.users.findOne({ username: this.params.username }),
      // posts: Posts.find({ username: this.params.username }, { sort: { date: -1 }})
    }
  }
});

/*============================================
  /:USERNAME/:TYPE
  GET LIST OF FOLLOWERS
==============================================*/
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

/*============================================
  /PROFILEEDIT
  EDIT CURRENT USER'S PROFILE
==============================================*/
Router.route('/profileEdit', {
  name: 'profileEdit',
  data: function() { 
    return Meteor.users.findOne(this.params._id); 
  }
});


Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});

