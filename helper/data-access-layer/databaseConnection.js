const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://dbUser:dbUser123@ds061375.mlab.com:61375/heroku_0m4881lg', {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true, useFindAndModify: false});
    mongoose.connection.on('open',()=>{
        console.log('mongoDb: Connected')
    });
    mongoose.connection.on('error',(err)=>{
        console.log('mongoDb: Error',err);
    });

    mongoose.Promise = global.Promise;
}