const express = require("express");
const https = require("https");
const parser = require("body-parser");


const iconUrl = "http://openweathermap.org/img/wn/"

const app = express();
app.use(parser.urlencoded({extended:true}));


app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html")
})



app.post("/", function(req,res){
  const query = req.body.cityName;
  const apiKey = "70ee0c72016ed166cd8166de78991283";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid="+ apiKey +"&units="+units;

  https.get(url,function (response){
    response.on("data", function(data){
      const weatherData = JSON.parse(data);

      var name = weatherData.name;
      var temp = weatherData.main.temp;
      var desc = weatherData.weather[0].description;
      var icon = weatherData.weather[0].icon;
      var imageURL = iconUrl+icon+ "@2x.png"

      res.write("<h1>The temperature at "+name+" is "+temp+" degree celcius. </h1>");
      res.write("<p>The weather is currently " +desc+".</p>")
      res.write("<img src ="+imageURL+">")

      res.send();

    })
  })

  console.log();

});



app.listen(3000, function(){
  console.log("The server is running on port 3000")
});
