const express = require("express");
const app = express();
const parser = require("body-parser");
const http = require("http");

app.set("view engine", "ejs");
app.use(parser.urlencoded({extended:true}));
app.use(express.static("public"));

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];


app.get("/",function(req,res){

    let today = new Date();
    let currentDay = today.getDay();

    let options = {
      day:    "numeric",
      weekday: "long",
      month: "long"
    }

    let day = today.toLocaleDateString("en-US", options);

    res.render("list",{listTitle: day, newListItems: items})
})

app.post("/",function(req,res){

  let item = req.body.newItem;
  if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work")
  } else {
    items.push(item)
      res.redirect("/")
  }

res.redirect("/")
})


app.get("/work", function(req, res){

  res.render("list", {listTitle: "Work List", newListItems: workItems})
});











app.listen(3000, function(){
  console.log("Server is up and running at port 3000");
})
