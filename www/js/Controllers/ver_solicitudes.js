
$(document).ready(function(){

    var id_sol;

    $("#finalizarModal").on('show.bs.modal', function(event){
      var button = $(event.relatedTarget);
      id_sol = button.data('id');
    });
    $("#confirm").click(function(){
      $("#finalizarModal").on('hidden.bs.modal', function () {
        $.ajax({
          type: "DELETE",
          headers: {'Authorization': 'Bearer ' + window.localStorage.getItem("token")},
          url: "https://nogal.herokuapp.com/eliminar/"+id_sol,
          contentType: "application/json",
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


function initMap(latitud, longitud) {
  map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: latitud, lng: longitud},
  zoom: 12
  });

  var myLatlng = new google.maps.LatLng(latitud, longitud);

  var marker = new google.maps.Marker({position: myLatlng});

  marker.setMap(map);
  map.setCenter({lat: latitud, lng: longitud});
}

function getUsername(id_usuario, id_sol){
    if(id_usuario==0){
        $("#userCliente"+id_sol).append('Aún no hay un técnico asignado'); 
    }
    else{
        $.ajax({
        type: "GET",
        url: "https://nogal.herokuapp.com/obtenerUser/"+id_usuario,
        contentType: "application/json",
        dataType: 'text',
        cache: false,
        success: function(usuario){
            $("#userCliente"+id_sol).append('Tecnigo asignado: '+usuario); 
        },
        error: function(){
          console.log('Ha ocurrido un error al obtener el usuario')
        }
        });
    }
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
      let date = new Date(respuesta[i].fecha);
      initMap(lat, lng);
      if (!respuesta[i].aceptada_tec){ 
        $("#allSolicitudes").append('\
          <div class="card text-center mb-3" id=sol'+respuesta[i].id+'>\
          <div class="card-header">\
              <span class="badge badge-info">$'+respuesta[i].monto+'</span>'+
              respuesta[i].asunto+
          '</div>\
          <div class="card-body">\
          <h5 class="card-title">'+date+'</h5>\
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
          </div>\
          ');
        getUsername(respuesta[i].tecnico, respuesta[i].id);
      }
      else if(!respuesta[i].finalizada){
        $("#allSolicitudes").append('\
          <div class="card text-center mb-3" id=sol'+respuesta[i].id+'>\
          <div class="card-header">\
              <span class="badge badge-info"$>'+respuesta[i].monto+'</span>'+
              respuesta[i].asunto+
          '</div>\
          <div class="card-body">\
          <h5 class="card-title">'+date+'</h5>\
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
          <button type="button" class="btn btn-outline-success" data-toggle="modal" data-target="#finalizarModal" data-id='+respuesta[i].id+'>\
              Confirmar realización</button>\
          </div>\
          ');
          getUsername(respuesta[i].tecnico, respuesta[i].id);
      }
    }
  }
})