const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const saltRounds = 10;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true , unique : true},
  password: { type: String, required: true },
  admin: { type: Boolean, default: false },
  realtor: { type: Boolean, default: false },
  role: { type: Number, default: 0 },
  created_date: { type: Date, default: Date.now }
});

UserSchema.pre('save', function(next) {
  // Check if document is new or a new password has been set
  console.log(this)
  if (this.isNew || this.isModified('password')) {
    // Saving reference to this because of changing scopes
    const document = this;
    bcrypt.hash(document.password, saltRounds,
      function(err, hashedPassword) {
      if (err) {
        next(err);
      }
      else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

UserSchema.methods.isCorrectPassword = function(password, callback){


  bcrypt.compare(password, this.password, function(err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
}


module.exports = mongoose.model("user", UserSchema);
