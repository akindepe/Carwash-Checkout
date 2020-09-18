const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const csrf = require("csurf");
const flash = require('connect-flash');



const path = require("./util/path");

const app = express();
//const csrfProtection = csrf();

app.set("view engine", "ejs");
app.set("views", "views");

const salesRoutes = require("./routes/sales");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static(path.joinPathsATogether(__dirname, "public")));

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    //store: store,
  })
);
//app.use(csrfProtection);
app.use(flash());


app.use(authRoutes);
app.use(salesRoutes);

app.listen(4000);
