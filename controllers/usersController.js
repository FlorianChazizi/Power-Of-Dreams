const User = require('../models/users');
const Dream = require('../models/dreams');
const passport = require('passport');

const renderRegister = ( req , res ) => {                                       // Render Register Page
    res.render('register');
    req.flash('success', 'Here you can register!');
}

const registerUser = async ( req , res ) => {                                       // Register User
    try {
        const { email, username, password } = req.body; // get the emai,username and password from user
        const user = new User({ email, username });    //Save them in the Data base
        const registeredUser = await User.register(user, password);
        console.log(registeredUser);    
        console.log("User Registered Successfully! * * * ");
        req.flash("success", `User ${username}, Successfully registered!`);
        res.redirect('login');
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
        
    }
};

const renderLogin =  async ( req, res) => {
    res.render('login');
    
}

const loginUser = async ( req, res ) => {
    const { username } = req.body;
    req.flash('success', `Hello, ${username}.`);
    console.log(`${username}, Logged in...`)
    console.log("User Logged in Successfully! * * * ");
    res.redirect('/dreams');

}

const renderDreams = async ( req, res ) => {
    if( req.isAuthenticated() ){
        console.log(req.user);
        const username = req.user.username;

        const dreams = await Dream.find().populate('author');
        res.render('dreams', {username, dreams});

    }else{
        req.flash('error', `Hello, you must sign in.`);
        res.redirect('login');
    }
}

const renderCDreams = ( req, res ) => {
    if( req.isAuthenticated() ){
        console.log(req.user);
        const username = req.user.username;
        res.render('cdreams', {username});

    }
}

const createDream = async ( req, res ) => {
    const dream = new Dream( req.body );        // request all data from Form
    dream.author = req.user._id;                // request user's _id to mark as author
    await dream.save();                         // Register in the database 
    console.log(dream);  
    req.flash('success', `Posted Successfully.`);
    res.redirect('/dreams');
}


const logOut = ( req, res ) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success', 'Goodbye!')
        res.redirect('/');
      });
}

module.exports = {
    renderRegister,
    registerUser,
    renderLogin,
    loginUser,
    renderDreams,
    renderCDreams,
    createDream,
    logOut
};