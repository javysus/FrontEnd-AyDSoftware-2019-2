$(document).ready(function(){ 
    $('#welcome').animate({fontSize: '4em'}, "slow")});

$.ajax({
    type: "GET",
    headers: {'Authorization': 'Bearer ' + window.localStorage.getItem("token")},
    url: "https://nogal.herokuapp.com/solicitudes/"+window.localStorage.getItem("token"),
    contentType: "application/json",
    dataType: 'json',
    cache: false,
    success: function(respuesta) {
        $("#nsol").append(respuesta.length);

    },

    error: function(){
        console.log('Ha ocurrido un error');
    }
});

$("#nombreUsuario").prepend(window.localStorage.getItem("username"))