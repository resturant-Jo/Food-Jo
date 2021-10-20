'use strict';

const express = require('express');
const dataModules = require('../models');
const bearerAuth = require('../middleware/bearerAuth');

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

router.get('/:model', bearerAuth, handleGetAll);
router.get('/:model/:id', bearerAuth, handleGetOne);
router.get('/:model/items/:id', bearerAuth,handleGetCartItems );
router.post('/:model', bearerAuth, handleCreate);
router.put('/:model/:id', bearerAuth, handleUpdate);
router.delete('/:model/:id', bearerAuth, handleDelete);

async function handleGetAll(req, res) {
  let allRecords = await req.model.get();
  let order=[];
await Promise.all(allRecords.map(async(ele)=>{
    let orderData=[];
    let totalPrice=0;
    const orderItems=await dataModules.cartItems.getItemsByCartId(ele.id);
    const userInfo = await dataModules.user.getfav(ele.id);
    // console.log(userInfo);
    for (const Item of orderItems) {
      const foodData = await dataModules.food.getFoodById(Item.dataValues.foodId);
      // console.log(foodData);
      orderData.push({
          foodId: Item.dataValues.foodId,
          name: foodData.name,
          image: foodData.image,
          description: foodData.description,
          restuarantId: foodData.restuarantId,
          qty: Item.dataValues.qty,
          price: Item.dataValues.price

      });
      totalPrice += Item.dataValues.qty * Item.dataValues.price
  };
    order.push({
      cartId: ele.id,
      userId:userInfo.id,
      username:userInfo.username,
      totalPrice,
      orderData
    })
}))
  res.status(200).json(order);

  
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let allRecords = await req.model.getItemsByCartId(id);
  console.log(dataModules.cart);

  res.status(200).json(allRecords);
}

async function handleGetCartItems(req, res) {
  const id = req.params.id;
  let allRecords = await await dataModules.cartItems.getItemsByCartId(id);
  res.status(200).json(allRecords);
}


async function handleCreate(req, res) {
  let {cartId} = req.body;
  const isCart = await dataModules.cart.getfav(cartId);
  console.log(isCart.dataValues.status);
  if(isCart.dataValues.status){
    let order = await req.model.create({cartId});
    await dataModules.cart.update(cartId, {status: false});
    const cart = await dataModules.cartItems.getItemsByCartId(cartId);
    const data = {
      id: order.id,
      cart
    };
    return res.status(201).json(data);
  }
  return res.status(404).json("No Cart found");
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(id, obj)
  res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let {cartId} = req.body;
  const isCart = await dataModules.cart.getfav(cartId);
  console.log(isCart.dataValues.status);
  if(!isCart.dataValues.status){
    await dataModules.cart.update(cartId, {status: true});
  }
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord);
}



module.exports = router;