 const LocalStrategy = require('passport-local').Strategy;

 const User = require('../models/users');
 const bcrypt = require('bcrypt');
 

 
 function init(passport)
 {
   passport.use(new LocalStrategy({usernameField: 'email'}, async (email, password, done) => {
     const user = await  User.findOne({email: email});
     if(!user)
     {
       return done(null, false, {message: 'Email not found'});
   
     }
     bcrypt.compare(password, user.password, ).then(find => {
       if(find)
       {
         return done(null, user, {message: 'Logged in successfully '});
        }
        return done(null, false, {message: 'Incorrect Password'} );
       }).catch(error =>{
         return done(null, false, {message: 'Something went wrong'});
           })
    }))
    passport.serializeUser((user, done) =>{
      done(null, user._id);
    })
    passport.deserializeUser((id, done) =>{
      User.findById(id, (err, user) =>{
        done(err, user);
          })
    })
    
        }
        module.exports = init;