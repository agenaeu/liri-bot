require("dotenv").config();
let keys = require("./keys.js");

// console.log("keys omdb : ", keys.omdb);
// console.log("keys spotify : ", keys.spotify);


let Spotify = require("node-spotify-api")
let omdb = require("omdb");
let bandsintown = require('bandsintown');/* (APP_ID); */


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
    

    omdb.search(command, function(err, movies) {
        if(err) {
            return console.error(err);
        }
     
        if(movies.length < 1) {
            return console.log('No movies were found!');
        }
     
        movies.forEach(function(movie) {
            console.log('%s (%d)', movie.title, movie.year);
        });
     
        // Saw (2004)
        // Saw II (2005)
        // Saw III (2006)
        // Saw IV (2007)
        // ...
    });
}

function bandsInTown(){
    bandsintown
  .getArtistEventList('Skrillex')
  .then(function(events) {
    // return array of events
  });
}

/* request('http://www.google.com', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
}); */
switch (action) {
    case "concert-this":
        // some function here
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