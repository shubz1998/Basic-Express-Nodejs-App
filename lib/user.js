/**
 * Created by shubz on 14/1/17.
 */
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var userschema = new mongoose.Schema({
    username : {type:String, unique:true},
    password : {type:String},
    fullname : String
});

var User = mongoose.model('myuser', userschema);

module.exports = User;