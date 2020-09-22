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
    validationErrors: []
  });
};
exports.postLogin = async (req, res, next) => {
  
  const username = req.body.username;
  const password = req.body.password;
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).render("auth/login", {
      path: "/login",
      pageTitle: "Login",
      portalName: "Waschstraße",
      errorMessage: errors.array()[0].msg,
      oldInput: {
        username: username,
        password: password,
      },
      validationErrors: errors.array(),
    });
  }
  try{
    const [userData]= await Users.findActiveUserFromUsername(username);
    
    if (userData.length < 1) {
          return res.status(422).render("auth/login", {
            path: "/login",
            pageTitle: "Login",
            portalName: "Waschstraße",
            errorMessage: "benutzername oder passwort ungültig",
            oldInput: {
              username: username,
              password: password,
            },
            validationErrors: errors.array(),
          });
        }
    if (userData[0].pass_word === password) {
      //change salesportal/salesportal to just / and use session to save d user
      //in d sales controller, u can check if type 1 0r 2 to use new manager or /////new attendant.
      return res.status(200).render("salesportal/salesportal", {
            path: "/",
            pageTitle: "Sales Portal",
            cashierName: userData[0].last_name,
            id: userData[0].employee_id,
          });
        }
        
      
  }
  
  catch (error) { console.log(error);} 

};
