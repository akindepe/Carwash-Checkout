const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const MySQLStore = require("express-mysql-session")(session);
const csrf = require("csurf");
const flash = require('connect-flash');

const path = require("./util/path");

const app = express();
var options = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "mypassword",
  database: "users_session",
};

var sessionStore = new MySQLStore(options);
 

const csrfProtection = csrf();

app.set("view engine", "ejs");
app.set("views", "views");

const salesRoutes = require("./routes/sales");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.joinPathsATogether(__dirname, "public")));

app.use(
  session({
   // key: "session_cookie_name",
    secret: "my big secret", // use to decrypt d hashcode
    resave: false, // session not saved on every request
    saveUninitialized: false,
    store: sessionStore,
  })
);
app.use(csrfProtection);
app.use(flash());
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken(); //parameter used in view declared here
  next();
});


app.use(authRoutes);
app.use(salesRoutes);

app.listen(4000);
