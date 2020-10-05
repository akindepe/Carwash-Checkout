const {validationResult } = require("express-validator");
const Users = require('../models/users');
const Managers = require("../models/manager");


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
exports.getAdminLogin = async (req,res,next)=>{
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    mesage = null;
  }
  // rendered is auth/login bcos view name is views/auth/login.ejs
  res.render("auth/login", {
    path: "/admin/login",
    pageTitle: "Anmelden",
    portalName: "Admin",
    errorMessage: message,
    oldInput: {
      username: "",
      password: "",
    },
  });
}

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
       
      });
        
      
  }
  
  catch (err) {  const error = new Error(err);
  error.httpStatusCode = 500;
  return next(error);} 

};
exports.postAdminLogin= async(req,res,next)=>{
  
    const username = req.body.username;
    const password = req.body.password;
    const errors = validationResult(req); // errors from aauth route
    if (!errors.isEmpty()) {
      return res.status(422).render("auth/login", {
        path: "/admin/login",
        pageTitle: "Anmelden",
        portalName: "Admin",
        errorMessage: errors.array()[0].msg,
        oldInput: {
          username: username,
          password: password,
        },
      });
    }
    try {
      const [userData] = await Managers.findActiveManagerFromUsername(username);
       if (userData.length < 1) {
         return res.status(422).render("auth/login", {
           path: "/admin/login",
           pageTitle: "Anmelden",
           portalName: "Admin",
           errorMessage:
             "Sie haben keinen Zugang",
           oldInput: {
             username: username,
             password: password,
           },
         });
       }
       if (userData[0].pass_word === password ) {
         req.session.user = userData[0];
         req.session.isLoggedin = true;
         req.session.adminMode = true;
         await req.session.save();
         return res.status(200).redirect("/admin");
       }
       return res.status(422).render("auth/login", {
         path: "admin/login",
         pageTitle: "Anmelden",
         portalName: "Waschstraße",
         errorMessage: "benutzername oder passwort ungültig",
         oldInput: {
           username: username,
           password: password,
         },
       });
        
    } catch (err) {
       const error = new Error(err);
       error.httpStatusCode = 500;
       return next(error);
    }
}
exports.postLogout = async (req,res,next)=>{
   try {
     if (req.session.adminMode) {
        await req.session.destroy();
        return res.redirect("admin/login");
     }
     await req.session.destroy();
     return res.redirect('/login');
   } catch (err) {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
   }
  
 
}