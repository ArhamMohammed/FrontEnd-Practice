// jshint esversion:6

const express = require ("express")

const app = express();

app.get("/", function(request, response){

  response.send("Hello");

});

app.get("/contact", function(req, res){

  res.send("Contact me at: send2arhamm@gmail.com");

});

app.get("/about", function(req, res){

  res.send("I am a programmer from Bangalore,India. I am 24 years old.");

});

app.get("/hobbies", function(req, res){

  res.send("Coffee, Code, Eat, Sleep, Repeat");

});

app.listen(3000, function(){
  console.log("Server started at port number 3000")
});
