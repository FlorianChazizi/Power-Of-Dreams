const express = require('express');
const app = express();
const port = 3000;                                      // Variable for (server's) port
const db = require('./connection');
const ejsMate = require('ejs-mate');    // Load EJS extensions
const path = require('path');           // Load path for Navigating through the filesystem of the project
const flash = require('connect-flash');   // Load flash messages.
const bodyParser = require('body-parser');
const userRoutes = require('./routes/usersRoutes');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/users');
require('dotenv').config();



app.set( 'view engine', 'ejs');   
app.engine('ejs', ejsMate);                 // giving access to file with extension .ejs
app.set( 'views', path.join(__dirname, 'views')); // Gaining access inside the folder views
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use( express.static(__dirname + "/views"));         // Gives access the pages Directory

app.use(session({
    secret: 'thisismysecret',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        httpOnly: true,
        express: Date.now() + 100 * 60 * 60 * 24 * 7 ,
        maxAge: 100 * 60 * 60 * 24 * 7 
    }
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(( req, res, next ) => {     
    res.locals.currentUser = req.user;          // Respond that there is a User Logged in.       
    res.locals.success = req.flash('success');  // Success Flash message
    res.locals.error = req.flash('error');      // Error Flash message
    next();
})


// Pages Navigation             
app.get('/', (req,res) =>{                              // Loading Index Page
    res.render('index');
    
});

app.use(userRoutes);

app.get('/dreams', ( req, res ) => {               // Loading create Dream Page
    res.render('dreams');
})  

app.get('/*', ( req, res) => {                          // In any type Error Loading Not Found Page
    res.render('notFound');
})

app.listen(port, () => {                                // Enable variable to Open port 3000
    console.log(` Server running on port : ${port}`);
})