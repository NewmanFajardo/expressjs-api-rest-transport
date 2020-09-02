const express = require('express');
const router = express.Router();

const Providers = require('../module/Providers');

router.get('/' , async (req, res) => {
    const providers = await Providers.find();
    res.json(providers);
});

router.get('/:id' , async (req, res) => {
    let provider = await Providers.findById(req.params.id);
    provider = provider || [];
    res.json(provider);
});

router.post('/' , async (req, res) => {
    const {provider , rif, email, phone} = req.body;
    let search = await Providers.find({ provider });
    if(search.length == 0){
        const newProvider = new Providers({provider , rif, email, phone});
        await newProvider.save();
        res.json({status : "saved"});
    }
    else{
        res.json({status : "cancelled" , "message" : "Proveedor se encuentra registrado"});
    }
    
});

router.put('/:id' , async (req, res) => {
    const {provider , rif, email, phone} = req.body;
    const currentId = req.params.id;
    const newProvider = {provider , rif, email, phone};
    let search = await Providers.find({ provider });
    if(search.length != 0 && search[0]._id != currentId){
        res.json({status : "cancelled" , "message" : "Proveedor se encuentra registrado"});
    }   
    else{
        await Providers.update({"_id" : currentId} , {$set : newProvider} , {upsert:true})
        res.json({status : "updated"});
    }
});

router.delete('/:id' , async (req, res) => {
    await Providers.findByIdAndDelete(req.params.id);
    res.json({status : "deleted"});
});

module.exports = router;
