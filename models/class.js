const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const videoSchema = new Schema({
    videoName : String,
    videoUrl : String
})

const classSchema = new Schema({
  name: { type: String, required: true },
  length: String,
  intensity: String,
  you_will_feel: String,
  description: String,
  category: String,
  free_content: {type: Boolean, default: false},
  created_date: { type: Date, default: Date.now },
  video_url: [videoSchema]
});

const Class = mongoose.model("Class", classSchema);

module.exports = Class;


