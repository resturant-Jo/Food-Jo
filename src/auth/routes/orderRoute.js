'use strict';

const express = require('express');
const dataModules = require('../models');
const bearerAuth = require('../middleware/bearerAuth');
// const acl = require('../middleware/acl.js');
const router = express.Router();

router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});


router.get('/:model',bearerAuth, handleGetAll);
router.get('/:model/:id',bearerAuth, handleGetOne);
router.post('/:model',bearerAuth, handleCreate);
router.put('/:model/:id',bearerAuth, handleUpdate);
router.delete('/:model/:id',bearerAuth, handleDelete);



async function handleGetAll(req, res) {
  const id = req.params.id;
  let allRecords = await req.model.get(id);
  console.log(dataModules.cart);
  let price = 0;
  let data;
  let foodData;
   let allItems= await Promise.all(allRecords.map( async(ele) => {
    data = await dataModules.cart.getfav(parseInt(ele.cartId));
    foodData = await dataModules.food.getfav(parseInt(ele.foodId));
    
    price += await foodData.price;
    return foodData;
  }))
  res.status(200).json({allItems,price});
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let allRecords = await req.model.get(id);
  console.log(dataModules.cart);
  let allcart= await Promise.all( allRecords.map( ele=>
       dataModules.cart.getfav(ele.cartId)

  ))
  res.status(200).json(allcart);
}



async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  let data;
  let foodData; 
  const id = req.params.id;
  let allRecords = await req.model.get(id);
   let allItems= await Promise.all(allRecords.map( async(ele) => {
    data = await dataModules.cart.getfav(parseInt(ele.cartId));
    foodData = await dataModules.food.getfav(parseInt(ele.foodId));
    
    
    return foodData;
  }))
  
  res.status(201).json(foodData);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(id, obj)
  res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord);
}


module.exports = router;