const mongoose = require('mongoose');
const { Schema } = mongoose;

CarsSchema = new Schema({
    model: {type:String, required: true},
    brand : {type:String, required: true},
    plate : {type:String, required: true},
    serialEngine : {type:String, required: true},
    serial : {type:String, required: true}
});

module.exports = mongoose.model('Cars' , CarsSchema);