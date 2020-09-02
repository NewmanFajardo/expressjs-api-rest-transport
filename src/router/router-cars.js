const express = require('express');
const router = express.Router();

const Cars = require('../module/Cars');

router.get('/' , async (req, res) => {
    const cars = await Cars.find();
    res.json(cars);
});

router.get('/:id' , async (req, res) => {
    let car = await Cars.findById(req.params.id);
    car = car || [];
    res.json(car);
});

router.post('/' , async (req, res) => {
    const {model , brand, plate, serialEngine, serial} = req.body;
    let search = await Cars.find( { $or:[{plate}, {serialEngine}, {serial} ]});
    if(search.length == 0){
        const car = new Cars({model , brand, plate, serialEngine, serial});
        await car.save();
        res.json({status : "saved"});
    }
    else{
        res.json({status : "cancelled" , "message" : "Los datos del vehiculo ya existen"});
    }
    
});

router.put('/:id' , async (req, res) => {
    const {model , brand, plate, serialEngine, serial} = req.body;
    const currentId = req.params.id;
    const newCar = {model , brand, plate, serialEngine, serial};
    let search = await Cars.find( { $or:[{plate}, {serialEngine}, {serial} ]});
    console.log(search)
    if(search.length != 0){
        let count = 0;
        search.forEach(data => {
            if(
                data._id != currentId && 
                (
                    data.serialEngine == serialEngine || 
                    data.serial == serial || 
                    data.plate == plate
                )
            ){
                count++;
            }
        });
        if(count!=0){
            res.json({status : "cancelled" , "message" : "Los datos del vehiculo ya existen"});
        }
        else{
            await Cars.update({"_id" : currentId} , {$set : newCar} , {upsert:true})
            res.json({status : "updated"});
        }
    }   
    else{
        await Cars.update({"_id" : currentId} , {$set : newCar} , {upsert:true})
        res.json({status : "updated"});
    }
});

router.delete('/:id' , async (req, res) => {
    await Cars.findByIdAndDelete(req.params.id);
    res.json({status : "deleted"});
});

module.exports = router;
