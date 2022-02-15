let express = require("express");

// we can require any json file . ./ means in current directory . 
let data = require("./data.json");

// server ko create kar deta hai but chalu nhi krta
// it creates instance of server
let server = express()

// server.get("/movies",function(req,res){
//     res.send("movies data from server");
// });


server.get("/movies",function(req,res){
    res.json(data);
});

server.get("/genre", function(req,res){
    
    let allGenreObjects = data.map(function(el){
        return el.genre;
    });
//    allGenreObjects is having duplicates genre name as well as id . 
    // res.send(allGenreObjects);
    // so instaed of sending this we will remove duplications

    let uniqueGenreObjects = [];

    for(let i=0 ; i<allGenreObjects.length ; i++){
        let genreId = allGenreObjects[i]["_id"];

      let index =  uniqueGenreObjects.findIndex(function(el){
          return el._id == genreId;
      });

      if(index == -1){
          uniqueGenreObjects.push(allGenreObjects[i]);
      }
    }

    res.json(uniqueGenreObjects);
})

// server ko chalu kr deta hai 
// server port 3000 par continous msg ka wait krega
server.listen(4000)

//  http://localhost:3000/movies  url of server 