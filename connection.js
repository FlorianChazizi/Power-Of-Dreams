const mongoose = require('mongoose');
require('dotenv').config();

// Database Connection
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
        //  Database API LINK
const dbUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.8tp2s.mongodb.net/CRUD?retryWrites=true&w=majority`;

const connection = mongoose.connect( dbUrl, connectionParams )  // Establish the DB connection with param and Link.
    .then( () => console.log(" ### Database Connected!!! ###"))
    .catch( (err) => console.log(err) );

module.exports = connection;