// YOUR CODE HERE:
var app = {};

// =MODEL
var Message = Backbone.Model.extend({
  idAttribute: 'objectId',
  defaults: {
    username: 'John Doe',
    text: 'No message',
    roomname: 'Default lobby'
  }
});

// =COLLECTION
var Room = Backbone.Collection.extend({
  url: 'http://localhost:3000/classes/messages',
  model: Message,
  parse: function(response) {
    return response.results;
  },
  initialize: function() {
    // this.fetch.bind(this);
    setInterval(this.fetch.bind(this), 1000);
  }
});


// =VIEW
var RoomView = Backbone.View.extend({
  events: {
    'click .submit': 'submit'
  },
  initialize: function() {
    _.bindAll(this, 'render', 'submit');
    this.render();
    this.collection.on('add', function(model) {
      this.render();
    }, this);
  },
  render: function() {
    this.$('#chats').children().detach();
    this.$('#chats').append(this.collection.map(function(message) {
      var messageView = new MessageView({
        model: message
      });
      return messageView.render();
    }).reverse());
  },
  submit: function(e) {
    e.preventDefault();
    var message = {
      text: this.$('input[name=message]').val(),
      username: window.location.search.split('?username=')[1],
      roomname: 'default'
    };
    if (message.text) {
      this.collection.create({
        text: message.text,
        username: message.username,
        roomname: message.roomname
      });
      $("input[name=message]").val("");
    }
  }
});

var MessageView = Backbone.View.extend({
  tagName: 'li',
  template: _.template('<span class="username"><%= _.escape(username) %> : </span><span class="message"><%= _.escape(text) %> </span>'),
  render: function() {
    return this.$el.html(this.template(this.model.attributes)).addClass('panel');
  }
});

// var SelectView = Backbone.View.extend({
//   events: {
//     'change': 'chooseRoom'
//   },
//   chooseRoom: function(e) {
//     e.preventDefault();
//     var roomname = this.$('label').val();
//     this.collection.fetch();
//   }
// });

$(function() {
  var room = new Room();
  var roomView = new RoomView({
    collection: room,
    el: $('.app')
  });
});