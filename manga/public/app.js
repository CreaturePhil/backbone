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

var MangaCollection = Backbone.Collection.extend({
  url: '/mangas',
  model: MangaModel,
  // optional - added to see the data
  parse: function(data) {
    console.log(data);
    return data;
  }
});

var mangas = new MangaCollection();

mangas.fetch().then(function() {
  console.log(mangas.length); 
  console.log(mangas.get(1));
  console.log(mangas.get(2));
  console.log(mangas.at(0));
  console.log(mangas.findWhere({title: 'naruto'}));
});

var MangasListView = Backbone.View.extend({
  el: '#mangas-list',
  initialize: function() {
    console.log(this.collection);
  }
});

// Create a new view instance:
var mangasList = new MangasListView();

// Append content into the view's container element:
mangasList.$el.append('<li>Hello World</li>');

// Find all "li" tags locally within the view's container:
mangasList.$('li');
// Under the hood, using view.$('...') is synonymous with calling
// view.$el.find('...'). These localized queries greatly cut down
// on superfluous DOM operations.

var MangasListItemView = Backbone.View.extend({
  tagName: 'li',
  className: 'manga',
  initialize: function() {
    console.log(this.model);
  }
});

var mangaView = new MangasListItemView({model: naruto});
var mangasView = new MangasListView({collection: mangasList});
