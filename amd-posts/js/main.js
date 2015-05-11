require.config({
  paths: {
    jquery: 'lib/jquery.min',
    underscore: 'lib/underscore-min',
    backbone: 'lib/backbone-min',
    text: 'lib/text'
  }
});

require([
  'backbone',
  'views/posts'
], function(Backbone, PostsView) {
  $.ajaxPrefilter(function(options) {
    options.url = 'http://localhost:3000' + options.url;
  });
  
  var Router = Backbone.Router.extend({
    routes: {
      '': 'home'
    }
  });

  var router = new Router();

  router.on('route:home', function() {
    new PostsView();
  });

  Backbone.history.start();
});
