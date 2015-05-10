$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
  options.url = 'http://backbone-beginner.herokuapp.com' + options.url;
});

$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
      if (o[this.name] !== undefined) {
          if (!o[this.name].push) {
              o[this.name] = [o[this.name]];
          }
          o[this.name].push(this.value || '');
      } else {
          o[this.name] = this.value || '';
      }
  });
  return o;
};

var User = Backbone.Model.extend({
  urlRoot: '/users'
});

var Users = Backbone.Collection.extend({
  url: '/users'
});

var UserList = Backbone.View.extend({
  el: '.page',
  render: function() {
    var users = new Users();
    users.fetch({
      success: function(users) {
        var template = _.template($('#user-list-template').html());
        this.$el.html(template({users: users.models}));
      }.bind(this)
    });
  }
});

var userList = new UserList();

var EditUser = Backbone.View.extend({
  el: '.page',
  render: function(options) {
    if (options.id) {
      var user = new User({id: options.id});
      this.user = user;
      user.fetch({
        success: function(user) {
          var template = _.template($('#edit-user-template').html());
          this.$el.html(template({user: user}));
        }.bind(this)
      });
    } else {
      var template = _.template($('#edit-user-template').html());
      this.$el.html(template({user: null}));
    }
  },
  events: {
    'submit .edit-user-form': 'saveUser',
    'click .delete': 'deleteUser'
  },
  saveUser: function(e) {
    var userDetails = $(e.currentTarget).serializeObject();
    var user = new User();
    user.save(userDetails, {
      success: function(user) {
        router.navigate('', {trigger:true});
      }
    });
    return false;
  },
  deleteUser: function() {
    this.user.destroy({
      success: function() {
        router.navigate('', {trigger:true});
      }
    });
    return false;
  }
});

var editUser = new EditUser();

var Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    'new': 'editUser',
    'edit/:id': 'editUser'
  }
});

var router = new Router();

router.on('route:home', function() {
  userList.render();
});

router.on('route:editUser', function(id) {
  // id param from /users/:id
  // another way to do it is make a model and pass it via new View(model) and in the View
  // initialize property, you called render in it with this.render()
  editUser.render({id: id});
});

Backbone.history.start();
