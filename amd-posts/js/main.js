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
  'views/app'
], function(Backbone, AppView) {
  var Router = Backbone.Router.extend({
    routes: {
      '': 'home'
    }
  });

  var router = new Router();

  router.on('route:home', function() {
    new AppView();
  });

  Backbone.history.start();
});
