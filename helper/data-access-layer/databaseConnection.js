const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://dbUser:dbUser123@ds145694.mlab.com:45694/heroku_sjhntst6', {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true, useFindAndModify: false});
    mongoose.connection.on('open',()=>{
        console.log('mongoDb: Connected')
    });
    mongoose.connection.on('error',(err)=>{
        console.log('mongoDb: Error',err);
    });

    mongoose.Promise = global.Promise;
}