//Imports
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const cors = require('cors')
const passport = require('passport')
const passportLocal = require('passport-local').Strategy
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser')
const User = require('./models/user')
mongoose.set('strictQuery', true);
//--------------------------------------END OF IMPORTS-----------------------------------

mongoose.connect("mongodb+srv://billynunes72:eMFSewC1eOsrXpRq@cluster0.q1arzkn.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("Mongoose Is Connected");
    }   
);

//middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({
    origin: "http://localhost:3000", // location of the react app we're connecting to 
    credentials: true
}))
app.use(session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
}))
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

//--------------------------------------END OF MIDDLEWARE-----------------------------------

//routes
app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.send("No User Exists");
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.redirect('/pages/Home')
          console.log(req.user);
        });
      }
    })(req, res, next);
  });

app.post("/register", (req, res) => {
    User.findOne({ username: req.body.username }, async (err, doc) => {
      if (err) throw err;
      if (doc) res.send("User Already Exists");
      if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
        const newUser = new User({
          username: req.body.username,
          password: hashedPassword,
        });
        await newUser.save();
        res.send("User Created");
      }
    });
  });
app.get("/user", (req, res) => {
    res.send(req.user);
})

app.get('/dashboard', (req, res) => {

})

//--------------------------------------END OF ROUTES-----------------------------------

//server
app.listen(4000, () => {
    console.log('Server started')
})