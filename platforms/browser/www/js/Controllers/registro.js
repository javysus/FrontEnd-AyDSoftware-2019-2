$("#registerForm").submit(function(e) {
    e.preventDefault();

    $.ajax({
        type: "POST",
        url: "https://nogal.herokuapp.com/crear",
        data: JSON.stringify({username: $("#username").val(), password: $("#password").val()}),
        contentType: "application/json",
        dataType: 'json',
        cache: false,
        success: function(res) {
            console.log(res["jwt"]);
            window.localStorage.setItem("token", res["jwt"]);
            window.location.href = "./inicio.html";
        },

        error: function(){
            console.log("Ha ocurrido un error");
        }
    })

    return false;
})