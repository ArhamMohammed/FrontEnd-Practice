const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB", { useNewUrlParser: true, useUnifiedTopology: true})
// .then(() => console.log("Connection Successful...."))
// .catch((err)=> console.log(err))
;


const fruitSchema = new mongoose.Schema ({
  name: {
    type:String,
    required:[true, "Please add name of the fruit."]
  },
  rating: {
    type:Number,
    min:1,
    max:10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
  name:"Apple",
  rating:7,
  review:"Preety solid as a fruit"
});

const peopleSchema = new mongoose.Schema({
  name:String,
  age:Number,
  favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", peopleSchema);

const person = new Person ({
  name:"John",
  age:37
});

// person.save();


const kiwi = new Fruit({
  name:"Kiwi",
  score:10,
  review:"Weird Texture"
});

const orange = new Fruit({
  name:"Orange",
  score:5,
  review:"Sour"
});

const banana = new Fruit({
  name:"Banana",
  score:3,
  review:"Weird Color"
});

const pineapple = new Fruit({
  name:"Pineaplle",
  score:9,
  review:"Spiky"
});
// pineapple.save();

const mango = new Fruit({
  name:"Mango",
  score:6,
  review:"King"
});

mango.save()

// const personAmy = new Person({
//   name:"Amy",
//   age:12,
//   favouriteFruit:pineapple
// });

Person.updateOne({name:"John"},{favouriteFruit:mango},function(err){
  if(err)
  console.log(err);
  else
  console.log("Successfully updated the document");
})


// fruit.save();

// Fruit.updateOne({_id:"51515151548451"},{name:"Peach"}, function(err){
//   if(err)
//     console.log("Updated Successfully");
//   else
//     console.log("Couldnt update");
// })

// Fruit.deleteOne({_id:"63909688a6361b913b40b8bd"}, function(err){
//   if(err)
//   console.log(err);
//   else
//   console.log("Successfully deleted");
// })

// Fruit.deleteMany({name:"Apple"},function(err){
//   if(err)
//   console.log(err);
//   else
//   console.log("Successfully Deleted all the docs");
// })

// Fruit.insertMany([kiwi,orange,banana], function(err){
//   if(err)
//   console.log(err);
//   else
//   console.log("Successfully saved all the fruits to the DB");
// })

// Fruit.find(function(err,fruits){
//   if(err){
//     console.log(err);
//     }
//   else{
//       mongoose.connection.close();
//     fruits.forEach(function(fruit){
//       console.log(fruit.name);
//     });
//     // console.log(fruits);
//     }
// });
