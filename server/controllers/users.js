var mongoose = require('mongoose');
var bCrypt = require('bcrypt-nodejs');
var User = mongoose.model('User');


exports.findAll = function(req, res){
  User.find({},function(err, results) {
    return res.send(results);
  });
};


exports.findById = function(req, res){
  var id = req.params.id;
  User.findOne({'_id':id},function(err, result) {
    if (err) return console.log(err);
    return res.send(result);
  });
};

exports.findByEmail = function(req, res){
  var email = req.params.email;
  User.findOne({'email':email},function(err, result) {
    if (err) return console.log(err);
    return res.send(result);
  });
};

exports.validPassword = function(req, res){
  var id = req.params.id;
  var passwordEntered = req.query.password;

  User.findOne({'_id': id})
    .exec(function(err, result){
      if (err) return console.log(err);
      if (result) {
         var passwordIsOK =  isValidPassword(passwordEntered, result.password);
         return res.send({passwordValid : passwordIsOK});
      } else {
          return res.send({passwordValid : false});
      }
    });
};


exports.update = function(req, res) {
  var id = req.params.id;
  var query = {'_id':id};
  var newEmail = '';
  
  if(typeof req.body.email === 'array'){
    for (var i = req.body.email.length - 1; i >= 0; i--) {
       console.log(req.body.email[i]);
    };
    newEmail = req.body.email[0];
    }else{
      newEmail = req.body.email;
    };
    
  var updates = {
                  $addToSet: { 'email': newEmail },
                  'firstName': req.body.firstName,
                  'lastName': req.body.lastName,
                  'language': req.body.language
                };
                
  User.findOneAndUpdate(query, updates, {upsert:true}, function(err, doc){
     if (err){
      console.log(err);
      return res.send(500, {error:err});
     } 
     return res.send("successfully updated");
  });

}

exports.add = function(req, res) {
  User.create(req.body, function (err, user) {
    if (err) return console.log(err); 
    return res.send(user);
  });
}

exports.delete = function(req, res){
  var id = req.params.id;
  User.remove({'_id':id},function(result) {
    return res.send(result);
  });
};



  // Generates hash using bCrypt
  var createHash = function(password){
      return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  }

  var isValidPassword = function(inputPassword, passwordCrypted){
        return bCrypt.compareSync(inputPassword, passwordCrypted);
}

