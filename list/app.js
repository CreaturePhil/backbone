$(function() {
  var ItemModel = Backbone.Model.extend({
    defaults: {
      data: ''
    }
  });

  var ItemView = Backbone.View.extend({
    tagName: 'li',
    render: function() {
      this.$el.html(this.model.toJSON().data);
      console.log(this.$el)
      return this;
    }
  });

  var ItemList = Backbone.Collection.extend({
    model: ItemModel
  });

  var Lists = new ItemList;

  var ListView = Backbone.View.extend({
    el: '#main',

    events: {
      'keypress #new-item': 'create'
    },

    initialize: function() {
      this.input = this.$('#new-item');
      console.log('hi')
      this.listenTo(Lists, 'add', this.addOne);
      console.log('hi')
    },

    create: function(e) {
      console.log(e.keyCode);
      if (e.keyCode !== 13) return;
      if (!this.input.val()) return;

      console.log('hi');
      Lists.add([{data: this.input.val()}]);
      this.input.val('');
    },

    addOne: function(item) {
      console.log('added!')
      var view = new ItemView({model: item});
      console.log(view.render().val);
      this.$('#list').append(view.render().el);
    }
  });

  var List = new ListView;
});
