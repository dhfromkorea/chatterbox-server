// YOUR CODE HERE:
var app = {};

var Message = Backbone.Model.extend({
  idAttribute: 'objectId'
});

var Room = Backbone.Collection.extend({
  url: 'https://api.parse.com/1/classes/chatterbox',
  model: Message,
  parse: function(response) {
    return response.results;
  },
  initialize: function() {
    setInterval(this.fetch.bind(this, {
      data: {
        'order': '-createdAt'
      }
    }), 1000);
  }
});

var RoomView = Backbone.View.extend({
  initialize: function() {
    this.collection.on('add', function(model) {
      var messageInstance = new MessageView({
        model: model
      });
      this.$el.prepend(messageInstance.render().el);
    }, this);
    // var roomname = messageInstance.attributes.roomname;
    // if (!_.contains(this.collection.roomnames, roomname)) {
    //   this.collection.roomnames.push(roomname);
    //   this.collection.addRoom(roomname);
    // }
  }
});

var MessageView = Backbone.View.extend({
  tagName: 'li',
  render: function() {
    var message = this.model.attributes;
    var template = _.template('<span class="username"><%= _.escape(username) %> : </span><span class="message" data-id="<%= _.escape(objectId) %>"><%= _.escape(text) %> </span>');
    message.text = message.text || '';
    message.username = message.username || '';
    message.objectId = message.objectId || '';
    this.$el.html(template(message)).addClass('panel');
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
    if (message.text) {
      this.collection.create({
        text: message.text,
        username: message.username
      });
      $("input[name=message]").val("");
    }
  }
});

var SelectView = Backbone.View.extend({
  events: {
    'change': 'chooseRoom'
  },
  chooseRoom: function(e) {
    e.preventDefault();
    var roomname = this.$('label').val();
    this.collection.fetch({
      'order': '-createdAt',
      'where': {
        'roomname': roomname
      }
    });
  }
});
// keep a list of friends
// keep a list of rooms that appeared

$(function() {
  var room = new Room();
  var roomView = new RoomView({
    collection: room,
    el: $('#chats')
  });
  var submitView = new SubmitView({
    collection: room,
    el: $('#send')
  });
  var selectView = new SelectView({
    collection: room,
    el: $('#rooms')
  });
});