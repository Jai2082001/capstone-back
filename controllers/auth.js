const User = require('../models/user');
const bcrypt = require('bcryptjs');
// this package is to encrypt the password 
exports.getLogin = (req, res, next) => {
  let message = req.flash('error')

  // after this line it would be removed from cookie
  // if(message.length>0){
  //   console.log('here');
  //   res.render('auth/login', {
  //     path: '/login',
  //     pageTitle: 'Login',
  //     isAuthenticated: false,
  //     errorMessage: message[0]
  //   })
  // }

  // else{
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false,
    errorMessage: undefined
  })
}


exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log('asdsd')
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      res.send({status:'Looks like you have not registered with us'});
    } else {
      // this is to compare the hashed password and password with which user is logging in
      bcrypt.compare(password, user.password).then((isit) => {
        if (isit) {
          res.send({status: 'log in', profile: user._id})
        } else {
          
          res.send({status: 'Your credentials do not match'})
        }
      })
    }
  })
 
};

exports.getRegister = (req, res, next) => {
  res.render('auth/register', {
    path: '/register',
    isAuthenticated: false,
    pageTitle: "Register"
  })
}
exports.userRet = (req, res, next) => {
  const jwtHeader = req.headers.jwt;
  if(jwtHeader != 'undefined'){
    User.findOne({_id: jwtHeader}).then((response)=>{
      if(response){
        res.send({status: 'loggedin', profile: response });
      }else{
        res.send({status: 'not'})
      }
    })
  
  }else{
    res.send({status: 'not'})

  }
  }


exports.postRegister = (req, res, next) => {
    console.log("body ", req.body)
    return bcrypt.hash(req.body.password, 12).then((password) => {
      User.findOne({ email: req.body.email }).then((response) => {
        if (!response) {
          const userInstance = new User({name: req.body.name, phonenumber: req.body.phonenumber, country: req.body.country, province: req.body.province, city: req.body.city , email: req.body.email, password: password })
          userInstance.save().then((response) => {
            console.log(response)
            console.log("USER SAVED");
            res.send({status: 'log in', profile: response._id})
          }).catch((err) => {
            console.log(err);
            res.send({status: 'Some error has occured, please try again'})
          });
        } else {
          console.log('Email EXISTS');
          res.send({status: 'Looks like you have already registered with us'});
        }
      }).catch((err) => {
        console.log('Error while confirming the availability of the email');
      })
    })
}

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
