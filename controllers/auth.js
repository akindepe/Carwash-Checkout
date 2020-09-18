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
exports.postLogin = (req, res, next) => {
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
  Users.findActiveUserFromUsername(username)
    .then(([row, fieldData]) => {
      console.log(row);
      if (row.length <= 0) {
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
      if (row[0].pass_word === password) {
        console.log("inside");
        res.status(200).render("salesportal/salesportal", {
          path: "/",
          pageTitle: "Sales Portal",
          cashierName: row[0].last_name,
          id: row[0].employee_id,
        });
      }
      console.log("here");
    })
    .catch((error) => console.log(error));

};
