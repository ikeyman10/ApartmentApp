const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.Class
      .find(req.query)
      .sort({ created_date: 1 })
      .then(function(dbModel){
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Class
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Class
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Class
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateVideo: function(req,res){

    db.Class.updateOne({_id: req.params.id, "video_url._id" : req.body._id },{$set : { "video_url.$" : req.body }})
      .then(dbModel => {
        res.json(dbModel)
      
      })
      .catch(err => res.status(422).json(err));
  
    
  },
  removeVideo: function(req,res){
    
    console.log(req)
    db.Class.update({_id: req.params.id},{$pull : { "video_url" : { "_id": req.body._id }}})
      .then(dbModel => {
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  addVideo: function(req, res) {
    console.log(req.body)

    db.Class
      .findOneAndUpdate({ _id: req.params.id }, {$push: {video_url: req.body}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Class
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
