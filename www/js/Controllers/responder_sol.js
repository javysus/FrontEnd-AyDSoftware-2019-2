var lat;
var lng;

$(document).ready(function(){

    var id_sol;

    $("#finalizarModal").on('show.bs.modal', function(event){
      var button = $(event.relatedTarget);
      id_sol = button.data('id');
      fecha = button.data('fecha');
      monto = button.data('monto');
      tecnico = button.data('tecnico');
    });
    $("#confirm").click(function(){
      $("#finalizarModal").on('hidden.bs.modal', function () {
        
        $.ajax({
          type: "PUT",
          headers: {'Authorization': 'Bearer ' + window.localStorage.getItem("token")},
          url: "https://nogal.herokuapp.com/actualizarsolicitud",
          data: JSON.stringify({id: id_sol, aceptada_tec: true, aceptada_precio: true, aceptada_fecha: true, aceptada_adm: true, fecha: fecha,
          monto: monto, tecnico: tecnico}),
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
  });

function getUsername(id_usuario, id_sol){
  
  $.ajax({
      type: "GET",
      url: "https://nogal.herokuapp.com/obtenerUser/"+id_usuario,
      contentType: "application/json",
      dataType: 'text',
      cache: false,
      success: function(usuario){
        $("#userCliente"+id_sol).append(usuario);
      },
      error: function(){
        console.log('Ha ocurrido un error al obtener el usuario')
      }
  });
}

function initMap(latitud, longitud) {
  map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: latitud, lng: longitud},
  zoom: 15
  });

  var myLatlng = new google.maps.LatLng(latitud, longitud);

  var marker = new google.maps.Marker({position: myLatlng});

  marker.setMap(map);
  map.setCenter({lat: latitud, lng: longitud});
}

$.ajax({
  type: "GET",
  /*headers: {'Authorization': 'Bearer ' + window.localStorage.getItem("token")},*/
  url: "https://nogal.herokuapp.com/solicitudesAdmin",
  contentType: "application/json",
  dataType: 'json',
  cache: false,
  success: function(respuesta) {
    for (var i = respuesta.length - 1; i >= 0; i--){
        lat = respuesta[i].latitud;
        lng = respuesta[i].longitud;
        initMap(lat, lng);
        $("#allSolicitudes").append('\
            <div class="card text-center mb-3" id=sol'+respuesta[i].id+'>\
            <div class="card-header">'+
                respuesta[i].asunto+
            '</div>\
            <div class="card-body">\
            <p>\
                <button type="button" class="btn btn-link" data-toggle="modal" data-target="#verMapa" data-lat='+respuesta[i].latitud+' data-lng='+
                +respuesta[i].longitud+'>'+respuesta[i].direccion+
                '</button>\
            </p>\
            <h6 class="card-title">'+respuesta[i].categoria+'</h6>\
            <h6 class="card-title" id="userCliente'+respuesta[i].id+'"></h6>\
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
            <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#responderSol" data-id='+respuesta[i].id+'>\
                Responder solicitud</button>\
            </div>\
            ');
        getUsername(respuesta[i].cliente, respuesta[i].id);
    }
  }
})