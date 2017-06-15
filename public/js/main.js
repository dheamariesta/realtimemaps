function locationSuccess(position) {
  console.log('Location success')
  var current = {lat: position.coords.latitude, lng: position.coords.longitude};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: current
  });

  var marker = new google.maps.Marker({
    position: current,
    map: map
  });

  socket.emit('newUser', current);
  socket.on('broadcast location', function (data) {
    console.log(data);

    var marker = new google.maps.Marker({
      position: data,
      map: map
    });

  });

}

function locationError() {
  console.log('Cound not get location')
}

// Get user location
function initMap() {
  navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
}


$(document).ready(function() {

socket = io.connect('//127.0.1.1:3000/', {secure: true, transports: ['websocket']});
  socket.on('broadcast message', function (data) {
    console.log(data);

    var msg = $('<div>').text(data);
    // var form = $('form');
    // msg.insertBefore(form);
    $('#chat').append(msg);

  });

  $('#input button').on('click', function(e){
      e.preventDefault();
      var message = $('#input input').val();
      socket.emit('newMessage', message);
      $('#input input').val('');
  });






});
