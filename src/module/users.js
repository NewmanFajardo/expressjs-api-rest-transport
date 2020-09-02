const mongoose = require('mongoose');
const { Schema } = mongoose;

UsersSchema = new Schema({
    name: {type:String, required: true},
    user : {type:String, required: true},
    password : {type:String, required: true},
    type : {type:String, required: false}
});

module.exports = mongoose.model('Users' , UsersSchema);