const { features } = require("process");

 
function loadLeafletMap () {

	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
        center: [0,0],
        zoom:3
	}).addTo(mymap);
}

function go_to_city (val) {
    if (val === 1) {
        whereWeWork(); // load the org data
    }
    if (val === 2) {
        //mymap.flyTo([51.3919, -1.500292], 7);
        plot_points(); // load the volunteer data
    }
    if (val === 3) {
        mymap.flyTo([52.3336233, 7.1053072], 7);
        loadShapefile(); // load the example shapefile data
    }
} 

// style='width:170px;height:180px;'

// pop ups
function popUpLayoutManager(first, last, role, about, read, music, outside_work, image_src) {
    var html ="<center><img alt='File' src='"+image_src+"' style='border-radius: 50%;width:170px;height:180px;'></center><h> <font size='+2'></img><br>" 
    html = html + "<center>" +first + "  " + last + "</font></h>"
    html = html + "<br>" + role
    html = html + "</center><br><br>" + about
    html = html + "<br><br> <strong> What are you reading?: </strong>  " + read 
    html = html + "<br> <strong>Favourite Band: </strong>  " + music
    html = html + "<br> <strong>Hobbies:  </strong>  " + outside_work

    return html
    console.log(html);
}

function popUpLayout(first, last, role) {
	var html ="<center><h> <font size='+2'></img><br>" 
    html = html + "<center>" +first + "  " + last + "</font></h>"
    html = html + "<br>" + role
	return html
}

// this will be use to plot all of the volunteer locations
function plot_points() {
    // first remove all other layers on the map
    removeLayer();

    for (var i in data['Sheet1']) {

        var latlng = L.latLng({ lat: data['Sheet1'][i]['lat'], lng: data['Sheet1'][i]['lng'] });

        // create an image src based on the name of the input
        var imgsrc = "./images/"+data['Sheet1'][i]['First Name']+".jpeg";
        

		// var testMarkerRed = L.AwesomeMarkers.icon({
				// icon:'play',
				// markerColor:'red'
			// })

		// different popups depending on whether they are a manager or not
		
		if (data['Sheet1'][i]['Manager'] === 1) {
			L.marker( latlng).addTo(mymap).bindPopup(popUpLayoutManager(data['Sheet1'][i]['First Name'], data['Sheet1'][i]['Last Name'], data['Sheet1'][i]['Role'], 
				data['Sheet1'][i]['About'], data['Sheet1'][i]['Currently Reading'], data['Sheet1'][i]['Favourite Band'], data['Sheet1'][i]['Outside Work'], imgsrc));
			
		} else {
			L.marker(latlng).addTo(mymap).bindPopup(popUpLayout(data['Sheet1'][i]['First Name'], data['Sheet1'][i]['Last Name'], data['Sheet1'][i]['Role']));	
		}
    }
}

function removeLayer() {
    // a general function that will remove all layers on a map
    try {
        mymap.eachLayer(function (layer) {
          // this will check if it is layer first, so does not delete map tiles
          if (!!layer.toGeoJSON) {
              mymap.removeLayer(layer);
            }
          })
        } catch {
        console.log('The layers have not been removed');
    } 
}

function orgPopUp(org, desc, spec, url, img_src) {
    var html ="<center><img alt='File' src='"+img_src+"' style='border-radius: 50%;width:170px;height:180px;'></center><h> <font size='+2'></img>" 
    html = html + "<center>" + org + "</font></h>"
    html = html + "<br><a href='"+url+"'>" + url + "</a>"
    html = html + "</center><br><br>" + desc
    html = html + "<br><br> <strong> GIS-E's Role: </strong>  " + spec 

    return html
}

function whereWeWork() {
    // first remove all the other layers and reset the map
    removeLayer();
    mymap.flyTo([0, 0], 3);

    for (var i in orgs['Sheet1']) {
        var latlng = L.latLng({ lat: orgs['Sheet1'][i]['lat'], lng: orgs['Sheet1'][i]['lng'] });

        // create an image src based on the name of the input
        var imgsrc = "/images/"+orgs['Sheet1'][i]['Organisation']+".jpeg";
        
        console.log(imgsrc);

        //L.marker( latlng ).addTo(mymap).bindPopup(orgs['Sheet1'][i]['Organisation']);
        L.marker( latlng ).addTo(mymap).bindPopup(orgPopUp(orgs['Sheet1'][i]['Organisation'], orgs['Sheet1'][i]['Description'], orgs['Sheet1'][i]['Job Spec'], 
            orgs['Sheet1'][i]['Website URL'], imgsrc));

    }

}

function getColour(value) {
    if (value < 10) {
        return 'white'
    }
    if (value > 10 && value < 100 ) {
        return 'blue'
    }
    if (value > 100) {
        return 'red'
    }
}

function loadShapefile() {
    // first remove all the other layers
    removeLayer();

    var nether = L.geoJSON(netherlands_death)
    nether.addTo(mymap);

}