
$(document).ready(function(){

    var id_sol;
    var monto;
    var fecha;

    $('#verMapa').on('show.bs.modal', function(event) {
      var button = $(event.relatedTarget);
      initMap(button.data('lat'), button.data('lng'));
    });

    $("#precio").click(function(){
        if (this.checked) {
          $("#fecha").removeAttr("disabled");
      } 
      else {
          $("#fecha").attr("disabled", true);
      }
    });

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

    $("#aceptarModal").on('show.bs.modal', function(event){
      var button = $(event.relatedTarget);
      id_sol = button.data('id');
      monto = button.data('precio');
      fecha = button.data('fecha');    
    });

    $("#enviar").click(function(){
      $("#aceptarModal").on('hidden.bs.modal', function () {
        if($('#precio').is(':checked') && $('#fecha').is(':checked')){ /*Precio y fecha fueron aceptados*/
          $.ajax({
            type: "PUT",
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem("token")},
            url: "https://nogal.herokuapp.com/actualizarsolicitud",
            data: JSON.stringify({id: id_sol, aceptada_cli: true, aceptada_fecha: true, aceptada_adm: true, fecha: fecha,
              monto: monto}),
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
        }
        else if($('#precio').is(':checked') && !$('#fecha').is(':checked')){ /*Precio fue aceptado pero no fecha*/
          $.ajax({
            type: "PUT",
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem("token")},
            url: "https://nogal.herokuapp.com/actualizarsolicitud",
            data: JSON.stringify({id: id_sol, aceptada_adm: false, aceptada_cli: true, monto: monto}),
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
        }

        else{ /*Solicitud rechazada*/
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
        }
      });
    });
    
    $("#aceptarFechaModal").on('show.bs.modal', function(event){
      var button = $(event.relatedTarget);
      id_sol = button.data('id');
      monto = button.data('precio');
      fecha = button.data('fecha');    
    });

    $("#aceptar").click(function(){
      $("#aceptarFechaModal").on('hidden.bs.modal', function () {
        $.ajax({
          type: "PUT",
          headers: {'Authorization': 'Bearer ' + window.localStorage.getItem("token")},
          url: "https://nogal.herokuapp.com/actualizarsolicitud",
          data: JSON.stringify({id: id_sol, aceptada_cli: true, aceptada_fecha: true, aceptada_adm: true, fecha: fecha,
            monto: monto}),
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

      $("#rechazar").click(function(){
        $("#aceptarFechaModal").on('hidden.bs.modal', function () {
          $.ajax({
            type: "PUT",
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem("token")},
            url: "https://nogal.herokuapp.com/actualizarsolicitud",
            data: JSON.stringify({id: id_sol, aceptada_cli: true, aceptada_adm: false, monto: monto}),
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
      console.log(!respuesta[i].aceptadaAdm);
      lat = respuesta[i].latitud;
      lng = respuesta[i].longitud;
      let date = new Date(respuesta[i].fecha);
      if(!respuesta[i].aceptada_fecha && respuesta[i].aceptada_cli && !respuesta[i].aceptadaAdm){ /*Caso donde solo se acepto el precio, pero no la fecha. Enviada a administrador*/
        $("#allSolicitudes").append('\
          <div class="card text-center mb-3" id=sol'+respuesta[i].id+'>\
          <div class="card-header">\
              <span class="badge badge-info">$'+respuesta[i].monto+'</span>\
              <span class="badge badge-primary">Enviada</span>'+
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
          </div>\
          ');
      }
      else if (!respuesta[i].aceptadaAdm){ /*Caso en que se espera primera respuesta de administrador*/
        $("#allSolicitudes").append('\
          <div class="card text-center mb-3" id=sol'+respuesta[i].id+'>\
          <div class="card-header">\
              <span class="badge badge-primary">Enviada</span>'+
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
          </div>\
          ');
      }
      else if(respuesta[i].aceptada_tec){ /*Caso en que tecnico confirmo realizacion*/
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
          <button type="button" class="btn btn-outline-success" data-toggle="modal" data-target="#finalizarModal" data-id='+respuesta[i].id+'>\
              Confirmar realización</button>\
          </div>\
          ');
          getUsername(respuesta[i].tecnico, respuesta[i].id);
      }
      else if (respuesta[i].aceptadaAdm && respuesta[i].aceptada_fecha){ /*Caso en que solo queda esperar realizacion de tecnico*/
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
      else if(respuesta[i].aceptadaAdm && respuesta[i].aceptada_cli &&!respuesta[i].aceptada_fecha){ /*Caso en el que solo queda aceptar o rechazar fecha*/
        $("#allSolicitudes").append('\
          <div class="card text-center mb-3" id=sol'+respuesta[i].id+'>\
          <div class="card-header">\
              <span class="badge badge-warning">En espera de aceptar fecha</span>\
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
          <button type="button" class="btn btn-outline-warning" data-toggle="modal" data-target="#aceptarFechaModal" data-id='+respuesta[i].id+
          ' data-precio='+respuesta[i].monto+' data-fecha='+respuesta[i].fecha+' >\
              Responder solicitud</button>\
          </div>\
          ');
      }
      else if (respuesta[i].aceptadaAdm){ /*Caso en el que administrador respondio la solicitud*/
        $("#allSolicitudes").append('\
          <div class="card text-center mb-3" id=sol'+respuesta[i].id+'>\
          <div class="card-header">\
              <span class="badge badge-warning">En espera de ser aceptada</span>\
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
          <button type="button" class="btn btn-outline-warning" data-toggle="modal" data-target="#aceptarModal" data-id='+respuesta[i].id+
          ' data-precio='+respuesta[i].monto+' data-fecha='+respuesta[i].fecha+' >\
              Responder solicitud</button>\
          </div>\
          ');
      }
    }
  }
})