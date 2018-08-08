const bcrypt = require('bcrypt'),
      mongoose = require("mongoose"),
      Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    min: [4, "Username must be at least 4 characters long."],
    max: [32, "Username is too long, it must be 32 characters or less."]
  },
  email: {
    type: String,
    required: "Email is required",
    lowercase: true,
    unique: true,
    min: [4, "Email must be at least 4 characters long."],
    max: [32, "Email is too long, it must be 32 characters or less."],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  password: {
    type: String,
    required: "Password is required",
    min: [4, "Password must be at least 4 characters long."],
    max: [32, "Password is too long, it must be 32 characters or less."]
  },
  rentals: [{type: Schema.Types.ObjectId, ref: "Rental"}],
  bookings: [{type: Schema.Types.ObjectId, ref: "Booking"}]
});

userSchema.methods.hasSamePassword = function(requestedPassword){
  return bcrypt.compareSync(requestedPassword, this.password);
};

userSchema.pre("save", function(next){
  const user = this;
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("User", userSchema);
