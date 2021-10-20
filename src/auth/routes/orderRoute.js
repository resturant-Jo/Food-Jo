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
router.get('/:model/items/:id', bearerAuth, handleGetCartItems);
router.post('/:model', bearerAuth, handleCreate);
router.put('/:model/:id', bearerAuth, handleUpdate);
router.delete('/:model/:id', bearerAuth, handleDelete);

async function handleGetAll(req, res) {
  let allRecords = await req.model.get();
  let cartInfo=[];
  let cartData=  await Promise.all(allRecords.map(async (ele) => {
    
    // console.log(ele);
    let cart = await dataModules.cart.getfav(ele.cartId);
    // console.log(cart);
    let userInfo = await dataModules.user.getfav(cart.userId)
    console.log(userInfo);
cartInfo.push({
  orderId:ele.id,
  cartId:cart.id,
  userId:cart.userId,
  status:cart.status,
  username:userInfo.username,
  email:userInfo.email,
  location:userInfo.location,
  phone:userInfo.phone,
  profilePicture:userInfo.profilePicture,

})
    
    }))
    res.status(200).json(cartInfo);
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let order = [];
  let orderData = [];
  let totalPrice = 0;
  let allRecords = await req.model.getItemsByCartId(id);
  const orderItems = await dataModules.cartItems.getItemsByCartId(id);
  const userInfo = await dataModules.user.getfav(id);
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
    cartId: id,
    userId: userInfo.id,
    username: userInfo.username,
    profilePicture: userInfo.profilePicture,
    totalPrice,
    orderData
  })
  console.log(dataModules.cart);

  res.status(200).json(allRecords);
}

async function handleGetCartItems(req, res) {
  const id = req.params.id;
  let allRecords = await await dataModules.cartItems.getItemsByCartId(id);
  res.status(200).json(allRecords);
}


async function handleCreate(req, res) {
  let { cartId } = req.body;
  const isCart = await dataModules.cart.getfav(cartId);
  console.log(isCart.dataValues.status);
  if (isCart.dataValues.status) {
    let order = await req.model.create({ cartId });
    await dataModules.cart.update(cartId, { status: false });
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
  let { cartId } = req.body;
  const isCart = await dataModules.cart.getfav(cartId);
  console.log(isCart);
  if (!isCart.status) {
    await dataModules.cart.update(cartId, { status: true });
  }
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord);
}



module.exports = router;