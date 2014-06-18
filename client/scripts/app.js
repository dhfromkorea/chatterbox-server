// YOUR CODE HERE:
var app = {};

Message = model;
Room = collection;


var Message = Backbone.Model.extend({
  intialize: function() {
    this.set({
      'room': 'default',
      'text': 'default',
      'username': 'default'
    });
  }
});

var Room = Backbone.Collection.extend({
  url: 'https://api.parse.com/1/classes/chatterbox',
  model: Message,
  initialize: function() {
    // need to fix the lines below
    this.set({
      'friends': {},
      'rooms': {},
      'selectedRooms': undefined
    });
    setInterval(this.refreshMessage.bind(this), 1000);
  },
  refreshMessage: function(){
    this.fetch({
        beforeSend: setHeader,
        data: 'order=-createdAt',
        success: function(collection, response, options) {
          var messages = response.results;
          _.each(messages, room.addMessage, this);
        }
    });
  },
  addMessage: function(message){
    var div = $('<div>');
    var classUser = 'username';
    // if (this.friends.hasOwnProperty(message.username)) {
    //   classUser += ' friend';
    // }
    var $userName = $("<a class='" + classUser + "'>").text(message.username);
    var textMessage = ' : ' + message.text;
    var $message = $('<span>').text(textMessage);
    div.append($userName);
    div.append($message);
    $('#chats').append(div);
  }
});

var RoomView = Backbone.View.extend({

})

var MessageView = Backbone.View.extend({
  // model: Message,
  tagName: 'body',
  // el: 'body',
  // id: 'main',
  events: {
    // 'change #roomSelect':  'roomFetch',
    // 'submit #send': 'handleSubmit',
    'click': 'consoleLog'
  },
  initialize: function(){
    _.bindAll(this, 'consoleLog');
    this.render();
    // this.model.on('', function(){
    //   this.render();
    // }, this);
  },
  consoleLog: function(){
    console.log('hey change binding');
  },
  render: function(){
    var template = _.template($('#main').html(),{});
    return this.$el.html(template);
  },
  roomFetch: function(){

  },
  handleSubmit: function(){

  }
});

// var messageData = {
//   'room': 'default',
//   'text': 'default',
//   'username': 'default'
// };
//var message = new Message(messageData);
var room = new Room();
var setHeader = function(jqXHR) {
    jqXHR.setRequestHeader("X-Parse-Application-Id", "voLazbq9nXuZuos9hsmprUz7JwM2N0asnPnUcI7r");
    jqXHR.setRequestHeader("X-Parse-REST-API-Key", "QC2F43aSAghM97XidJw8Qiy1NXlpL5LR45rhAVAf");
};


var messageView = new MessageView({model: message});


// app.init = function() {
//   this.friends = {};
//   this.rooms = {};
//   this.selectedRoom = undefined;
//   $(document).ready(function() {
//     $('#send').bind('submit', function(e) {
//       app.handleSubmit();
//       return false;
//     });
//     $('#roomSelect').on('change', function() {
//       app.selectedRoom = this.value;
//       app.fetch();
//     });
//   });
//   setInterval(this.fetch.bind(app), 1000);
// };
// app.handleSubmit = function() {
//   var message = {};
//   message.username = window.location.search.split('?username=')[1];
//   message.text = $('#message').val();
//   message.roomname = 'default';
//   app.send(message);
//   $('#message').val('');
// };
// app.send = function(message) {
//   $.ajax({
//     url: app.server,
//     type: 'POST',
//     data: JSON.stringify(message),
//     contentType: 'application/json',
//     success: function(data) {
//       console.log('chatterbox: Message sent');
//     },
//     error: function(data) {
//       console.error('chatterbox: Failed to send message');
//     }
//   });
// };
// app.fetch = function() {
//   var roomname = this.selectedRoom;
//   if (roomname !== undefined) {
//     roomname = '&where={"roomname":"' + roomname + '"}';
//   } else {
//     roomname = '';
//   }
//   $.ajax({
//     url: this.server,
//     type: 'GET',
//     data: 'order=-createdAt' + roomname,
//     contentType: 'application/json',
//     success: function(data) {
//       app.clearMessages();
//       _.each(data.results, function(message) {
//         app.addMessage(message);
//       });
//       var dataLength = (data.results.length > 49) ? 50 : data.results.length;
//       for (var i = 0; i < dataLength; i++) {
//         var roomName = data.results[i].roomname;
//         if (!app.rooms.hasOwnProperty(roomName)) {
//           app.rooms[roomName] = true;
//           app.addRoom(roomName);
//         }
//       }
//     },
//     error: function(data) {
//       console.error('chatterbox: Failed to receive messages');
//     }
//   });
// };
// app.clearMessages = function() {
//   $('#chats').html('');
// };
// app.addMessage = function(message) {
//   var div = $('<div>');
//   var classUser = 'username';
//   if (this.friends.hasOwnProperty(message.username)) {
//     classUser += ' friend';
//   }
//   var $userName = $("<a class='" + classUser + "'>").text(message.username);
//   var textMessage = ' : ' + message.text;
//   var $message = $('<span>').text(textMessage);
//   div.append($userName);
//   div.append($message);
//   $('#chats').append(div);

//   $userName.click(function() {
//     console.log('you just added ' + $(this).text() + ' as a friend');
//     app.addFriend($(this).text());
//   });
// };
// app.addRoom = function(roomname) {
//   var option = $('<option>');
//   option.text(roomname);
//   $('#roomSelect').append(option);
// };
// app.addFriend = function(newFriend) {
//   this.friends[newFriend] = newFriend;
// };
