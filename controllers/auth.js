const {validationResult } = require("express-validator");
const Users = require('../models/users');


exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if(message.length> 0){
    message = message[0];
  }else{
    mesage = null;
  }
  res.render("auth/login", {
    // view name is views/auth/login.ejs
    path: "/login",
    pageTitle: "Anmelden",
    portalName: 'Waschstraße',
    errorMessage: message,
    oldInput:{
      username: '',
      password: ''
    },
   // validationErrors: []
  });
};
exports.postLogin = async (req, res, next) => {
  
  const username = req.body.username;
  const password = req.body.password;
  const errors = validationResult(req);// errors from aauth route
  if(!errors.isEmpty()){
    return res.status(422).render("auth/login", {
      path: "/login",
      pageTitle: "Anmelden",
      portalName: "Waschstraße",
      errorMessage: errors.array()[0].msg,
      oldInput: {
        username: username,
        password: password,
      },
     // validationErrors: errors.array(),
    });
  }
  try{
    const [userData]= await Users.findActiveUserFromUsername(username);
    
    if (userData.length < 1) {
          return res.status(422).render("auth/login", {
            path: "/login",
            pageTitle: "Anmelden",
            portalName: "Waschstraße",
            errorMessage: "benutzername oder passwort ungültig",
            oldInput: {
              username: username,
              password: password,
            },
           // validationErrors: errors.array(),
          });
        }
    if (userData[0].pass_word === password) {
      
      req.session.user= userData[0];
      req.session.isLoggedin = true;
      await req.session.save();
        return res.status(200).redirect('/');
       
    }
      return res.status(422).render("auth/login", {
        path: "/login",
        pageTitle: "Anmelden",
        portalName: "Waschstraße",
        errorMessage: "benutzername oder passwort ungültig",
        oldInput: {
          username: username,
          password: password,
        },
        //validationErrors: errors.array(),
      });
        
      
  }
  
  catch (error) { console.log(error);} 

};
exports.postLogout = async (req,res,next)=>{
   try {
     await req.session.destroy();
     return res.redirect('/login');
   } catch (error) {
     console.log(error);
   }
  
 
}