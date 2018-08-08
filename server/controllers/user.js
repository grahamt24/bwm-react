const User = require("../models/user"),
    { normalizeErrors } = require("../helpers/mongoose"),
      jwt = require("jsonwebtoken"),
      config = require("../config");

exports.auth =  function (req, res) {
  const { email, password} = req.body;

  if(!email || !password){
    return invalidResponse(res, "Data missing!", "Password and email required");
  }

  User.findOne({email}, function(err, user){
    if(err){
      return normalizeResponse(res, err);
    }

    if(!user){
      return invalidResponse(res, "Invalid User", "User does not exist.");
    }

    if(user.hasSamePassword(password)){
      const token = jwt.sign({
        userId: user.id,
        username: user.username
      }, config.SECRET, { expiresIn: '1h'});

      return res.json(token)
    }
    else{
      return invalidResponse(res, "Wrong data", "Wrong email or password");
    }

  })
};

exports.register = function (req, res) {
  const {username, email, password, passwordConfirmation} = req.body;

  if(!email || !password){
    return invalidResponse(res, "Data missing!", "Password and email required");
  }

  if (password !== passwordConfirmation){
    return invalidResponse(res, "Password mismatch!", "Password and Confirmation Password do not match!");
  }

  User.findOne({email}, function(err, existingUser){
    if(err){
      return normalizeResponse(res, err);
    }

    if(existingUser){
      return invalidResponse(res, "Invalid email!", "Email is already in use!");
    }

    const user = new User({
      username,
      email,
      password
    });

    user.save(function(err){
      if(err){
        return normalizeResponse(res, err);
      }
      return res.json({"registered": true})
    })
  });
};

exports.authMiddleware = function(req, res, next){
  const token = req.headers.authorization;
  if(token){
    const user = parseToken(token);

    User.findById(user.userId, function(err, user){
      if(err){
        return res.status(422).send({errors: normalizeErrors((err.errors))});
      }

      if(user){
        res.locals.user = user;
        next();
      }
      else{
        return notAuthorized(res);
      }

    })
  }
  else{
    return notAuthorized(res);
  }
};

function parseToken(token){
  return jwt.verify(token.split(" ")[1], config.SECRET);
}

function invalidResponse(res, title, detail){
  return res.status(422).send({ errors: [{title, detail}]});
}

function normalizeResponse(res, err){
  return res.status(422).send({errors: normalizeErrors((err.errors))});
}

function notAuthorized(res){
  return res.status(401).send({errors: [{title: "Not authorized!", detail: "You must login to access!"}]});
}
