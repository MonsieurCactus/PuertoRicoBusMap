window.onload=function(){

  $.ajax({
    dataType: "json",
    url: 'https://dl.dropboxusercontent.com/u/17949100/OGP/ama.json',
    success: success
  });

  function success(data){
    rtes = [];
    for(j = 0; j < data.length; j++){
      pts = data[j]['geometry']['coordinates'];
      points = [];
      for(i = 0; i < pts.length; i++){
        points.push( [pts[i][1], pts[i][0]])
      }
      rtes.push({ "name": data[j]['properties']['Name'], "path":points});
    }

    id = 'mrcactu5.ibohil52';

    var mapboxUrl = 'https://{s}.tiles.mapbox.com/v3/'+ id  +  '/{z}/{x}/{y}.png';

    var mapboxTiles = L.tileLayer( mapboxUrl , {
      attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
    });

    var map = L.map('map')
          .addLayer(mapboxTiles)
          .setView([18.43, -66.05], 12);



    colors = ["red", "blue", "green"];
    routes = {};
    for(i = 0; i < rtes.length; i++){
      routes[rtes[i]['name']] = L.polyline(
          rtes[i]['path'], { color: colors[Math.floor(Math.random()*colors.length)] }
        );  
    }

    AMAroutes = L.layerGroup( routes  ).addTo(map);
    L.control.layers( null, routes ).addTo(map);
    
    buses = $('.leaflet-control-layers-overlays').children("label")

  }
}//]]>  