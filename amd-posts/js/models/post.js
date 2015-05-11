define([
  'backbone'
], function(Backbone) {
  var Post = Backbone.Model.extend({
    urlRoot: '/posts',
    defaults: {
      title: '',
      author: '',
      content: ''
    }
  });

  return Post;
});
