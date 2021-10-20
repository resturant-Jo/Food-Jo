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
router.get('/:model/:id', bearerAuth, handleGetOneCartByUserId);
router.get('/:model/items/:id', bearerAuth, handleGetCartItemsById);
router.delete('/:model/items/:id', bearerAuth, handleDeleteFoodById);
router.get('/:model/userId/:id', bearerAuth, handleGetCartByUserId);
router.post('/:model', bearerAuth, handleCreate);
router.put('/:model/:id', bearerAuth, handleUpdate);
router.delete('/:model/:id', bearerAuth, handleDelete);

async function handleGetAll(req, res) {

    let allRecords = await req.model.get();
    let cart = [];
    await Promise.all(allRecords.map(async (ele) => {
        let cartData = [];
        let totalPrice = 0;
        const cartItems = await dataModules.cartItems.getItemsByCartId(ele.id);
        const userInfo = await dataModules.user.getfav(ele.userId);
        console.log(userInfo);
        for (const Item of cartItems) {
            const foodData = await dataModules.food.getFoodById(Item.dataValues.foodId);
            // console.log(foodData);
            cartData.push({
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
        cart.push({
            id: ele.id,
            userId: ele.userId,
            username:userInfo.username,
            profilePicture:userInfo.profilePicture,
            status: ele.status,
            totalPrice,
            cartData,
        });
    }));
    res.status(200).json(cart)
}


async function handleGetOneCartByUserId(req, res) {
    const id = req.params.id;
    let allRecords = await req.model.getByUserId(id);
    let cart = [];
    await Promise.all(allRecords.map(async (ele) => {
        let cartData = [];
        let totalPrice = 0;
        const cartItems = await dataModules.cartItems.getItemsByCartId(ele.id);
        const userInfo = await dataModules.user.getfav(ele.id);
        // console.log(userInfo);
        for (const Item of cartItems) {
            const foodData = await dataModules.food.getFoodById(Item.dataValues.foodId);
            cartData.push({
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
        cart.push({
            id: ele.id,
            userId: ele.userId,
            username:userInfo.username,
            profilePicture:userInfo.profilePicture,
            status: ele.status,
            totalPrice,
            cartData,
        });
    }));
    res.status(200).json(cart)
}

async function handleGetCartItemsById(req, res) {
    const id = req.params.id;
    console.log("handleGetCartItemsById");
    let allRecords = await dataModules.cartItems.getItemsByCartId(id);
    await Promise.all(allRecords.map(async (ele)=>{
        const selectedFood= await dataModules.food.getFoodById(ele.id)
            }))
    res.status(200).json(allRecords);
}

async function handleGetCartByUserId(req, res) {
    const id = req.params.id;
    let allRecords = await dataModules.cart.getActiveCartByUserId(id);

    res.status(200).json(allRecords);
}



async function handleCreate(req, res) {
    const { userId, food } = req.body;
    let cart = await req.model.create({ userId });
    console.log(dataModules.cartItems);
    let totalPrice = 0;
    await Promise.all(food.map(async ele => {
        const obj = {
            foodId: ele.foodId,
            qty: ele.qty,
            price: ele.price,
            cartId: cart.id
        }
        await dataModules.cartItems.create(obj);
        totalPrice += ele.price * ele.qty;
    }));

    let Items = await dataModules.cartItems.getItemsByCartId(cart.id);
    res.status(201).json({ userId, cartId: cart.id, totalPrice, Items: Items });
}

async function handleUpdate(req, res) {
    const id = req.params.id;
    const { userId, food } = req.body;
    await req.model.update(id, { userId })
    await dataModules.cartItems.deleteByCartId(id);
    let totalPrice = 0;
    await Promise.all(food.map(async ele => {
        const obj = {
            foodId: ele.foodId,
            qty: ele.qty,
            price: ele.price,
            cartId: id
        }
        await dataModules.cartItems.create(obj);
        totalPrice += ele.price * ele.qty;
    }));
    let Items = await dataModules.cartItems.getItemsByCartId(id);
    res.status(200).json({ userId, cartId: id, totalPrice, Items: Items });

}

async function handleDelete(req, res) {
    let id = req.params.id;
    let deletedRecord = await req.model.delete(id);
    res.status(200).json(deletedRecord);
}
async function handleDeleteFoodById(req, res) {
    let id = req.params.id;
    let deletedRecord = await dataModules.cartItems.deleteByFoodId(id);
    res.status(200).json(deletedRecord);
}


module.exports = router;