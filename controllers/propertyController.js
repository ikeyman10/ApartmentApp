const db = require("../models");
const Property = require('../models/property.js');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwtConfig')
let mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;




// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.Property
      .aggregate([
        
        { "$lookup": {
            "localField": "realtor_id",
            "from": "users",
            "foreignField": "_id",
            "as": "realtor"
          } 
        },
        { "$unwind": "$realtor" }

    ])
      .sort({ created_date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));

  },
  findById: function(req, res) {
    db.Property
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findByRealtor: function(req, res) {

    console.log(req.body.realtor_id)
    db.Property.aggregate([
            {
              $match: { realtor_id: ObjectId(req.body.realtor_id) }
            },
            { "$lookup": {
                "localField": "realtor_id",
                "from": "users",
                "foreignField": "_id",
                "as": "realtor"
              } 
            },
            { "$unwind": "$realtor" }

          ])
          .sort({ created_date: -1 })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
          
    
  },

  findByIdRealtor: function(req, res) {
    db.Property
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
 
  create: function(req, res) {

    console.log(req)
    db.Property
      .create(req.body)
      .then(dbModel => {

        //console.log(dbModel)
        res.json(dbModel)
      })
      .catch(err => {

        //console.log(err)
        res.status(422).json(err)
      });
  },
  update: function(req, res) {
    console.log(req)
    db.Property
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Property
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
 
};
