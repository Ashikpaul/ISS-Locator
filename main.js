var countryCodes;
var callOnce = true;
var mymap = L.map('mapid');
var marker = null;

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoiYXNoaWtwYXVsIiwiYSI6ImNrYWFwdWlqYjB1dHYzMnM5ZmhybXoweXUifQ.c-RJnUB83cyvk-o0iUnhQQ'
}).addTo(mymap);

var LeafIcon = L.Icon.extend({
  options: {
    shadowUrl: 'rocket.png',
    iconSize: [48, 45],
    shadowSize: [50, 54]
  }
});

locateISS = async () =>{
  await fetch('http://api.open-notify.org/iss-now.json')
    .then(response => response.json())
    .then(data => {
      if(!marker){
        mymap.setView([data.iss_position.latitude, data.iss_position.longitude], 3);
        marker = L.marker([data.iss_position.latitude, data.iss_position.longitude], {
          zIndexOffset: 1000,
          icon: new LeafIcon({iconUrl: 'rocket.png'}),
        }).addTo(mymap);
      }else{
        marker.setLatLng([data.iss_position.latitude, data.iss_position.longitude]);
        marker.update();
      }
      setTimeout(()=>{ locateISS(); },2000);
    }).catch((err)=>{ console.log(err); });
}

locateISS();