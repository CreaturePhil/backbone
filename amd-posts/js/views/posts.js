define([
  'underscore',
  'backbone',
  'collections/posts',
  'text!templates/posts.html'
], function(_, Backbone, Posts, postsTemplate) {
  var PostsView = Backbone.View.extend({
    el: '.container',
    template: _.template(postsTemplate),
    initialize: function() {
      this.listenTo(Posts, 'sync', this.render);
      Posts.fetch();
    },
    render: function() {
      this.$el.html(this.template({posts: Posts.models}));
    }
  });

  return PostsView;
});
