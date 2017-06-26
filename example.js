const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost/snapcat");
//                                        |
//                                  name of database

const Cat = mongoose.model(     // constructor function "C"
  "Cat",            // 1st arg = Name of the model
  { name: String,   // 2nd arg = Schema object of the model
    breed: String,
    age: Number
  }
);


// Collection name from the model name
// Cat -> cats -> db.cats.find() //plural is vermenigvuldigen
                                    // cat - cats

//---------------------------------------------------------
// CRUD operations (mongoose version): --------------------

// C of CRUD (create)

// is the same as: db.cats.insertOne({name: "Armani"});
const myKitty = new Cat ({
  name: "Armani",
  breed: "Tuxedo Cat",
  age: 14,
  // favoriteToy will be ignored cause its not in the Schema
  favoriteToy: "Water Glss"
});
myKitty.save((theError) => {
  // this CALLBACK is called when the save is finished!

  if (theError) {
    console.log ("SHIT! Could not save Armani.");
  }
  else {
    console.log ("YES! Saved Armani.");
  }
});


Cat.create(
  {
  name: "Nala",
  breed: "Part Lion",
  age: 1,
  // personality will be ignored cause its not in the schema
  personality: "Sassy"
  },
(theError) => {
  if (theError) {
    console.log ("SHIT! Could not save Nala.");
  }
  else {
    console.log ("YES! Saved Nala.");
  }
});

//-------------------------------------------------------
// R of CRUD (read or retrieve) -------------------------

Cat.find((err, catResults) => {
  if (err) {
    console.log ("FIND ERROR!");
  }
  else {
    console.log ("All the cats!");
    catResults.forEach ((oneCat) => {
      console.log("--> cat: " + oneCat.name);
    });
  }
});


// below is same as:
// db.cats.find(
//{name: "Nala"},
//{name: 1, _id: 0}
//)

Cat.find(
  {name: "Nala"},          //1st arg = criteria object
  {_id: 0},                //2nd arg = projection object
  (err, nalaResults) => {  //3rd arg = callback that runs when finished
    if (err) {
      console.log ("Nala find error!");
    }
    else {
      console.log ("All the NALA's!");
      nalaResults.forEach ((oneNala) => {
        console.log("--> cat: " + oneNala.name);
      });
    }
  });

  //---------------------------------------------------

  //cat.findbyId()          R of CRUD (retrieve)
  //cat.findbyIdAndUpdate() U of CRUD (update)
  //cat.findbyIdandRemove() D of CRUD (delete)
