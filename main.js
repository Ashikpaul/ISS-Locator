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
}).addTo(mymap);

var LeafIcon = L.Icon.extend({
  options: {
    shadowUrl: 'rocket.png',
    iconSize: [48, 45],
    shadowSize: [50, 54]
  }
});

locateISS = async () =>{
  await fetch('https://api.wheretheiss.at/v1/satellites/25544')
  .then(response => response.json())
    .then(data => {
      if(!marker){
        mymap.setView([data.latitude, data.longitude], 3);
        marker = L.marker([data.latitude, data.longitude], {
          zIndexOffset: 1000,
          icon: new LeafIcon({iconUrl: 'rocket.png'}),
        }).addTo(mymap);
      }else{
        marker.setLatLng([data.latitude, data.longitude]);
        marker.update();
      }
      setTimeout(()=>{ locateISS(); },2000);
    }).catch((err)=>{ console.log(err); });
}

locateISS();
