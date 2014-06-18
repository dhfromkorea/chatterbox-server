// YOUR CODE HERE:
var app = {};

var Message = Backbone.Model.extend({
   idAttribute: 'objectId'
 });

var Room = Backbone.Collection.extend({
  url: 'https://api.parse.com/1/classes/chatterbox',
  model: Message,
  parse: function(response){
    return response.results;
  },
  initialize: function() {
    this.fetch({data: {'order':'-createdAt'}});
    // setInterval(this.fetch({data: {'order':'-createdAt'}})
    //   .bind(this), 1000);
  },
});

var RoomView = Backbone.View.extend({
   initialize: function(){
     this.collection.on('add', function(model){
      var temp = new MessageView({model:model});
      console.log(temp.render().el);
      this.$el.append(temp.render().el);
     },this);
   }}
   );

var MessageView = Backbone.View.extend({
  render: function(){
    var template = _.template('<div>hello I am a superhuman</div>');
    this.$el.html(template(this.model.attributes));
    return this;
  }
});

$(function(){
  var room = new Room();
  var roomView = new RoomView({collection: room, el: $('#chats')});
});
