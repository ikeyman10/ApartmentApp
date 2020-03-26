const mongoose = require("mongoose");
const db = require("../models");
const ObjectId = mongoose.Types.ObjectId;


// This file empties the Books collection and inserts the books below


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/toptalReality");


const userSeed = [
  {
    _id : ObjectId("5e78fdfdd110541b0ce1cd82"),
    firstname: "Bradley",
    lastname: "Eichenberg",
    email: "brad.ike@gmail.com",
    password: "$2b$10$hc0suJQqWiCySepmiTx5ZOwcRHhL0qUbomZPT9tT8o2Edh9FPA12K",
    admin: true,
    realtor: true,
    created_date : new Date(Date.now()),
    __v : 0
  },
  {
      _id : ObjectId("5e7a8ce02485c038da7a8b34"),
    firstname: "Murillo",
    lastname: "Nicacio",
    email: "murillo@toptal.com",
    password: "$2b$10$ozaC3pmlih4swoxIT2kDBOLAoe7/y8tDzs1CnlQwXdPfS1EFP1XDG",
    admin: true,
    realtor: true,
    created_date : new Date(Date.now()),
    __v : 0
  },
  {
    firstname: "Henry",
    lastname: "Ford",
    email: "henry.ford@toptal.com",
    password: "$2b$10$rqqt11cwfGeh6BEMddVjwOy0atBkXQmEC3nol7Btfo4dolkDSXElG",
    admin: false,
    realtor: false,
    created_date : new Date(Date.now()),
    __v : 0
  },
  {
    _id : ObjectId("5e7a8ce02485c038da7a8b39"),
    firstname: "John",
    lastname: "Millionaire",
    email: "john@toptal.com",
    password: "$2b$10$R9Y5lpQdUAD5LUkuRMxsGuhZo5eZheKB6Z40qSC8r4C.biHHmEuEi",
    admin: false,
    realtor: true,
    created_date : new Date(Date.now()),
    __v : 0
  },
];

db.Users
  .remove({})
  .then(() => db.Users.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

  const apartmentSeed = [

  {
    
    "name": "Jefferson On The Lake",
    "floor_area_size": "1500",
    "price": 1200,
    "num_of_rooms": 2,
    "description": "Big rooms and living space with a back patio",
    "lat": 38.9057584,
    "lng": -94.77615689999999,
    "realtor_id": 
        ObjectId("5e78fdfdd110541b0ce1cd82")
,
    "active": true,
    "images": [],
    "address": "12251 S Strang Line Rd, Olathe, KS 66062, USA"
},
{
   
    "active": true,
    "name": "Stonepost Crossing",
    "price": 1800,
    "floor_area_size": "2500",
    "num_of_rooms": 3,
    "description": "beautiful new apartments with renovated kitchens. ",
    "address": "12800 W 134th Pl, Overland Park, KS 66213, USA",
    "lat": 38.8854943,
    "lng": -94.7354823,
    "realtor_id":  ObjectId("5e7a8ce02485c038da7a8b39"),
    
    "images": []
    
},
{
    
    "active": false,
    "name": "Cambridge Square",
    "price": 1200,
    "floor_area_size": "2500",
    "num_of_rooms": 4,
    "description": "Cambridge is a great family style living apartment and pet friendly",
    "address": "10701 Ash St, Overland Park, KS 66211, USA",
    "lat": 38.9336011,
    "lng": -94.6441564,
    "realtor_id": ObjectId("5e7a8ce02485c038da7a8b39"),
    "images": []
    
},
{
   
    "active": true,
    "name": "Kelly Reserve Apartments",
    "price":900,
    "floor_area_size": "2500",
    "num_of_rooms": 2,
    "description": "Kelly reserve is a dog friendly apartment complex with many amenities.",
    "address": "12000 W 128th Terrace, Overland Park, KS 66213, USA",
    "lat": 38.8957627,
    "lng": -94.7262406,
    "realtor_id": ObjectId("5e78fdfdd110541b0ce1cd82"),
    
    "images": [],
    
},
{
   
    "active": true,
    "name": "Adara at Overland Park Apartments",
    "price": "1900",
    "floor_area_size": "2500",
    "num_of_rooms": 3,
    "description": "test",
    "address": "13401 Westgate St, Overland Park, KS 66213, USA",
    "lat": 38.8854042,
    "lng": -94.7320901,
    "realtor_id": ObjectId("5e78fdfdd110541b0ce1cd82"),
    "images": []
},
{
    "active": true,
    "name": "The Park at Olathe Station",
    "price": 800,
    "floor_area_size": "1800",
    "num_of_rooms":  3,
    "description": "test 3!",
    "address": "12230 S Strang Line Ct, Olathe, KS 66062, USA",
    "lat": 38.9058599,
    "lng": -94.76917879999999,
    "realtor_id": ObjectId("5e78fdfdd110541b0ce1cd82"),
    "images": []
}


  ]


db.Property
.remove({})
.then(() => db.Property.collection.insertMany(apartmentSeed))
.then(data => {
  console.log(data.result.n + " records inserted!");
  process.exit(0);
})
.catch(err => {
  console.error(err);
  process.exit(1);
});
