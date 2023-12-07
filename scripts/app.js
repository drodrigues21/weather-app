// Open weather api key: 
// OmGy68KMwQ86T2tRuaMTpGyjFeNdjp2R

// Open weather CITY url:
// https://dataservice.accuweather.com/locations/v1/cities/search

// Open weather current weather url:
// https://dataservice.accuweather.com/currentconditions/v1/

// Query to get the city on open weather:
// ?apikey=${}&q=${}`;

// Query to get the current conditions:
// `${}?apikey=${}`;


// Get the user input
// Get the city name (h2)
// Get the temp (h3)
// Get the condition

const cityInput = document.querySelector('.search-form');
const city = document.querySelector('.city');
const temp = document.querySelector('.temp');
const condition = document.querySelector('.condition');
const degree = document.querySelector('.degree');


// When page loads, set Seou as default
window.addEventListener('DOMContentLoaded', () => {
   getWeather(226081, "Seoul");
});


// Update the UI when user enters a city
const updateUI = (cityWeather, cityName) => {

   city.textContent = cityName;
   degree.textContent = "o";

   temp.textContent = `${parseInt(cityWeather.Temperature.Metric.Value)}`;

   condition.textContent = cityWeather.WeatherText;

}



// Get the city key from open weather api and pass it to getWeather
const getCity = (userCity) => {
   const req = new XMLHttpRequest();
   const url = "https://dataservice.accuweather.com/locations/v1/cities/search";
   const key = "OmGy68KMwQ86T2tRuaMTpGyjFeNdjp2R";
   const query = `?apikey=${key}&q=${userCity}`;

   req.addEventListener('readystatechange', () => {
      if (req.readyState === 4 && req.status === 200) {

         // console.log(JSON.parse(req.response));
         const data = JSON.parse(req.response);

         const cityKey = data[0].Key;
         const cityName = data[0].EnglishName;

         getWeather(cityKey, cityName);


      } else if (req.readyState === 4) {
         console.log('Could not get the data');
      }

   });

   req.open('GET', url + query);
   req.send();

}

// Get the weather from open weather api
const getWeather = (cityKey, cityName = "Seoul") => {
   const req = new XMLHttpRequest();
   const url = "https://dataservice.accuweather.com/currentconditions/v1/";
   const key = "OmGy68KMwQ86T2tRuaMTpGyjFeNdjp2R";
   const query = `${cityKey}?apikey=${key}`;

   req.addEventListener('readystatechange', () => {
      if (req.readyState === 4 && req.status === 200) {

         const data = JSON.parse(req.response);

         // console.log(data[0]);
         // Call and pass the city object to the updateUI 
         updateUI(data[0], cityName);

      } else if (req.readyState === 4) {
         console.log("NAH BRO!");
      }
   });

   req.open('GET', url + query);
   req.send();

}

// Listen to the form to submit
cityInput.addEventListener('submit', (e) => {
   e.preventDefault();

   // Get the city the user typed
   const userCity = cityInput.city.value.trim();
   // console.log(cityInput.city.value.trim());

   // Reset the input
   cityInput.reset();


   // Call the getCity function and pass the userCity
   getCity(userCity);

   // Hide mobile keyboard
   cityInput.city.blur();
})

