$(document).ready(function(){

    $("#confirm").click(function(){
      $("#finalizarModal").on('hidden.bs.modal', function () {
        $("#sol").fadeOut()});
    });
  });

  function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6
    });
    infoWindow = new google.maps.InfoWindow;

    var myLatlng = new google.maps.LatLng(-34.397, 150.644);

    var marker = new google.maps.Marker({position: myLatlng});

    marker.setMap(map);
    map.setCenter({lat: -34.397, lng: 150.644});

}