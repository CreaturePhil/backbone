require.config({
  paths: {
    jquery: 'vendor/jquery.min',
    underscore: 'vendor/underscore-min',
    backbone: 'vendor/backbone-min',
    text: 'vendor/text',
    foundation: 'vendor/foundation.min'
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'foundation': {
      deps: ['jquery']
    }
  }
});

require([
  'jquery',
  'backbone',
  'views/posts',
  'views/edit',
  'foundation'
], function($, Backbone, PostsView, EditView, Foundation) {
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

    render: function() {
      $content.html(this.currentView.render().el); 
    },
    
    home: function() {
      this.before();
      this.currentView = new PostsView();
      this.render();
    },

    edit: function() {
      this.before();
      this.currentView = new EditView(this);
      this.render();
    }
  });

  var router = new Router();

  Backbone.history.start();
});
