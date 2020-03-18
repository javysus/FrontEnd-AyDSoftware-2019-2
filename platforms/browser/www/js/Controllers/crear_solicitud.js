
/*function geocode(query){
    var direccion;
    $.ajax({
      url: 'https://api.opencagedata.com/geocode/v1/json',
      method: 'GET',
      data: {
        'key': '4b3b81ad4a894e0199e670f36dc478c7',
        'q': query
      },
      dataType: 'json',
      statusCode: {
        200: function(response){  // success
          direccion = response.results[0].formatted;
          console.log(direccion);
        }
      }
    });
  }

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6
    });
    infoWindow = new google.maps.InfoWindow;


    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
        };

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        var myLatlng = new google.maps.LatLng(lat, lng)

        var marker = new google.maps.Marker({
        position: myLatlng
        });

        marker.setMap(map);
        map.setCenter(pos);

        var direccion;
        geocode(lat + "," + lng)
    }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
    });
    } else {
    handleLocationError(false, infoWindow, map.getCenter());
    }

    
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                        'Error: El servicio de geolocalización ha fallado.' :
                        'Error: Tu navegador no soporta la geolocalización.');
    infoWindow.open(map);

}*/

/*function ingresarSolicitud(){
  $("#solicitudForm").submit(function(e) {
    console.log('Form submitting');
    e.preventDefault();

    $.ajax({
        type: "POST",
        headers: {'Authorization': 'Bearer ' + window.localStorage.getItem("token")},
        url: "https://nogal.herokuapp.com/v1/solicitud/solicitud",
        data: JSON.stringify( { asunto: $("#asunto").val(), categoria: $("#categoria").val(), descripcion: $("#descripcion").val() } ),
        contentType: "application/json",
        dataType: 'json',
        cache: false,
        success: function() {
            window.location.href = "./sol_enviada.html";
        },

        error: function(){
            window.location.href = "./sol_error.html";
            console.log("Ha ocurrido un error");
        }
    });
    return false;
  });
}
*/

$("#solicitudForm").submit(function(e) {
  
  e.preventDefault();
  
  $.ajax({
      type: "POST",
      headers: {'Authorization': 'Bearer ' + window.localStorage.getItem("token")},
      url: "https://chile-2.herokuapp.com/v1/consulta/consulta",
      data: JSON.stringify( { cliente: 3, tecnico: 1 /*, asunto: $("#asunto").val() }*/ }),
      contentType: "application/json",
      dataType: 'json',
      cache: false,
      success: function() {
          window.location.href = "./sol_enviada.html";
      },

      error: function(){
          console.log("Ha ocurrido un error");
          /*window.location.href = "./sol_error.html";*/
      }
  });
  return false;
})