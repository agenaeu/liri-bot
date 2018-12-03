require("dotenv").config();
let keys = require("./keys.js");

// console.log("keys omdb : ", keys.omdb);
// console.log("keys spotify : ", keys.spotify);


let Spotify = require("node-spotify-api")
var omdbApi = require('omdb-client');
var Events = new BandsInTownEvents();


let spotify = new Spotify(keys.spotify);
let Omdb = (keys.omdb);
//console.log(keys.omdb);

let action = process.argv[2];
let command = process.argv.slice(3).join(" ");
let request = require('request');


// fully functioning
function searchSpotify(){
spotify.search({ type: 'track', query: "'" + command + "'" }, function(err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
      return;
    }
    console.log('Artist name: ' + data.tracks.items[0].artists[0].name);
    console.log('Album name: ' + data.tracks.items[0].album.name);
    console.log('Song name: ' + data.tracks.items[0].name);
    console.log('Preview URL: ' + data.tracks.items[0].preview_url);
    

  
  });
}

function omdbRequest(){
    var params = {
        apiKey: Omdb,
        title: command
    }
    omdbApi.get(params, function(err, data) {
        if (err){
            console.log(err);
        }else{
            console.log("Title : " + data.Title);
            console.log("Year : " + data.Year);
            console.log("IMDB Rating : " + data.Ratings[2].Value);
            console.log("Rotten Tomatoes Rating : " + data.Ratings[1].Value);
            console.log("Country : " + data.Country);
            console.log("Language : " + data.Language);
            console.log("Plot : " + data.Plot);
            console.log("Actors : " + data.Actors);
        }
        if (data < 1) {
            return console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/ It is on Netflix!")
        }
    });
}

function bandsInTown(){
    //set options for instance
//app_id and artists are required
Events.setParams({
    "app_id":"liri-bot", //can be anything
    "artists":[ //accepts string for single artist or an array of artist names
      "Linkinpark"
    ]
  });
   
  //get your events with success and error callbacks
  Events.getEvents(function( events ){
    for(var i = 0; i < events.length; i++){
      console.log( events[i].venue.city + ", " + events[i].venue.region );
    }
  },function( errors ){
    console.log(errors);
  });
}

/* request('http://www.google.com', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
}); */
switch (action) {
    case "concert-this":
        bandsInTown();
        break;
    case "spotify-this-song":
        searchSpotify();
        break;
    case "movie-this":
        omdbRequest();
        break;
    case "do-what-it-says":
        // some function here
        break;
}