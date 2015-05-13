define([
  'underscore',
  'backbone',
  'collections/posts',
  'text!templates/posts.html',
  'models/post'
], function(_, Backbone, Posts, postsTemplate, Post) {
  var PostsView = Backbone.View.extend({
    el: '.container',
    template: _.template(postsTemplate),
    initialize: function() {
      this.listenTo(Posts, 'sync', this.render);
      Posts.fetch();
    },
    render: function() {
      this.$el.html(this.template({posts: Posts.models}));
    },
    events: {
      'click .alert': 'delete'
    },
    delete: function(e) {
      var postDetails = JSON.parse(e.currentTarget.dataset.post);
      var post = new Post(postDetails);
      post.destroy()
        .success(function() {
          Posts.fetch();
        });
    }
  });

  return PostsView;
});
