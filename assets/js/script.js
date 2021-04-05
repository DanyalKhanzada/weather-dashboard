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


