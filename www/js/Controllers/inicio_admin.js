
$(document).ready(function(){ 
    $('#welcome').animate({fontSize: '4em'}, "slow")
    $("#nombreUsuario").prepend(window.localStorage.getItem("username"))

    
    $.ajax({
        type: "GET",
        url: "https://nogal.herokuapp.com/solicitudesAdmin",
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

    $.ajax({
        type: "GET",
        url: "https://nogal.herokuapp.com/asignarTecnicos",
        contentType: "application/json",
        dataType: 'json',
        cache: false,
        success: function(respuesta) {
            $("#nsolTecnico").append(respuesta.length);
        },

        error: function(){
            console.log('Ha ocurrido un error');
        }
    });

    });