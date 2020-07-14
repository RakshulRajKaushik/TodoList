const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/TODO-db');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'Error Connecting to db'));

db.once('open',function(){
    console.log('Successfully Connected to the db');
});
