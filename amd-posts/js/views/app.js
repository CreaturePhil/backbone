define([
  'backbone'
], function(Backbone) {
  var AppView = Backbone.View.extend({
    el: '.container',
    initialize: function() {
      this.render();
    },
    render: function() {
      this.$el.html($('<h1>').text('Hello World!'));
    }
  });

  return AppView;
});
