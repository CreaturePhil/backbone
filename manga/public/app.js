var MangaModel = Backbone.Model.extend({
  url: '/mangas/naruto',
  defaults: {
    title: null,
    description: null,
    volumes: 0
  }
});

var naruto = new MangaModel();

naruto.fetch().then(function() {
  console.log(naruto.get('title'));
  console.log(naruto.get('description'));
  naruto.set('volumes', 72);
  console.log(naruto.get('volumes'));
  naruto.save();
});
