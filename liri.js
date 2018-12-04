require("dotenv").config();
let keys = require("./keys.js");
let Spotify = require("node-spotify-api")
var omdbApi = require('omdb-client');
let moment = require('moment');
let spotify = new Spotify(keys.spotify);
let Omdb = (keys.omdb);
let fs = require('fs');
let fileName = "./random.txt";

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
    request("https://rest.bandsintown.com/artists/" + command + "/events?app_id=codingbootcamp", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            JSON.parse(body).forEach(element => {
                console.log("Name of the venue: " + element.venue.name);
                console.log("Venue location:" + element.venue.city);
                console.log("Date of the Event: " + moment(element.datetime, "YYYY-MM-DD").format("MM/DD/YYYY") + "\n");
            });
        }
    });
}

function doWhatItSays() {
    fs.readFile(fileName, "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        console.log(data);
        let dataArr = data.split(',');
        console.log(dataArr);
        //searchSpotify(dataArr[0], dataArr[1]);
         
       /*  userInput(dataArr[0], dataArr[1]); */
    });
};

//function userInput(){
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
        doWhatItSays();
        break;
    default: 
        results = "Not found";
};
//}