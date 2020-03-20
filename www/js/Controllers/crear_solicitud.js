var latitud;
var longitud;

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

        latitud = position.coords.latitude;
        longitud = position.coords.longitude;

        var myLatlng = new google.maps.LatLng(latitud, longitud)

        var marker = new google.maps.Marker({
        position: myLatlng
        });

        marker.setMap(map);
        map.setCenter(pos);
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

}

$("#solicitudForm").submit(function(e) {

  e.preventDefault();

  $.ajax({
    type: "GET",
    url: "https://nogal.herokuapp.com/obtenerID/"+window.localStorage.getItem("token"),
    contentType: "application/json",
    dataType: 'json',
    cache: false,
    success: function(id_cliente) {
        $.ajax({
          url: 'https://api.opencagedata.com/geocode/v1/json',
          method: 'GET',
          data: {
            'key': '4b3b81ad4a894e0199e670f36dc478c7',
            'q': latitud + ',' + longitud
          },
          dataType: 'json',
          success: function(respuesta){
            var direccion = respuesta.results[0].formatted;

            $.ajax({
              type: "POST",
              headers: {'Authorization': 'Bearer ' + window.localStorage.getItem("token")},
              url: "https://nogal.herokuapp.com/crearsolicitud",
              data: JSON.stringify({cliente: id_cliente, asunto: $("#asunto").val(), categoria: $("#categoria").val(), descripcion: $("#descripcion").val(),
                    latitud: latitud, longitud: longitud, direccion: direccion}),
              contentType: "application/json",
              dataType: "json",
              cache: false,
              success: function(){
                window.location.href = "./sol_enviada.html";
              },
    
              error: function(){
                window.location.href = "./sol_error.html";
              }
            });
          },

          error: function(){
            console.log("No se ha podido obtener la localización")
          }
        });
    },

    error: function(){
      console.log("Ha ocurrido un error");
    }
  });
  return false;
});

