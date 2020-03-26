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
            window.localStorage.setItem("token", res["jwt"]);
            window.location.href = "./registro_exitoso.html";
        },

        error: function(){
            console.log("Ha ocurrido un error");
        }
    })

    return false;
    });
});
