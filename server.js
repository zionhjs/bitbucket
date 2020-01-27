const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const session = require("express-session");

//session
app.use(
  session({
    secret: "keyboardkitteh",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  })
);

//mongoose section
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/restaurants_api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

//models under mongoose section  model.js file takes the models file
require("./server/config/models.js");   //??? quite confused on this part

//flash we only need it when we using ejs on server
// const flash = require("express-flash");
// app.use(flash());
// var validate = require("mongoose-validator");

//path&ejs
// app.use(express.static(__dirname + "/static"));
// app.set("view engine", "ejs");
// app.set("views", __dirname + "/views");
app.use(express.static(__dirname + '/restaurant/dist/restaurant'));
//in order to access POST data, we need to pull it out of the request objects
app.use(express.urlencoded({ extended: true }));

//express&json
app.use(express.json());
//bodyParser&json
// app.use(bodyParser.json());

//Routes  <= controller in routes   controllers=> callbacks
require("./server/config/routes.js")(app);

// this route will be triggered if any of the routes above did not match only when URL address on Express
//needs path
const path = require('path');
app.all("*", (req, res, next) => {
  res.sendFile(path.resolve("./restaurant/dist/restaurant/index.html"))
});

//port
const port = process.env.PORT || 9000;
app.listen(port, () => console.log("listening on port 9000"));