const db = require("../models");
const User = require('../models/users.js');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwtConfig')




// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.Users
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Users
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  login: function(req, res) {


    let findEmail = new RegExp(["^", req.body.email, "$"].join(""), "i");
    db.Users
      .find({ email : findEmail})
      .then(dbModel => {
        
        if(dbModel[0].password == req.body.password){

          if(dbModel[0].admin){
            var resObj = {
              error: '',
              success: true,
              admin: true,
              subscribed: true
            }
            res.json(resObj)
          }else{
            if(dbModel[0].subscribed){
              var resObj = {
                error: '',
                success: true,
                admin: false,
                subscribed: true

              }
              res.json(resObj)
            }else{
              var resObj = {
                error: '',
                success: true,
                admin: false,
                subscribed: false
              }
              res.json(resObj)
            }
            
          }
          

        }else{
          var resObj = {
            error: 'Password does not match',
            success: false
          }
          res.json(resObj);
        }
       

      })
      .catch(err => {
        //res.status(422).json(err)
        var resObj = {
          error: 'Cannot find user',
          success: false
        }
        res.json(resObj);
      });
  },
  create: function(req, res) {

    console.log(req.body)
    const user = new User(req.body);
   
    user.save(function(err,resp) {
     // console.log(resp)
      if (err) {
        console.log(err)
        res.json({status: 500, message:"user failed to create"})
      } else {
        res.json({status: 200, message:"user created successfully"})
      }
    })
  },
  update: function(req, res) {
    db.Users
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Users
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  logout: function(req,res){
    let returnObj = {message:"Successfully logged out"};
    res.cookie('token', '', { httpOnly: true })
    .json(returnObj);
  },
  loginAuth: function(req, res){



    const { email, password } = req.body;

    User.findOne({ email : req.body.email}, function(err, user) {

      if (err) {
        console.error(err);
        res.status(500)
          .json({
          error: 'Internal error please try again'
        });
      } else if (!user) {
        res.status(401)
          .json({
            error: 'Incorrect email or password'
          });
      } else {

      
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal error please try again'
          });
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect email or password'
          });
        } else {
          // Issue token

          //return object
          let returnObj = {admin : user.admin, realtor: user.realtor, id: user._id}
          const payload = { email };
          const token = jwt.sign(payload, jwtSecret.secret, {
            expiresIn: '1h'
          });
          res.cookie('token', token, { httpOnly: true })
            .json(returnObj);
        }
      });
    }
  });
  }
};
