const mongoose = require('mongoose');
const { Schema } = mongoose;

ProvidersSchema = new Schema({
    provider: {type:String, required: true},
    rif : {type:String, required: true},
    email : {type:String, required: true},
    phone : {type:String, required: true}
});

module.exports = mongoose.model('Providers' , ProvidersSchema);