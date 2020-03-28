function inicio(token){
    $.ajax({
        type: "GET",
        url: "https://nogal.herokuapp.com/obtenerRol/"+token,
        contentType: "application/json",
        dataType: 'text',
        cache: false,
        success: function(rol){
            if(rol=="ROLE_USER"){
                window.location.href = "./inicio.html"
            }
            else if (rol=="ROLE_TEC"){
                window.location.href = "./inicio_tecnico.html"
            }
            else{
                window.location.href = "./inicio_admin.html"
            }
        },

        error: function(){
            console.log('Ha ocurrido un error al obtener el rol de usuario')
        }
    });
}




$("#loginForm").submit(function(e) {
    e.preventDefault();

    $.ajax({
        type: "POST",
        url: "https://nogal.herokuapp.com/autentificar",
        data: JSON.stringify( { username: $("#username").val(), password: $("#password").val() } ),
        contentType: "application/json",
        dataType: 'json',
        cache: false,
        success: function(res) {
            window.localStorage.setItem("token", res["jwt"]);
            window.localStorage.setItem("username", $("#username").val());
            inicio(res["jwt"]);
        },

        error: function(){
            console.log("Ha ocurrido un error");
        }
    });
    return false;
});