const express = require('express');
const router = express.Router();

const Users = require('../module/Users');

router.get('/' , async (req, res) => {
    const users = await Users.find();
    res.json(users);
});

router.get('/:id' , async (req, res) => {
    let user = await Users.findById(req.params.id);
    user = user || [];
    res.json(user);
});

router.post('/' , async (req, res) => {
    const {name , user, password, type } = req.body;

    let search = await Users.find({ user });
    if(search.length == 0){
        const typeUser = type || "Operador";
        const users = new Users({name , user, password , type : typeUser});
        await users.save();
        res.json({status : "saved"});
    }
    else{
        res.json({status : "cancelled" , message : "El usuario ingresado ya existe"});
    }
    
});

router.put('/:id' , async (req, res) => {
    const {name , user, password, type } = req.body;
    const typeUser = type || "Operador";
    const newUsers = {name , user, password, type:typeUser };
    let search = await Users.find({ user });
    if(search.length != 0 && search[0]._id != req.params.id){
        res.json({status : "cancelled", message: "El usuario ingresado ya existe"});
    }
    else{
        await Users.update({"_id" : req.params.id} , {$set : newUsers} , {upsert:true})
        res.json({status : "updated"});
    }
    // await Users.findByIdAndUpdate(req.params.id , newUsers);
});

router.delete('/:id' , async (req, res) => {
    await Users.findByIdAndDelete(req.params.id);
    res.json({status : "deleted"});
});

module.exports = router;
