/*document.addEventListener("deviceready", function(){
    $.ajax({
        type: "GET",
        url: "https://nogal.herokuapp.com/obtenerUser/"+window.localStorage.getItem("token"),
        contentType: "application/json",
        dataType: 'json',
        cache: false,
        success: function(response) {
            console.log(response);
            $("#bar_user").append(response+'<img src="./img/user_icon.png" style="width:20px;height:20px;"> ');
        },

        error: function(){
            console.log("Ha ocurrido un error");
        }
    });
});*/

$(document).ready(function(){ 
$('#welcome').animate({fontSize: '4em'}, "slow")});

