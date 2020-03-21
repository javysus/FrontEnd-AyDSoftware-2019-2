var lat;
var lng;

$(document).ready(function(){

    var id_sol;

    $("#finalizarModal").on('show.bs.modal', function(event){
      var button = $(event.relatedTarget);
      id_sol = button.data('id');
      console.log(id_sol);
    });
    $("#confirm").click(function(){
      $("#finalizarModal").on('hidden.bs.modal', function () {
        
        $.ajax({
          type: "PUT",
          headers: {'Authorization': 'Bearer ' + window.localStorage.getItem("token")},
          url: "https://nogal.herokuapp.com/actualizarsolicitud",
          data: JSON.stringify({id_sol: id_sol, aceptada_tec: true}),
          contentType: "application/json",
          dataType: "json",
          cache: false,
          success: function(){
            $("#sol"+id_sol).fadeOut();
          },

          error: function(){
            console.log('Ha ocurrido un error');
          }
        });
      });
    });
    /*function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: lat, lng: lng},
      zoom: 6
      });
      infoWindow = new google.maps.InfoWindow;
    
      var myLatlng = new google.maps.LatLng(lat, lng);
    
      var marker = new google.maps.Marker({position: myLatlng});
    
      marker.setMap(map);
      map.setCenter({lat: lat, lng: lng});
    }*/
  });

/*function confirmarSolicitud(id_sol){
  $("#confirm").click(function(){
      $("#finalizarModal").on('hidden.bs.modal', function () {
        $("#sol"+id_sol).fadeOut();
      });
    });
}*/


function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: lat, lng: lng},
  zoom: 6
  });
  infoWindow = new google.maps.InfoWindow;

  var myLatlng = new google.maps.LatLng(lat, lng);

  var marker = new google.maps.Marker({position: myLatlng});

  marker.setMap(map);
  map.setCenter({lat: lat, lng: lng});
}

$.ajax({
  type: "GET",
  headers: {'Authorization': 'Bearer ' + window.localStorage.getItem("token")},
  url: "https://nogal.herokuapp.com/solicitudes/"+window.localStorage.getItem("token"),
  contentType: "application/json",
  dataType: 'json',
  cache: false,
  success: function(respuesta) {
    for (var i = respuesta.length - 1; i >= 0; i--){
      console.log(respuesta[i]);
      lat = respuesta[i].latitud;
      lng = respuesta[i].longitud;
      if (!respuesta[i].aceptada_tec){ 
        $("#allSolicitudes").append('\
          <div class="card text-center mb-3" id=sol'+respuesta[i].id+'>\
          <div class="card-header">\
              <span class="badge badge-primary">'+respuesta[i].precio+'</span>'+
              respuesta[i].asunto+
          '</div>\
          <div class="card-body">\
          <h5 class="card-title">'+respuesta[i].fecha+'</h5>\
          <p>\
              <button type="button" class="btn btn-link" data-toggle="modal" data-target="#verMapa" data-lat='+respuesta[i].latitud+' data-lng='+
              +respuesta[i].longitud+'>'+respuesta[i].direccion+
              '</button>\
          </p>\
          <h6 class="card-title">'+respuesta[i].categoria+'</h5>\
          <h6 class="card-title">Nombre del cliente</h5>\
          <p>\
              <a class="btn btn-dark" data-toggle="collapse" href="#descripcion'+respuesta[i].id+'" role="button" aria-expanded="false" aria-controls="collapseExample">\
              Descripción\
              </a>\
              </p>\
              <div class="collapse" id="descripcion'+respuesta[i].id+'">\
              <div class="card card-body">'+
                  respuesta[i].descripcion+
              '</div>\
          </div>\
          <button type="button" class="btn btn-outline-success" data-toggle="modal" data-target="#finalizarModal" data-id='+respuesta[i].id+'>\
              Confirmar realización</button>\
          </div>\
          ');
      }
    }
  }
})


