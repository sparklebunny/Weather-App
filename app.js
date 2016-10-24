$(document).ready(function() {

	//needed before API URL in Codepen
	//https://crossorigin.me/

		function getLocation() {

			// Check to see if the browser supports the GeoLocation API.
			if ("geolocation" in navigator) {
				navigator.geolocation.getCurrentPosition(successLocation,failLocation); 
			} else {
			  // Print out a message to the user.
			  alert('Oh no! Your browser does not support GeoLocation.');
			}
		

			function successLocation(position) {
				var lat = (position.coords.latitude);
				var lon = (position.coords.longitude);
				currentWeather(lat,lon);

			};

			function failLocation(error) {
			alert("Yikes! Geolocation did not compute.");
			console.log(error);
			};
		};

		var location;
		var temp_f;
		var temp_c;
		var humid;
		var windMPH;
		var windKPH;
		var weatherText;
		var weatherIcon;

		function currentWeather(lat, lon) {
			$.ajax( {
				url: "http://api.wunderground.com/api/909354c576a9f2c6/geolookup/location/conditions/q/" + lat + "," + lon + ".json",
				// url: "http://api.wunderground.com/api/909354c576a9f2c6/geolookup/conditions/icon/q/WA/Seattle.json",

				dataType: "jsonp",
				success: function(parsed_json) {
					location = parsed_json.current_observation.display_location.city;
					temp_f = parsed_json.current_observation.temp_f;
					temp_c = parsed_json.current_observation.temp_c;
					humid = parsed_json.current_observation.relative_humidity;
					windMPH = parsed_json.current_observation.wind_mph;
					windKPH = parsed_json.current_observation.wind_kph;
					weatherText = parsed_json.current_observation.weather;
					weatherIcon = parsed_json.current_observation.icon_url;
					$("#current_location").html(location);
					$("#weather_temp").html(temp_f + " &deg;F");
					$("#weather_description").html(weatherText);
					$("#weather_humid").html("Humidity: " + humid);
					$("#weather_wind").html("Wind Speed: " + windMPH + "mph");
					$("#weather_icon").attr("src", weatherIcon); 

					weatherBG(weatherText);

				}
			});
		}; 
		
		getLocation();


	function weatherBG(weatherText){

		var bgURL = null;

		switch(weatherText) {
			case "Clear":
				bgURL = "http://www.codedini.com/codepen-projects/weather_app/assets/sunny-sf-bridge.gif";
				break;
			case "Cloudy":
				bgURL = "http://www.codedini.com/codepen-projects/weather_app/assets/cloud-forest-trees.gif";
				break;
			case "Sunny":
				bgURL = "http://www.codedini.com/codepen-projects/weather_app/assets/sunny-ocean.gif";
				break;
			case "Fog":
			case "Haze":
				bgURL = "http://www.codedini.com/codepen-projects/weather_app/assets/fog-over-trees.gif";
				break;
			case "Mostly Cloudy":
			case "Mostly Sunny":
			case "Partly Cloudy":
			case "Partly Sunny":
			case "Scattered Clouds":
				bgURL = "http://www.codedini.com/codepen-projects/weather_app/assets/partly-sunny-cloudy-summer.gif";
				break;
			case "Rain":
			case "Freezing Rain":
			case "Light Rain":
			case "Heavy Rain":
				bgURL = "http://www.codedini.com/codepen-projects/weather_app/assets/nature-rain.gif";
				break;
			case "Sleet":
			case "Snow":
			case "Flurries":
				bgURL = "http://www.codedini.com/codepen-projects/weather_app/assets/winter-snow.gif";
				break;
			case "Thunderstorms":
			case "Thunderstorm":
				bgURL = "http://www.codedini.com/codepen-projects/weather_app/assets/lighting-storm.gif";
				break;
			case "Overcast":
				bgURL = "http://www.codedini.com/codepen-projects/weather_app/assets/overcast-forest-trees.gif";
				break;
		}

		if (bgURL != null) {
				$("body").css("background-image", "url(" + bgURL + ")");

			} else {
				$("body").css("background", "#fdfae8");
				$("#weather_icon").attr("src", weatherIcon); 
			};
	};


	// Switch temp between F and C

	$("#weather_temp").bind('click', function() {
	    $(this).html($(this).html() == temp_f + " °F" ? temp_c + " °C" : temp_f + " °F");
	});


}); // FIN