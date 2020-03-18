document.addEventListener("deviceready", function(){
    $.ajax({
        type: "GET",
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem("token")
        },
        
    });
});
