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
    setInterval(this.fetch.bind(this, {data: {'order':'-createdAt'}} )
    , 1000);
  },
});

var RoomView = Backbone.View.extend({
  initialize: function(){
    this.collection.on('add', function(model){
      var temp = new MessageView({model:model});
      this.$el.prepend(temp.render().el);
    },this);
  }
});

var MessageView = Backbone.View.extend({
  render: function(){
    var message = this.model.attributes;
    var template = _.template('<span><%= _.escape(username) %></span><span> : <%= _.escape(text) %> </span>');
    message.text = message.text || '';
    message.username = message.username || '';
    this.$el.html(template(message));
    return this;
  }
});

var SubmitView = Backbone.View.extend({
  model: Message,
  events: {
    'submit': 'submit'
  },
  submit: function(e) {
    e.preventDefault();
    var message = {
      text: this.$('input[name=message]').val(),
      username: window.location.search.split('?username=')[1]
      // roomname prop should be created here.
    };
    this.collection.create({
      text: message.text,
      username: message.username
    });
    $("input[name=message]").val("");
  }
});

$(function(){
  var room = new Room();
  var roomView = new RoomView({collection: room, el: $('#chats')});
  var submitView = new SubmitView({collection: room, el:$('#send')});
});
