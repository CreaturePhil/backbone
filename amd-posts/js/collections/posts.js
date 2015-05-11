define([
  'backbone',
  'models/post'
], function(Backbone, Post) {
  var PostsCollection = Backbone.Collection.extend({
    url: '/posts'
  });

  return new PostsCollection();
});
