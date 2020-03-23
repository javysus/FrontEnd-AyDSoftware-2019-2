$("#registerForm").submit(function(e) {
    e.preventDefault();

    var rol;

    if ($("#userType").val()=='Cliente'){
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
})