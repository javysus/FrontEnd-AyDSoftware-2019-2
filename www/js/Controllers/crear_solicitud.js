var latitud;
var longitud;
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
  }*/

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

        /*geocode(lat + "," + lng)*/
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

/*$("#solicitudForm").submit(function(e) {
  
  e.preventDefault();
  
  $.ajax({
      type: "POST",
      headers: {'Authorization': 'Bearer ' + window.localStorage.getItem("token")},
      url: "http://solicitudesnogal.herokuapp.com/v1/consulta/consulta",
      data: JSON.stringify( {id: 1, tecnico: 2 }),
      contentType: "application/json",
      dataType: 'json',
      cache: false,
      success: function() {
          console.log("Funo Intoxic");
          
      },

      error: function(){
          console.log("Ha ocurrido un error");
          window.location.href = "./sol_error.html";
      }
  });
  return false;
})*/

/*Si solicitudform se ejecuta pasara esto: Se asume que se permite la geolocalización
$("#solicitudForm").submit(function(e) {

  e.preventDefault();

  $.ajax({
    type: "GET",
    url: "https://nogal.herokuapp.com/obtenerID/"+window.localStorage.getItem("token"),
    contentType: "application/json",
    dataType: 'json',
    cache: false,
    success: function(id_cliente) {
        console.log(id_cliente);
        $.ajax({
          type: "POST",
          headers: {'Authorization': 'Bearer ' + window.localStorage.getItem("token")},
          url: "https://nogal.herokuapp.com/crearsolicitud",
          data: JSON.stringify({cliente: id_cliente, asunto: $("#asunto").val(), categoria: $("#categoria").val(), descripcion: $("#descripcion").val()
                }),
          contentType: "application/json",
          dataType: "json",
          cache: false,
          success: function(){
            console.log("La solicitud se ha ingresado con exito");
          },

          error: function(){
            console.log("Ha ocurrido un error al ingresar la solicitud");
          }
        });
    },

    error: function(){
      console.log("Ha ocurrido un error");
    }
  });
  return false;
});*/

$("#solicitudForm").submit(function(e) {

  e.preventDefault();

  $.ajax({
    type: "GET",
    url: "https://nogal.herokuapp.com/obtenerID/"+window.localStorage.getItem("token"),
    contentType: "application/json",
    dataType: 'json',
    cache: false,
    success: function(id_cliente) {
        console.log(id_cliente);

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
            console.log(direccion);

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
                console.log("La solicitud se ha ingresado con exito");
              },
    
              error: function(){
                window.location.href = "./sol_error.html";
                console.log("Ha ocurrido un error al ingresar la solicitud");
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

/*$.ajax({
  url: 'https://api.opencagedata.com/geocode/v1/json',
  method: 'GET',
  data: {
    'key': '4b3b81ad4a894e0199e670f36dc478c7',
    'q': latitud + ',' + longitud
  },
  dataType: 'json',
  success: function(respuesta){
    var direccion = response.results[0].formatted;
    console.log(direccion);
  }
});*/


/*$.ajax({
  type: "GET",
  url: "https://nogal.herokuapp.com/obtenerUser/"+window.localStorage.getItem("token"),
  contentType: "application/json",
  dataType: 'json',
  cache: false,
  success: function(user_cliente) {
      console.log(user_cliente);
  },

  error: function(){
      console.log("Ha ocurrido un error");
  }
});*/

