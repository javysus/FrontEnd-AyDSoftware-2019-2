function agregarTecnico(id, especialidad){
    $.ajax({
        type: "POST",
        url: "https://nogal.herokuapp.com/crearTecnico",
        data: JSON.stringify({id: id, especialidad: especialidad}),
        contentType: "application/json",
        dataType: "json",
        cache: false,
        error: function(){
            console.log("Ha ocurrido un error al crear el tecnico")
        }
    });
}

$(document).ready(function(){
    
    $("#userType").change(function(){
        $(this).find("option:selected").each(function(){
            var optionValue = $(this).attr("value");
            if(optionValue=="tecnico"){
                $("#divEspecialidad").show();
            } else{
                $("#divEspecialidad").hide();
            }
        });
        }).change();
    
    $("#registerForm").submit(function(e) {
    e.preventDefault();

    var rol;

    if ($("#userType").val()=='cliente'){
        rol = "ROLE_USER";
    }

    else{
        rol = "ROLE_TEC";
    }
    $.ajax({
        type: "POST",
        url: "https://nogal.herokuapp.com/crear",
        data: JSON.stringify({userName: $("#username").val(), password: $("#password").val(), roles: rol}),
        contentType: "application/json",
        dataType: 'json',
        cache: false,
        success: function(res) {
            console.log(res);
            if(rol=="ROLE_TEC"){
                agregarTecnico(res, $("#tecEspecialidad").val())
            }
            window.location.href = "./registro_exitoso.html";
        },

        error: function(){
            console.log("Ha ocurrido un error");
        }
    })

    return false;
    });
});
