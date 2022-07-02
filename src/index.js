import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");

    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    }

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
    }
  });
});

// promise.then(function(response) {
//   const body = JSON.parse(response);
//   $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
//   $('.showTemp').text(`The temperature in Fahrenheit is ${((((body.main.temp)-273.15)*9/5)+32).toFixed(0)} degrees.`);
//   $('.showErrors').text("");
// }, function(error) {
//   $('.showErrors').text(`There was an error processing your request: ${error}`);
//   $('.showHumidity').text("");
//   $('.showTemp').text("");
// });
// });
// });

// //(0K − 273.15) × 9/5 + 32
// // 0K = 0degrees Kelvin