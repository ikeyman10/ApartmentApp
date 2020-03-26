const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const imageSchema = new Schema({
    imageDescription : String,
    imageUrl : String
})

const propertySchema = new Schema({
  name: { type: String, required: true },
  floor_area_size: { type: String, required: true },
  price: { type: Number, required: true },
  num_of_rooms: { type: Number, required: true },
  description: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  created_date: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
  address: {type: String, required: true},
  realtor_id: {
    type: Schema.Types.ObjectId, 
    required: true
},
  images: [imageSchema]
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;


