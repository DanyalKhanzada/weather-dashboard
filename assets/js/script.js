// global variables
var searchHistoryEl = $("#search-history");
var windIconEl = $("<i class='fas fa-wind'></i>")

// dates
var todayIconEl = $("#today-icon");

var todaysDateEl = $("#todays-date");
todaysDateEl.text(moment().format('D MMM YYYY'));

var day1El = $("#day1-date");
day1El.text(moment().add(1, 'd').format('DD/MM/YYYY'));

var day2El = $("#day2-date");
day2El.text(moment().add(2, 'd').format('DD/MM/YYYY'));

var day3El = $("#day3-date");
day3El.text(moment().add(3, 'd').format('DD/MM/YYYY'));

var day4El = $("#day4-date");
day4El.text(moment().add(4, 'd').format('DD/MM/YYYY'));

var day5El = $("#day5-date");
day5El.text(moment().add(5, 'd').format('DD/MM/YYYY'));

// get search history from localStorage and display on page
var searchHistory = JSON.parse(localStorage.getItem("search"));
if (!searchHistory) {
    searchHistory = []
}
else {
    for (let i = 0; i < searchHistory.length; i++) {
        var cityListItemEl = $("<li></li>");
        cityListItemEl.addClass("list-group-item p-2 mx-1 m-sm-0");
        cityListItemEl.text(searchHistory[i]);
        $(searchHistoryEl).append(cityListItemEl);
    }
}

// display icon for general weather conditions 
var displayIcon = function (condition, elementId) {
    var iconElement = $("#" + elementId);

    // clear previous icon
    iconElement.empty();

    if (condition < 300) {
        iconElement.append($("<i class='fas fa-bolt'></i>"));
    }
    else if (condition < 600) {
        iconElement.append($("<i class='fas fa-cloud-rain'></i>"));
    }
    else if (condition < 700) {
        iconElement.append($("<i class='fas fa-snowflake'></i>"));
    }
    else if (condition < 800) {
        iconElement.append($("<i class='fas fa-smog'></i>"));
    }
    else if (condition === 800) {
        iconElement.append($("<i class='fas fa-sun'></i>"));
    }
    else if (condition === 801) {
        iconElement.append($("<i class='fas fa-cloud-sun'></i>"));
    }
    else {
        iconElement.append($("<i class='fas fa-cloud'></i>"));
    }
}

var fetchWeather = function (searchTerm, isNewSearch) {
    var cityName = searchTerm;
    fetch("https://api.openweathermap.org/data/2.5/weather?&units=metric&q="
        + cityName + "&appid=61c9307a53a9d97b2af0939528ef8c0b")
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (response) {
                    displayWeather(response);

                    // write city name to page
                    $("#city").text(searchTerm);

                    // save in search history
                    // check if it is new search (not clicked from search history)
                    if (isNewSearch) {
                        var cityListItemEl = $("<li class='list-group-item p-2 mx-1 m-sm-0'></li>");
                        cityListItemEl.text(searchTerm);
                        $(searchHistoryEl).append(cityListItemEl);

                        searchHistory.push(searchTerm);
                        localStorage.setItem("search", JSON.stringify(searchHistory));
                    }
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        // catch server error
        .catch(function (error) {
            alert("Unable to connect to OpenWeather");
        })
}

// search weather via Open Weather API
var displayWeather = function (response) {
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    fetch(
        "https://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely,hourly,alerts&lat="
        + lat + "&lon=" + lon + "&appid=61c9307a53a9d97b2af0939528ef8c0b")

        .then(function (response) {
            if (response.ok) {
                response.json().then(function (response) {

                    $(".today-group").removeClass("d-none");
                    $("#5-day-fcast").removeClass("d-none");
                    $(".cards").removeClass("d-none");
                    $(".cards").addClass("d-flex flex-row flex-wrap")

                    /* current weather */
                    $("#today-description").text(response.current.weather[0].description);
                    displayIcon((response.current.weather[0].id), "today-icon");
                    $("#temp").text(Math.round(response.current.temp) + "°C");
                    $("#humidity").text("Humidity: " + response.current.humidity + "%");
                    $("#wind").text("Wind speed: " + response.current.wind_speed + " " + "m/s");

                    // UV Index
                    $("#uv").removeClass("uvi-good uvi-moderate uvi-severe")
                    var uvi = response.current.uvi;
                    $("#uv").text(uvi);
                    if (uvi < 2) {
                        $("#uv").addClass("uvi-good");
                    }
                    else if (uvi < 6) {
                        $("#uv").addClass("uvi-moderate");
                    }
                    else {
                        $("#uv").addClass("uvi-severe");
                    }

                    // 5-day forecast
                    // day 1 
                    displayIcon((response.daily[1].weather[0].id), "day1-icon");
                    $("#day1-temp").text(Math.round(response.daily[1].temp.day) + " °C");
                    $("#day1-humidity").text("Humidity: " + response.daily[1].humidity + "%");

                    // day 2
                    displayIcon((response.daily[2].weather[0].id), "day2-icon");
                    $("#day2-temp").text(Math.round(response.daily[2].temp.day) + " °C");
                    $("#day2-humidity").text("Humidity: " + response.daily[2].humidity + "%");

                    // day 3
                    displayIcon((response.daily[3].weather[0].id), "day3-icon");
                    $("#day3-temp").text(Math.round(response.daily[3].temp.day) + " °C");
                    $("#day3-humidity").text("Humidity: " + response.daily[3].humidity + "%");

                    // day 4
                    displayIcon((response.daily[4].weather[0].id), "day4-icon");
                    $("#day4-temp").text(Math.round(response.daily[4].temp.day) + " °C");
                    $("#day4-humidity").text("Humidity: " + response.daily[4].humidity + "%");

                    // day 5
                    displayIcon((response.daily[5].weather[0].id), "day5-icon");
                    $("#day5-temp").text(Math.round(response.daily[5].temp.day) + " °C");
                    $("#day5-humidity").text("Humidity: " + response.daily[5].humidity + "%");


                })
            }
            else {
                alert("Error: " + response.statusText);

            }
        })
        // catch server error
        .catch(function (error) {
            alert("Unable to connect to OpenWeather");
        })

};

// event listeners for search bar and search history list 
$("#search").on("click", function (event) {
    event.preventDefault();
    var cityName = $("#city-name").val();
    fetchWeather(cityName, true);

    $("#city-name").val("")
});

$("#search-history").on("click", "li", function () {
    $("#city").text($(this).text());
    fetchWeather(($(this).text()), false);
})

// clear search history
$("#clear").on("click", function () {
    $("#search-history").empty();
    searchHistory = [];
    localStorage.setItem("search", JSON.stringify(searchHistory));
})