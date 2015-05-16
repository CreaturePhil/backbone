require.config({
  paths: {
    jquery: 'lib/jquery.min',
    underscore: 'lib/underscore-min',
    backbone: 'lib/backbone-min',
    text: 'lib/text'
  }
});

require([
  'jquery',
  'backbone',
  'views/posts',
  'views/edit'
], function($, Backbone, PostsView, EditView) {
  $.ajaxPrefilter(function(options) {
    options.url = 'http://localhost:3000' + options.url;
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

  var $content = $('.container');

  var Router = Backbone.Router.extend({
    routes: {
      '': 'home',
      'new': 'edit'
    },

    // remove ghost views
    before: function() {
      if (!this.currentView) return;
      this.currentView.remove();
    },
    
    home: function() {
      this.before();
      this.currentView = new PostsView();
      $content.html(this.currentView.render().el);
    },

    edit: function() {
      this.before();
      this.currentView = new EditView(this);
      $content.html(this.currentView.render().el);
    }
  });

  var router = new Router();

  Backbone.history.start();
});
