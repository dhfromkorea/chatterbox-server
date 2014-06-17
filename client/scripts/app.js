// YOUR CODE HERE:
var app = {};
app.server ='https://api.parse.com/1/classes/chatterbox';
app.init = function(){
  this.friends = {};
  this.rooms = {};
  this.selectedRoom = undefined;
  $(document).ready(function(){
    $('#send').bind('submit', function(e){
      app.handleSubmit();
      return false;
    });
    $('#roomSelect').on('change', function(){
      app.selectedRoom = this.value;
      app.fetch();
    });
  });
  $('.clearMessagebutton').click(app.addMessage);
  setInterval(this.fetch.bind(app), 1000);
};
app.handleSubmit = function(){
  var message = {};
  message.username = window.location.search.split('?username=')[1];
  message.text = $('#message').val();
  message.roomname = 'default';
  app.send(message);
  $('#message').val('');
};
app.send = function(message){
  $.ajax({
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message');
    }
  });
};
app.fetch = function(){
  var roomname = this.selectedRoom;
  if(roomname !== undefined){
    roomname = '&where={"roomname":"'+roomname+'"}';
  } else {
    roomname = '';
  }
  $.ajax({
    url: this.server,
    type: 'GET',
    data: 'order=-createdAt'+roomname,
    contentType: 'application/json',
    success: function (data) {
      app.clearMessages();
      _.each(data.results, function(message){
        app.addMessage(message);
      });
      var dataLength = (data.results.length > 49) ? 50 : data.results.length;
      for (var i=0; i < dataLength; i++){
        var roomName = data.results[i].roomname;
        if(!app.rooms.hasOwnProperty(roomName)){
          app.rooms[roomName] = true;
          app.addRoom(roomName);
        }
      }
    },
    error: function (data) {
      console.error('chatterbox: Failed to receive messages');
    }
  });
};
app.clearMessages = function(){
  $('#chats').html('');
};
app.addMessage = function(message){
  var div = $('<div>');
  var classUser = 'username';
  if ( this.friends.hasOwnProperty(message.username) ){
    classUser += ' friend';
  }
  // class => username friend
  var $userName = $("<a class='"+classUser+"'>").text(message.username);
  var textMessage = ' : ' + message.text;
  var $message = $('<span>').text(textMessage);
  div.append($userName);
  div.append($message);
  $('#chats').append(div);

  $userName.click(function(){
    console.log('you just added ' + $(this).text() + ' as a friend');
    app.addFriend($(this).text());
  });
};
app.addRoom = function(roomname){
  var option = $('<option>');
  option.text(roomname);
  $('#roomSelect').append(option);
};
app.addFriend = function(newFriend){
  this.friends[newFriend] = newFriend;
};
