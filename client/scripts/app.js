// YOUR CODE HERE:
//Set username from initialize
var test = window.location.search;
var test1 = test.split('=');
// console.log(test1);
var answer = test1[1];
// console.log(answer);

// console.log(window.location.href);
var message = {
  username: window.location.search.split('=')[1],
  text: 'hi',
  roomname: 'wealreadyescapedyou'
};

//Object container for unique roomnames
var roomnames = {
  //roomnames: roomnames,
};
var friends = {};
//Curret Interval Running
var currentInterval;

// post message button
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

//Initialize
// While no room is selected use this set Interval
currentInterval = setInterval( function() {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      var arrayOfWeWant = data['results'];
      $('p').remove();
      _.each(arrayOfWeWant, function(obj){
        // if roomnames exists
        if (obj['roomname']) {
          // if roomname key is not in roomnames
          if (!(obj['roomname'] in roomnames)){
            // overwrite roomname key
            roomnames[obj['roomname']] = obj['roomname'];
            // append option value
            $(".dropdown").append('<option value=' + _.escape(roomnames[obj['roomname']]) + '>' + _.escape(obj['roomname']) + '</option>');
          }
        }
        if (obj['text']) {
          var text = obj['text'];
          var escaped = _.escape(text);
          //if this is a friend
          if ([obj['username']] in friends){
            $('.messages').append('<p>' + '<a href="javascript:void(0);">' + _.escape(obj['username']) + '</a>' + ': ' + '<strong>' + escaped + '</strong>' + '</p>'); 
          //else if this is not a friend
          } else {
          $('.messages').append('<p>' + '<a href="javascript:void(0);">' + _.escape(obj['username']) + '</a>' + ': ' + escaped +'</p>');   
          }
        }
        $('a').on('click', function() {
          friends[$(this).text()] = $(this).text();
          console.log('test1');
        });
      }); 
     },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive message');
    }
  });
}, 5000);

//When a user is selected
//Select anchor node and get its text value
  // put this value inside our friends container
  



// When option is selected
$(".dropdown").change(function(){
  // clarify room selected
  var roomSelected = $('.dropdown').val();
  message.roomname = roomSelected;
  //turn off the current setInterval
  clearInterval(currentInterval);
  // remove all p elements
  $("p").remove();
  // if new room is selected
  if (roomSelected === 'New Room'){
    var answer = '' + prompt('What room name would you like?');
    //append answer to the dropdown menu
    $('.dropdown').append('<option value=' + _.escape(answer) + '>' + _.escape(answer) + '</option>');
    alert('Room created');
  }
  //set a new interval
  currentInterval = setInterval( function() {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        $('p').remove();
        // this is the array of stuff we're working with
        var arrayOfWeWant = data['results'];
        // filter through the array for matching rooms
        _.each(arrayOfWeWant, function(obj){
          // THIS IS TO KEEP THE dropdown menu UPDATED because this setinterval replaced the original one
          // if roomnames exists
          if (obj['roomname']) {
            // if roomname key is not in roomnames
            if (!(obj['roomname'] in roomnames)){
              // overwrite roomname key
              roomnames[obj['roomname']] = obj['roomname'];
              // append option value
              $(".dropdown").append('<option value=' + _.escape(roomnames[obj['roomname']]) + '>' + _.escape(obj['roomname']) + '</option>');
            }
          }
          // if roomname matches the room we select
          if (obj['roomname'] === roomSelected) {
            // if object text exists
            if (obj['text']) {
              // append escaped username with escaped text
              
              if ([obj['username']] in friends){
                $('.messages').append('<p>' + '<a href="javascript:void(0);">' + _.escape(obj['username']) + '</a>' + ': ' + '<strong>' + _.escape(obj['text']) + '</strong>' + '</p>');
              } else {
                $('.messages').append('<p>' + '<a href="javascript:void(0);">' + _.escape(obj['username']) + '</a>' + ': ' + _.escape(obj['text']) +'</p>');
              }
              $('a').on('click', function() {
                friends[$(this).text()] = $(this).text();
                console.log('test2');
              });
            }
          }
        }); 
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to receive message');
      }
    });
  }, 1000);
});















