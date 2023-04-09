const { error } = require('console');

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL)

const connection = mongoose.connection;

connection.on('connected', () => {
    console.log('MongoDB Connection is Successfull');
})

connection.on('error', (error) => {
    console.log('Error in MongoDB Connection', error);
})


module.exports = mongoose