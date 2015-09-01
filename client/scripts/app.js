// YOUR CODE HERE:

var message = {
  username: 'artemmike',
  text: 'hi',
  roomname: 'elitehaxxersonly'
};

// post message button
// $('body').append('<button id="post"></button>');
$('#post').on('click', function(){
  message['text'] = $('textarea').val();
  
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
      console.log(data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
});


var escapeHTML = function(unsafe) {
    var result = unsafe.replace(/</g, "&lt;");
    console.log(result);
    return result;
         // .replace(/&/g, "&amp;")
         // .replace(/</g, "&lt;")
         // .replace(/>/g, "&gt;")
         // .replace(/"/g, "&quot;")
         // .replace(/'/g, "&#039;");
 };


//display messages
$.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'GET',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    var arrayOfWeWant = data['results'];
    _.each(arrayOfWeWant, function(obj){
      if (obj['text']) {
        var text = obj['text'];
        var escaped = escapeHTML(text);
        // $('.messages').append('<p>' + text +'</p>');  
        $('.messages').append('<p>' + escaped +'</p>');  
      }
      
    }); 
    // console.log('chatterbox: Message received');
    // console.log(data);
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to receive message');
  }
});
