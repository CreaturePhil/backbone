define([
  'underscore',
  'backbone',
  'text!templates/edit.html',
  'models/post',
], function(_, Backbone, editTemplate, Post) {
  var EditView = Backbone.View.extend({
    el: '.container',
    template: _.template(editTemplate),
    initialize: function(router) {
      this.router = router;
      this.render();
    },
    render: function() {
      this.$el.html(this.template());
    },
    events: {
      'submit form': 'save'
    },
    save: function(e) {
      var postDetails = $(e.currentTarget).serializeObject();
      var post = new Post();
      post.save(postDetails)
        .success(function() {
          this.router.navigate('', {trigger: true});
        }.bind(this));
      return false;
    }
  });

  return EditView;
});
