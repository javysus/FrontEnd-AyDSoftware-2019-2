$(document).ready(function(){

    $("#nombreUsuario").prepend(window.localStorage.getItem("username"))

    var id_sol;
    var monto;
    var fecha;
    var ca;
    $('#verMapa').on('show.bs.modal', function(event) {
        var button = $(event.relatedTarget);
        initMap(button.data('lat'), button.data('lng'));
    });

    $(".bd-example-modal-sm").on('show.bs.modal', function(event){
      var button = $(event.relatedTarget);
      id_sol = button.data('id');
      monto = button.data('precio');
      fecha = button.data('fecha');
      ca = this.id.slice(-2);
      $("#enviar"+ca).click(function(){
        $("#asignarTecnico"+ca).on('hidden.bs.modal', function () {
          $.ajax({
              type: "PUT",
              headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem("token") },
              url: "https://nogal.herokuapp.com/actualizarsolicitud",
              data: JSON.stringify({
                  id: id_sol, aceptada_tec: false, aceptada_cli: true, aceptada_fecha: true, aceptada_adm: true, fecha: fecha,
                  monto: monto, tecnico: $("#selectTecnicos"+ca).val()
              }),
              contentType: "application/json",
              dataType: "json",
              cache: false,
              success: function () {
                  $("#sol" + id_sol).fadeOut();
              },
  
              error: function () {
                  console.log('Ha ocurrido un error');
              }
            
          });
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



function getModalID(categoria){
    if (categoria == "Climatización"){
        return "CL";
    }
    else if (categoria == "Línea blanca Cocina"){
        return "CO";
    }
    else if (categoria == "Línea blanca Lavado"){
        return "LA";
    }
    else if (categoria == "Refrigeración"){
        return "RE";
    }
    else if (categoria == "Calefacción"){
        return "CA";
    }
    else {
        return "EL";
    }
}

function addTecnicosUser(ca, id_tec){
    $.ajax({
        type: "GET",
        url: "https://nogal.herokuapp.com/obtenerUser/"+id_tec,
        contentType: "application/json",
        dataType: 'text',
        cache: false,
        success: function(usuario){
            $("#selectTecnicos"+ca).append('<option value="'+id_tec+'">'+usuario+'</option>')
        },
        error: function(){
          console.log('Ha ocurrido un error al obtener el usuario del tecnico')
        }
    });
}

function getTecnicosUsernames(categoria, ca){
    
    $.ajax({
        type:"GET",
        url: "https://nogal.herokuapp.com/tecnicosEspecialidad/"+categoria,
        contentType: "application/json",
        dataType: 'json',
        cache: false,
        success: function(tecnicos){
            for (var i = tecnicos.length - 1; i >= 0; i-- ){
                var id_tec = tecnicos[i].id;
                addTecnicosUser(ca,id_tec);
                
            }
        },
        error: function(){
            console.log("No se ha podido obtener los tecnicos de especialidad")
        }
    })
}



/*Cargar modales segun categoria*/
function cargarModales(){
    getTecnicosUsernames('Climatización','CL');
    getTecnicosUsernames('Línea blanca Cocina','CO');
    getTecnicosUsernames('Línea blanca Lavado','LA');
    getTecnicosUsernames('Refrigeración','RE');
    getTecnicosUsernames('Calefacción','CA');
    getTecnicosUsernames('Electrodomésticos','EL');
}

$.ajax({
    type: "GET",
    /*headers: {'Authorization': 'Bearer ' + window.localStorage.getItem("token")},*/
    url: "https://nogal.herokuapp.com/asignarTecnicos",
    contentType: "application/json",
    dataType: 'json',
    cache: false,
    success: function(respuesta) {
        cargarModales();
        for (var i = respuesta.length - 1; i >= 0; i--){
            lat = respuesta[i].latitud;
            lng = respuesta[i].longitud;
            modalID = getModalID(respuesta[i].categoria);
            let date = new Date(respuesta[i].fecha);
            initMap(lat, lng);
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
            <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#asignarTecnico'+modalID+'" data-id='+respuesta[i].id+
            ' data-precio='+respuesta[i].monto+' data-fecha='+respuesta[i].fecha+'>\
                Asignar técnico</button>\
            </div>\
            ');
        } 
    },
    error: function(){
        console.log("Ha ocurrido un error al obtener las solicitudes")
    }

});