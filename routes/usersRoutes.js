const express = require('express');
const passport = require('passport');
const router = express.Router();
const usersController = require('../controllers/usersController'); 
const  {isLoggedIn}  = require('../middleware'); 


router.route('/register')
      .get( usersController.renderRegister )
      .post( usersController.registerUser);


router.route('/login')
      .get( usersController.renderLogin )
      .post( passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' } ), usersController.loginUser );
      

router.route('/dreams')      
      .get( isLoggedIn, usersController.renderDreams );

router.route('/cdreams')
      .get( isLoggedIn, usersController.renderCDreams )
      .post( usersController.createDream);

router.route('/logout')
      .get(usersController.logOut);

module.exports = router;
