console.log('this is loaded');

let spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

 //let omdb = process.env.OMDB_API;
 //console.log(omdb);

let omdb = process.env.OMDB_API;
  //key: process.env.OMDB_API
module.exports.spotify = spotify;
module.exports.omdb = omdb;