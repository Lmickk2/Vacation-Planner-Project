function initMap() {
  var options = {
      center: {lat: 25.7602 , lng: -80.1959 },
      zoom: 14,
      styles: [
          { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#263c3f" }],
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6b9a76" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }],
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9ca5b3" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#746855" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1f2835" }],
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#f3d19c" }],
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#2f3948" }],
          },
          {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#515c6d" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#17263c" }],
          },
        ],
      }

map = new google.maps.Map(document.getElementById("map"),options)
}



var search = document.querySelector('.searchBtn');
var state = document.querySelector('.destination')


search.addEventListener('click', function(){
if(initMap)
console.log("")
})


var APIKey = "3de7f199adb168e35cb20780e93be5af";
var current = $('.current');
var forecast = $('.projected');

function renderCurrentWeather() {
  var requestURL = `https://api.openweathermap.org/data/2.5/weather?q=Miami&units=imperial&appid=${APIKey}`;

  $.ajax({
      url: requestURL,
      method: 'GET'
  }).then(function(currentWeatherResponse) {
      var weatherIcon = `https://openweathermap.org/img/w/${currentWeatherResponse.weather[0].icon}.png`;

      var miamiCurrent = $(`
          <h2>Miami</h2>
          <p>${moment().format('dddd, MMMM D, YYYY')}</p> 
          <img src="${weatherIcon}">
          <p>Temperature: ${currentWeatherResponse.main.temp} °F</p>
          <p>Wind: ${currentWeatherResponse.wind.speed} MPH</p>
          <p>Humidity: ${currentWeatherResponse.main.humidity} \%</p>
      `)
      $(current).append(miamiCurrent);
      $(current).css('text-align', 'center');
  });
};

var APIKey = "3de7f199adb168e35cb20780e93be5af";
var current = $('.current');
var forecast = $('.projected');

function renderCurrentWeather() {
  var requestURL = `https://api.openweathermap.org/data/2.5/weather?q=Miami&units=imperial&appid=${APIKey}`;

  $.ajax({
      url: requestURL,
      method: 'GET'
  }).then(function(currentWeatherResponse) {
      var weatherIcon = `https://openweathermap.org/img/w/${currentWeatherResponse.weather[0].icon}.png`;

      var miamiCurrent = $(`
          <p>${moment().format('dddd, MMMM D, YYYY')}</p> 
          <img src="${weatherIcon}">
          <p>Temp: ${currentWeatherResponse.main.temp} °F</p>
      `)
      $(current).append(miamiCurrent);
  });
};

renderCurrentWeather();

function renderForecast() {
  requestURL = `https://api.openweathermap.org/data/2.5/forecast?q=Miami&units=imperial&appid=${APIKey}`;

  $.get(requestURL).then(function(forecastResponse){
      weatherForecast = forecastResponse.list;
      /*console.log(weatherForecast);*/
      $.each(weatherForecast, function(i) {
          if (!weatherForecast[i].dt_txt.includes('12:00:00')) {
              return;
          }

          forecastDate = new Date(weatherForecast[i].dt*1000)
          weatherIcon = `https://openweathermap.org/img/wn/${weatherForecast[i].weather[0].icon}.png`;

          forecast.append(`
          <div class="col-md">
              <div class="card">
                  <div class="card-body">
                      <h4>${forecastDate.getMonth()+1}/${forecastDate.getDate()}/${forecastDate.getFullYear()}</h4>
                      <img src=${weatherIcon}>
                      <p>Temp: ${weatherForecast[i].main.temp} &#176;F</p>
                  </div>
              </div>
          </div>
          `)

          $(forecast).css('text-align', 'center');
      })
  })
}

renderForecast();

function renderEvents() {
  $('.category').on('click', function () {
    console.log(this);

    var selectedCategory = this.text;
    $('#dropdownDefault').text(selectedCategory);

    var categoryInput = $(this).data('value');
    console.log(categoryInput)
    
    requestURL = `http://www.miamibeachapi.com/rest/a.pi/events/search?lat=25.7602&lng=-80.1959&radius=25&category_filter=${categoryInput}`;

    $.get(requestURL).then(function(eventsResponse) {
      var eventsList = JSON.parse(eventsResponse);
      var miamiEvents = eventsList.events;
      $('.eventsList').empty();

        
      if (miamiEvents.length !== 0) {
        $.each(miamiEvents, function(i) {
          $('.eventsList').append(`
            <li class="eventItem">
                <a href="${miamiEvents[i].event_url}" target="_blank" class="eventURL">
                  <h4 class=eventName>${miamiEvents[i].name}</h4>
                </a>
                <p class="text-white eventDescription">${miamiEvents[i].description}</p>
            </li>
            `);
        });
      }else{
        $('.eventsList').append(`
          <li>
            <p>Sorry, no events in this category is currently happening. Please try a different category</p>
          </li>
        `);
      };
    });
  });
};
  
renderEvents();

var events = [];

$(document).on('click', '.eventURL', function() {
  var eventItem = {
    eventName: this.text,
    eventURL: this.href
  };
  
  events.push(eventItem);
  localStorage.setItem("events", JSON.stringify(events));

  $('.pastInterest').append(`
        <li class="eventItem">
            <a href="${eventItem.eventURL}" target="_blank" class="eventURL">
              <h4 class=eventName>${eventItem.eventName}</h4>
            </a>
        </li>
    `);
});

function initEvents() {
  var storedEvents = JSON.parse(localStorage.getItem('events'));

  if (storedEvents !== null) {
    events = storedEvents;
  } else {
    events = [];
  }

  for (var i = 0; i < events.length; i++) {
    var eventItem = events[i];

    $('.pastInterest').append(`
        <li class="eventItem">
            <a href="${eventItem.eventURL}" target="_blank" class="eventURL">
              <h4 class=eventName>${eventItem.eventName}</h4>
            </a>
        </li>
    `); 
  };
};    

initEvents();