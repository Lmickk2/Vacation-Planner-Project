var displayName = document.querySelector('.main-name');
var dateResult = document.querySelector('.date-list');
var eventResult = document.querySelector('.event');
var search = document.querySelector('.searchBtn');
var dateSelect = document.querySelector('.date');
var destination = document.querySelector('.destination');


search.addEventListener('click', function(citySearch){
    fetch('https://opentable.herokuapp.com/api/restaurants?=cities?=miami')
    .then(response => response.json())
    .then(data => {
      console.log(data)

        
    })
    })

