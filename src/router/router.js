const express = require('express');
const router = express.Router();

const Users = require('../module/Users');

router.get('/' , async (req, res) => {
    const users = await Users.find();
    console.log(users);
    res.json(users);
});

router.get('/:id' , async (req, res) => {
    const users = await Users.findById(req.params.id);
    console.log(users);
    res.json(users);
});

router.post('/' , async (req, res) => {
    const {name , address } = req.body;
    const users = new Users({name , address});
    await users.save();
    console.log(users);
    res.json({status : "saved"});
});

router.put('/:id' , async (req, res) => {
    const {name , address } = req.body;
    const newUsers = {name , address };
    await Users.findByIdAndUpdate(req.params.id , newUsers);
    console.log(newUsers);
    res.json({status : "updated"});
});

router.delete('/:id' , async (req, res) => {
    await Users.findByIdAndDelete(req.params.id);
    res.json({status : "deleted"});
});

module.exports = router;
