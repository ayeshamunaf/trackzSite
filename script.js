// google map api key
var api_key = 'AIzaSyA0lT3ozQvM8lueMi-_nlZOwLmfGMU7dWY'; 
var map;

 function initMap() {
    var myLatLng = {lat: -40.900557, lng: 174.88597100000004};

    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: myLatLng
    });
}


document.getElementById("file-input").onchange = function(e) {

	// all the data
	EXIF.getData(e.target.files[0], function() {

		var data = EXIF.getAllTags(this);
		console.log(data);

		var lat = data.GPSLatitude;
		var lon = data.GPSLongitude;
		var latRef = data.GPSLatitudeRef || "N";
		var lonRef = data.GPSLongitudeRef || "W";

		//Didnt work 
		//var decimalLat = (lat[0].numerator + lat[1].numerator/60 + lat[2].numerator/3600) * (latRef == 'N' ? 1 : -1);
		//var decimalLon = (lon[0].numerator + lon[1].numerator/60 + lon[2].numerator/3600) * (lonRef == 'W' ? -1 : 1);

		var decimalLat = toDecimal(lat) * (latRef == 'N' ? 1 : -1);
		var decimalLon = toDecimal(lon) * (lonRef == 'W' ? -1 : 1) ;


		console.log(decimalLat);
		console.log(decimalLon);

		// Place maker on map from image
		var marker = new google.maps.Marker({
	      position: {lat: decimalLat, lng: decimalLon},
	      map: map,
	      title: 'I was here'
	    });
	    map.setCenter({lat: decimalLat, lng: decimalLon});


		// Displays the image woo
		var reader = new FileReader();
		reader.onload = function (e) {
			$('#blah').attr('src', e.target.result);
		}

		reader.readAsDataURL(e.target.files[0]);
});
}

// Sourced from http://blogs.microsoft.co.il/ranw/2015/01/07/reading-gps-data-using-exif-js/
function toDecimal  (number) {
	       return number[0].numerator + number[1].numerator /
	           (60 * number[1].denominator) + number[2].numerator / (3600 * number[2].denominator);
};