var osm = L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://stamen.com">Stamen Design</a>' 
    });

var map = L.map('map', {
	center: [47.624215, -122.334931],
	zoom: 12,
	layers: [osm]
});

L.control.locate({
  locateOptions: {
    maxZoom: 16
  },
  follow: true
}).addTo(map);

L.control.scale().addTo(map);

var url = 'http://data.seattle.gov/resource/7ckr-2zz9.json';

$(document).ready(function() {
  $.getJSON(url, function(data, textStatus) {
    $.each(data, function(i, entry) {
      L.marker([entry.latitude, entry.longitude]).addTo(map)
       .bindPopup('<a href="' + entry.website.url + 
                   '">' + entry.common_name + 
                  '</a><br>' + entry.address);
    });
  });
});

